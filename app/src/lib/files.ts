import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Ścieżka do folderu z plikami MD
const filesDirectory = path.join(process.cwd(), '..', 'files');

export interface FileData {
    slug: string;
    title: string;
    preview: string;
    date: string;
    modifiedDate: string;
    size: string;
    sizeBytes: number;
    content?: string;
    rawContent?: string;
    type: 'file';
}

export interface FolderData {
    slug: string;
    name: string;
    itemCount: number;
    modifiedDate: string;
    type: 'folder';
}

export type ItemData = FileData | FolderData;

/**
 * Formatuje rozmiar pliku do czytelnej formy
 */
function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Formatuje datę do formatu YYYY-MM-DD
 */
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

/**
 * Wyciąga pierwszy paragraf z treści MD jako preview
 */
function extractPreview(content: string, maxLength: number = 80): string {
    // Usuń frontmatter jeśli istnieje
    const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n?/, '');

    // Usuń nagłówki
    const withoutHeaders = withoutFrontmatter.replace(/^#{1,6}\s.*$/gm, '');

    // Znajdź pierwszy niepusty paragraf
    const paragraphs = withoutHeaders.split(/\n\n+/);
    const firstParagraph = paragraphs.find(p => p.trim().length > 0) || '';

    // Wyczyść z markdown syntax
    const cleaned = firstParagraph
        .replace(/\*\*([^*]+)\*\*/g, '$1')  // bold
        .replace(/\*([^*]+)\*/g, '$1')       // italic
        .replace(/`([^`]+)`/g, '$1')         // inline code
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
        .replace(/[>\-*]/g, '')              // bullets, quotes
        .trim();

    if (cleaned.length <= maxLength) return cleaned;
    return cleaned.substring(0, maxLength).trim() + '...';
}

/**
 * Pobiera listę folderów w danej ścieżce
 */
export function getAllFolders(subPath: string = ''): FolderData[] {
    const targetDir = subPath
        ? path.join(filesDirectory, subPath)
        : filesDirectory;

    if (!fs.existsSync(targetDir)) {
        return [];
    }

    const items = fs.readdirSync(targetDir);

    return items
        .filter(item => {
            const itemPath = path.join(targetDir, item);
            return fs.statSync(itemPath).isDirectory() && !item.startsWith('.');
        })
        .map(folder => {
            const folderPath = path.join(targetDir, folder);
            const stats = fs.statSync(folderPath);
            const contents = fs.readdirSync(folderPath);
            const mdFiles = contents.filter(f => f.endsWith('.md'));
            const subFolders = contents.filter(f => {
                const p = path.join(folderPath, f);
                return fs.statSync(p).isDirectory() && !f.startsWith('.');
            });

            return {
                slug: subPath ? `${subPath}/${folder}` : folder,
                name: folder.replace(/_/g, ' '),
                itemCount: mdFiles.length + subFolders.length,
                modifiedDate: formatDate(stats.mtime),
                type: 'folder' as const,
            };
        });
}

/**
 * Pobiera listę wszystkich plików MD w danej ścieżce
 */
export function getAllFiles(subPath: string = ''): FileData[] {
    const targetDir = subPath
        ? path.join(filesDirectory, subPath)
        : filesDirectory;

    // Sprawdź czy folder istnieje
    if (!fs.existsSync(targetDir)) {
        console.warn(`Folder ${targetDir} nie istnieje`);
        return [];
    }

    const filenames = fs.readdirSync(targetDir);

    const files = filenames
        .filter(filename => filename.endsWith('.md'))
        .map(filename => {
            const filePath = path.join(targetDir, filename);
            const stats = fs.statSync(filePath);
            const fileContents = fs.readFileSync(filePath, 'utf8');

            // Parse frontmatter jeśli istnieje
            const { data, content } = matter(fileContents);

            const baseSlug = filename.replace(/\.md$/, '');
            const slug = subPath ? `${subPath}/${baseSlug}` : baseSlug;

            return {
                slug,
                title: data.title || baseSlug.replace(/_/g, ' '),
                preview: extractPreview(content),
                date: data.date ? formatDate(new Date(data.date)) : formatDate(stats.birthtime),
                modifiedDate: formatDate(stats.mtime),
                size: formatFileSize(stats.size),
                sizeBytes: stats.size,
                type: 'file' as const,
            };
        });

    return files;
}

/**
 * Pobiera listę wszystkich itemów (foldery + pliki, foldery pierwsze)
 */
export function getAllItems(subPath: string = ''): ItemData[] {
    const folders = getAllFolders(subPath);
    const files = getAllFiles(subPath);

    // Foldery pierwsze, potem pliki
    return [...folders, ...files];
}

/**
 * Pobiera posortowaną listę plików
 */
export function getSortedFiles(
    sortBy: 'newest' | 'oldest' | 'name-asc' | 'name-desc' = 'newest'
): FileData[] {
    const files = getAllFiles();

    switch (sortBy) {
        case 'newest':
            return files.sort((a, b) =>
                new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
            );
        case 'oldest':
            return files.sort((a, b) =>
                new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime()
            );
        case 'name-asc':
            return files.sort((a, b) => a.slug.localeCompare(b.slug));
        case 'name-desc':
            return files.sort((a, b) => b.slug.localeCompare(a.slug));
        default:
            return files;
    }
}

/**
 * Pobiera paginowaną listę plików
 */
export function getPaginatedFiles(
    page: number = 1,
    perPage: number = 30,
    sortBy: 'newest' | 'oldest' | 'name-asc' | 'name-desc' = 'newest'
): { files: FileData[]; totalPages: number; totalFiles: number } {
    const allFiles = getSortedFiles(sortBy);
    const totalFiles = allFiles.length;
    const totalPages = Math.ceil(totalFiles / perPage);

    const start = (page - 1) * perPage;
    const files = allFiles.slice(start, start + perPage);

    return { files, totalPages, totalFiles };
}

/**
 * Sanitizuje slug - chroni przed path traversal attacks
 * Obsługuje ścieżki z folderami (np. "folder/plik")
 */
function sanitizeSlug(slug: string): string | null {
    // Usuń wszelkie niebezpieczne znaki
    const sanitized = slug
        .replace(/\.\./g, '')      // path traversal
        .replace(/\\\\/g, '/')     // backslashes to forward
        .replace(/\/\//g, '/')     // double slashes
        .replace(/[\x00-\x1f]/g, '') // control characters
        .replace(/^\/+|\/+$/g, '') // leading/trailing slashes
        .trim();

    // Sprawdź czy slug jest prawidłowy (alfanumeryczne, -, _, /)
    // Każdy segment musi być prawidłowy
    const segments = sanitized.split('/');
    for (const segment of segments) {
        if (!/^[a-zA-Z0-9_-]+$/.test(segment)) {
            return null;
        }
    }

    return sanitized;
}

/**
 * Pobiera pojedynczy plik po slug
 */
export function getFileBySlug(slug: string): FileData | null {
    // SECURITY: Sanitize slug
    const safeSlug = sanitizeSlug(slug);
    if (!safeSlug) {
        console.warn(`Invalid slug attempt: ${slug}`);
        return null;
    }

    const filePath = path.join(filesDirectory, `${safeSlug}.md`);

    // SECURITY: Verify path is within files directory
    const realPath = path.resolve(filePath);
    const realFilesDir = path.resolve(filesDirectory);
    if (!realPath.startsWith(realFilesDir)) {
        console.warn(`Path traversal attempt detected: ${slug}`);
        return null;
    }

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const stats = fs.statSync(filePath);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Dla tytułu używaj tylko nazwy pliku, nie całej ścieżki
    const fileName = safeSlug.split('/').pop() || safeSlug;

    return {
        slug: safeSlug,
        title: data.title || fileName.replace(/_/g, ' '),
        preview: extractPreview(content),
        date: data.date ? formatDate(new Date(data.date)) : formatDate(stats.birthtime),
        modifiedDate: formatDate(stats.mtime),
        size: formatFileSize(stats.size),
        sizeBytes: stats.size,
        content,
        rawContent: fileContents,
        type: 'file' as const,
    };
}

/**
 * Sprawdza czy ścieżka to folder
 */
export function isFolder(slugPath: string): boolean {
    const safeSlug = sanitizeSlug(slugPath);
    if (!safeSlug) return false;

    const fullPath = path.join(filesDirectory, safeSlug);
    const realPath = path.resolve(fullPath);
    const realFilesDir = path.resolve(filesDirectory);

    if (!realPath.startsWith(realFilesDir)) return false;
    if (!fs.existsSync(fullPath)) return false;

    return fs.statSync(fullPath).isDirectory();
}

/**
 * Pobiera breadcrumb dla ścieżki
 */
export function getBreadcrumb(slugPath: string): { name: string; slug: string }[] {
    const parts = slugPath.split('/').filter(Boolean);
    const breadcrumb: { name: string; slug: string }[] = [];

    let currentPath = '';
    for (const part of parts) {
        currentPath = currentPath ? `${currentPath}/${part}` : part;
        breadcrumb.push({
            name: part.replace(/_/g, ' '),
            slug: currentPath,
        });
    }

    return breadcrumb;
}

/**
 * Pobiera wszystkie slugi rekurencyjnie (do static generation)
 */
export function getAllSlugs(): string[] {
    if (!fs.existsSync(filesDirectory)) {
        return [];
    }

    const slugs: string[] = [];

    function scanDirectory(dir: string, prefix: string = '') {
        const items = fs.readdirSync(dir);

        for (const item of items) {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            const slug = prefix ? `${prefix}/${item}` : item;

            if (stat.isDirectory() && !item.startsWith('.')) {
                // Dodaj folder jako slug
                slugs.push(slug);
                // Skanuj rekurencyjnie
                scanDirectory(itemPath, slug);
            } else if (item.endsWith('.md')) {
                slugs.push(slug.replace(/\.md$/, ''));
            }
        }
    }

    scanDirectory(filesDirectory);
    return slugs;
}

/**
 * Pobiera poprzedni i następny plik (do nawigacji)
 */
export function getAdjacentFiles(currentSlug: string): { prev: FileData | null; next: FileData | null } {
    const files = getSortedFiles('newest');
    const currentIndex = files.findIndex(f => f.slug === currentSlug);

    if (currentIndex === -1) {
        return { prev: null, next: null };
    }

    return {
        prev: currentIndex > 0 ? files[currentIndex - 1] : null,
        next: currentIndex < files.length - 1 ? files[currentIndex + 1] : null,
    };
}

/**
 * Oblicza łączny rozmiar wszystkich plików
 */
export function getTotalSize(): string {
    const files = getAllFiles();
    const totalBytes = files.reduce((sum, f) => sum + f.sizeBytes, 0);
    return formatFileSize(totalBytes);
}
