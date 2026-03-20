import fs from 'fs/promises';
import path from 'path';

const filesDirectory = path.join(process.cwd(), '../files');

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
}

export async function getAllItems(): Promise<ItemData[]> {
    return getAllFiles();
}

export async function getAllFiles(): Promise<ItemData[]> {
    try {
        const files = await fs.readdir(filesDirectory);
        const filteredFiles = files.filter(f => !f.startsWith('.'));
        const items = await Promise.all(
            filteredFiles.map(async (file) => {
                const fullPath = path.join(filesDirectory, file);
                const stats = await fs.stat(fullPath);
                
                const ext = path.extname(file).toLowerCase();
                const baseName = path.basename(file, ext);
                
                let content: string | undefined;
                if (!stats.isDirectory() && (ext === '.md' || ext === '.txt')) {
                    content = await fs.readFile(fullPath, 'utf-8');
                }
                
                const formatDate = (date: Date) => {
                    return date.toISOString().split('T')[0];
                };
                
                return {
                    name: file,
                    path: file,
                    size: `${(stats.size / 1024).toFixed(1)} KB`,
                    type: stats.isDirectory() ? 'folder' : 'file',
                    title: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    slug: baseName,
                    content,
                    preview: content ? content.slice(0, 200) : '',
                    date: formatDate(stats.birthtime),
                    modifiedDate: formatDate(stats.mtime)
                } as ItemData;
            })
        );
        return items;
    } catch (error) {
        console.error('Error reading files:', error);
        return [];
    }
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

export async function getBreadcrumb(slugs: string[]): Promise<{ title: string, href: string }[]> {
    const breadcrumbs = [{ title: 'Home', href: '/' }];
    let currentPath = '';
    for (const slug of slugs) {
        currentPath += `/${slug}`;
        const item = await getFileBySlug(slug);
        breadcrumbs.push({
            title: item?.title || slug,
            href: currentPath
        });
    }
    return breadcrumbs;
}

export async function getTotalSize(): Promise<string> {
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
}
