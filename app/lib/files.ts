/**
 * SYF - File System Operations
 * Odczyt plików MD z folderu files/
 */

import fs from 'fs';
import path from 'path';

// Ścieżka do folderu z plikami MD (relatywna do root projektu)
const FILES_DIRECTORY = path.join(process.cwd(), '..', 'files');

export interface FileInfo {
    slug: string;           // nazwa bez .md
    filename: string;       // pełna nazwa z .md
    title: string;          // tytuł (z frontmatter lub nazwa)
    preview: string;        // pierwszy paragraf
    createdAt: Date;
    modifiedAt: Date;
    size: number;           // w bajtach
    sizeFormatted: string;  // np. "21.7 KB"
}

export interface FileContent extends FileInfo {
    content: string;        // surowa zawartość MD
}

/**
 * Formatuje rozmiar pliku
 */
function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Wyciąga pierwszy paragraf z MD jako preview
 */
function extractPreview(content: string, maxLength: number = 100): string {
    // Usuń frontmatter jeśli istnieje
    let text = content.replace(/^---[\s\S]*?---\n*/m, '');

    // Usuń nagłówki
    text = text.replace(/^#+\s+.+$/gm, '');

    // Usuń puste linie i znajdź pierwszy paragraf
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    const firstParagraph = lines.find(line => !line.startsWith('>') && !line.startsWith('-') && !line.startsWith('*'));

    if (!firstParagraph) return '';

    // Ogranicz długość
    if (firstParagraph.length <= maxLength) return firstParagraph;
    return firstParagraph.substring(0, maxLength).trim() + '...';
}

/**
 * Wyciąga tytuł z frontmatter lub pierwszego H1
 */
function extractTitle(content: string, filename: string): string {
    // Sprawdź frontmatter
    const frontmatterMatch = content.match(/^---[\s\S]*?title:\s*["']?(.+?)["']?\s*\n[\s\S]*?---/m);
    if (frontmatterMatch) return frontmatterMatch[1];

    // Sprawdź pierwszy H1
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1];

    // Użyj nazwy pliku
    return filename.replace('.md', '').replace(/_/g, ' ');
}

/**
 * Pobiera informacje o pojedynczym pliku
 */
export async function getFileInfo(slug: string): Promise<FileInfo | null> {
    const filename = `${slug}.md`;
    const filepath = path.join(FILES_DIRECTORY, filename);

    try {
        const stats = fs.statSync(filepath);
        const content = fs.readFileSync(filepath, 'utf-8');

        return {
            slug,
            filename,
            title: extractTitle(content, filename),
            preview: extractPreview(content),
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
            size: stats.size,
            sizeFormatted: formatFileSize(stats.size),
        };
    } catch {
        return null;
    }
}

/**
 * Pobiera zawartość pliku wraz z metadanymi
 */
export async function getFileContent(slug: string): Promise<FileContent | null> {
    const filename = `${slug}.md`;
    const filepath = path.join(FILES_DIRECTORY, filename);

    try {
        const stats = fs.statSync(filepath);
        const content = fs.readFileSync(filepath, 'utf-8');

        return {
            slug,
            filename,
            title: extractTitle(content, filename),
            preview: extractPreview(content),
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime,
            size: stats.size,
            sizeFormatted: formatFileSize(stats.size),
            content,
        };
    } catch {
        return null;
    }
}

/**
 * Pobiera listę wszystkich plików
 */
export async function getAllFiles(): Promise<FileInfo[]> {
    try {
        const filenames = fs.readdirSync(FILES_DIRECTORY)
            .filter(name => name.endsWith('.md'));

        const files: FileInfo[] = [];

        for (const filename of filenames) {
            const slug = filename.replace('.md', '');
            const info = await getFileInfo(slug);
            if (info) files.push(info);
        }

        return files;
    } catch {
        return [];
    }
}

/**
 * Sortuje pliki
 */
export type SortType = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

export function sortFiles(files: FileInfo[], sortType: SortType): FileInfo[] {
    const sorted = [...files];

    switch (sortType) {
        case 'newest':
            return sorted.sort((a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime());
        case 'oldest':
            return sorted.sort((a, b) => a.modifiedAt.getTime() - b.modifiedAt.getTime());
        case 'name-asc':
            return sorted.sort((a, b) => a.slug.localeCompare(b.slug));
        case 'name-desc':
            return sorted.sort((a, b) => b.slug.localeCompare(a.slug));
        default:
            return sorted;
    }
}

/**
 * Paginacja
 */
export interface PaginatedFiles {
    files: FileInfo[];
    totalFiles: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export function paginateFiles(
    files: FileInfo[],
    page: number = 1,
    perPage: number = 30
): PaginatedFiles {
    const totalFiles = files.length;
    const totalPages = Math.ceil(totalFiles / perPage);
    const currentPage = Math.max(1, Math.min(page, totalPages));

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    return {
        files: files.slice(start, end),
        totalFiles,
        totalPages,
        currentPage,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
    };
}

/**
 * Pobiera wszystkie slugi (dla generateStaticParams)
 */
export async function getAllSlugs(): Promise<string[]> {
    try {
        const filenames = fs.readdirSync(FILES_DIRECTORY)
            .filter(name => name.endsWith('.md'));

        return filenames.map(name => name.replace('.md', ''));
    } catch {
        return [];
    }
}

/**
 * Pobiera statystyki
 */
export async function getStats(): Promise<{ totalFiles: number; totalSize: string }> {
    const files = await getAllFiles();
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);

    return {
        totalFiles: files.length,
        totalSize: formatFileSize(totalSize),
    };
}
