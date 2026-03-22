import fs from 'fs/promises';
import path from 'path';
import { unstable_cache } from 'next/cache';

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
    itemCount?: number;
}

/**
 * Raw data fetching from filesystem
 */
async function getAllFilesRaw(subDir = ""): Promise<ItemData[]> {
    try {
        const currentDir = path.join(filesDirectory, subDir);
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        const items = await Promise.all(
            entries
                .filter(entry => !entry.name.startsWith('.'))
                .map(async (entry) => {
                    const relativePath = path.join(subDir, entry.name);
                    const fullPath = path.join(filesDirectory, relativePath);
                    const stats = await fs.stat(fullPath);
                    
                    const ext = path.extname(entry.name).toLowerCase();
                    const baseName = path.basename(entry.name, ext);
                    
                    let content: string | undefined;
                    // Only read content for files at the root level if needed, 
                    // but usually we want to know if it's a directory
                    if (!entry.isDirectory() && (ext === '.md' || ext === '.txt')) {
                        try {
                            content = await fs.readFile(fullPath, 'utf-8');
                        } catch (e) { /* ignore */ }
                    }
                    
                    const formatDate = (date: Date) => {
                        return date.toISOString().split('T')[0];
                    };

                    let itemCount: number | undefined;
                    if (entry.isDirectory()) {
                        try {
                            const subFiles = await fs.readdir(fullPath);
                            itemCount = subFiles.filter(f => !f.startsWith('.')).length;
                        } catch (e) {
                            itemCount = 0;
                        }
                    }
                    
                    // Slug is the relative path WITHOUT extension for files, 
                    // or just relative path for directories
                    const slug = entry.isDirectory() ? relativePath : relativePath.replace(/\.md$/, '');

                    return {
                        name: entry.name,
                        path: relativePath,
                        size: entry.isDirectory() ? '--' : `${(stats.size / 1024).toFixed(1)} KB`,
                        type: entry.isDirectory() ? 'folder' : 'file',
                        title: baseName.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                        slug: slug,
                        content: content,
                        preview: content ? content.trim().split(/[.!?\n]/)[0] + '.' : '',
                        date: formatDate(stats.birthtime),
                        modifiedDate: formatDate(stats.mtime),
                        itemCount
                    } as ItemData;
                })
        );
        return items;
    } catch (error) {
        console.error('Error reading files:', error);
        return [];
    }
}

/**
 * Recursive fetch for all files to support static generation of all deep slugs
 */
async function getAllFilesRecursive(subDir = ""): Promise<ItemData[]> {
    const items = await getAllFilesRaw(subDir);
    const nestedItems: ItemData[] = [];
    
    for (const item of items) {
        if (item.type === 'folder') {
            const children = await getAllFilesRecursive(item.path);
            nestedItems.push(...children);
        }
    }
    
    return [...items, ...nestedItems];
}

/**
 * Cached version of getAllFiles
 */
export const getAllFiles = unstable_cache(
    async () => getAllFilesRecursive(),
    ['all-files-recursive'],
    { revalidate: 3600, tags: ['files'] }
);

export async function getItemsByPath(subPath: string): Promise<ItemData[]> {
    return getAllFilesRaw(subPath);
}

export async function getAllItems(): Promise<ItemData[]> {
    return getAllFiles();
}

export async function getFileBySlug(slug: string): Promise<ItemData | null> {
    const all = await getAllFiles();
    // Support both raw slug and path-array style resolution
    const processedSlug = slug.replace(/^\//, '');
    return all.find(f => f.slug === processedSlug) || null;
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
        for (const slug of slugs) {
            currentPath += `/${slug}`;
            const item = await getFileBySlug(slug);
            breadcrumbs.push({
                title: item?.title || slug,
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

/**
 * Transform flat list of items into a recursive tree structure for the HUD Sidebar
 */
export function buildFileTree(items: ItemData[]): any[] {
  const root: any[] = [];
  const map: Record<string, any> = {};

  // First, create all nodes and map them by slug
  items.forEach(item => {
    const node: any = {
      id: item.slug,
      title: item.title,
      type: item.type,
      children: item.type === 'folder' ? [] : undefined
    };
    map[item.slug] = node;
    
    // If it's a top-level item (no slashes), add to root
    if (!item.slug.includes('/')) {
      root.push(node);
    }
  });

  // Then, link children to parents
  items.forEach(item => {
    if (item.slug.includes('/')) {
      const parts = item.slug.split('/');
      const parentSlug = parts.slice(0, -1).join('/');
      
      if (map[parentSlug]) {
        map[parentSlug].children.push(map[item.slug]);
      } else {
        // Handle case where parent wasn't explicitly in the list
        root.push(map[item.slug]);
      }
    }
  });

  return root;
}
