import fs from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';

const filesDirectory = path.join(process.cwd(), 'files');

export interface ItemData {
    name: string;
    path: string;
    size: string;
    type: 'file' | 'folder';
    title: string;
    slug: string;
    content?: string;
    preview?: string;
    date: string;
    modifiedDate: string;
    itemCount?: number;
}

/**
 * Raw data fetching from filesystem with recursive support
 */
async function getAllFilesRaw(): Promise<ItemData[]> {
    const items: ItemData[] = [];

    async function scanDir(dir: string, relativePath: string = '') {
        const files = await fs.readdir(dir);
        const filteredFiles = files.filter(f => !f.startsWith('.'));

        for (const file of filteredFiles) {
            const fullPath = path.join(dir, file);
            const stats = await fs.stat(fullPath);
            const itemRelativePath = relativePath ? `${relativePath}/${file}` : file;
            
            const ext = path.extname(file).toLowerCase();
            const baseName = path.basename(file, ext);
            // Slug is the relative path of the item. For files, we strip the extension.
            const slug = stats.isDirectory() 
                ? (relativePath ? `${relativePath}/${file}` : file)
                : (relativePath ? `${relativePath}/${baseName}` : baseName);
            
            let content: string | undefined;
            if (!stats.isDirectory() && (ext === '.md' || ext === '.txt')) {
                content = await fs.readFile(fullPath, 'utf-8');
            }
            
            const formatDate = (date: Date) => {
                return date.toISOString().split('T')[0];
            };

            let itemCount: number | undefined;
            if (stats.isDirectory()) {
                try {
                    const subFiles = await fs.readdir(fullPath);
                    itemCount = subFiles.filter(f => !f.startsWith('.')).length;
                    // Recurse into directory
                    await scanDir(fullPath, itemRelativePath);
                } catch (e) {
                    itemCount = 0;
                }
            }
            
            const item: ItemData = {
                name: file,
                path: itemRelativePath,
                size: stats.isDirectory() ? '--' : `${(stats.size / 1024).toFixed(1)} KB`,
                type: stats.isDirectory() ? 'folder' : 'file',
                title: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                slug: slug,
                content,
                preview: content ? content.trim().split(/[.!?\n]/)[0] + '.' : '',
                date: formatDate(stats.birthtime),
                modifiedDate: formatDate(stats.mtime),
                itemCount
            };
            items.push(item);
        }
    }

    try {
        await scanDir(filesDirectory);
        return items;
    } catch (error) {
        console.error('Error reading files:', error);
        return [];
    }
}

/**
 * Cached version of getAllFiles
 */
export const getAllFiles = unstable_cache(
    async () => getAllFilesRaw(),
    ['all-files'],
    { revalidate: 3600, tags: ['files'] }
);

export async function getAllItems(): Promise<ItemData[]> {
    return getAllFiles();
}

export async function getFileBySlug(slug: string): Promise<ItemData | null> {
    const all = await getAllFiles();
    return all.find(f => f.slug === slug) || null;
}

export async function isFolder(pathStr: string): Promise<boolean> {
    try {
        const fullPath = path.join(filesDirectory, pathStr);
        const stats = await fs.stat(fullPath);
        return stats.isDirectory();
    } catch {
        return false;
    }
}

export async function getAllSlugs(): Promise<string[]> {
    const all = await getAllFiles();
    return all.map(f => f.slug);
}

export async function getAdjacentFiles(slug: string): Promise<{ prev: ItemData | null, next: ItemData | null }> {
    const all = await getAllFiles();
    const index = all.findIndex(f => f.slug === slug);
    if (index === -1) return { prev: null, next: null };
    return {
        prev: index > 0 ? all[index - 1] : null,
        next: index < all.length - 1 ? all[index + 1] : null
    };
}

/**
 * Cached version of breadcrumb generation
 */
export const getBreadcrumb = unstable_cache(
    async (slugs: string[]) => {
        const breadcrumbs = [{ title: 'Home', href: '/' }];
        let currentPath = '';
        for (const slugPart of slugs) {
            currentPath += `/${slugPart}`;
            const item = await getFileBySlug(currentPath.slice(1)); // currentPath starts with /
            breadcrumbs.push({
                title: item?.title || slugPart,
                href: currentPath
            });
        }
        return breadcrumbs;
    },
    ['breadcrumbs'],
    { revalidate: 3600, tags: ['files'] }
);

/**
 * Cached version of total size calculation
 */
export const getTotalSize = unstable_cache(
    async (): Promise<string> => {
        try {
            const files = await fs.readdir(filesDirectory);
            let total = 0;
            for (const file of files) {
                try {
                    const stats = await fs.stat(path.join(filesDirectory, file));
                    total += stats.size;
                } catch (e) { /* ignore single error */ }
            }
            return `${(total / 1024 / 1024).toFixed(2)} MB`;
        } catch (error) {
            return '0 MB';
        }
    },
    ['total-size'],
    { revalidate: 3600, tags: ['files'] }
);
