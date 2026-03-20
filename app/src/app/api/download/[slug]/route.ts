import { NextRequest, NextResponse } from 'next/server';
import { getFileBySlug } from '@/lib/files';
import { exportAsHtml, exportAsText } from '@/lib/markdown';
import { exportAsDocx } from '@/lib/exporters';

// PDF wyłączony - puppeteer nie działa na shared hostingu
type Format = 'md' | 'html' | 'txt' | 'docx';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { slug } = await params;
    const searchParams = request.nextUrl.searchParams;
    const format = (searchParams.get('format') || 'md') as Format;

    // SECURITY: Validate format parameter
    const validFormats: Format[] = ['md', 'html', 'txt', 'docx'];
    if (!validFormats.includes(format)) {
        return NextResponse.json(
            { error: 'Nieprawidłowy format' },
            { status: 400 }
        );
    }

    const file = getFileBySlug(slug);

    if (!file || !file.rawContent) {
        return NextResponse.json(
            { error: 'Plik nie znaleziony' },
            { status: 404 }
        );
    }

    let content: string | Buffer;
    let contentType: string;
    let extension: string;

    try {
        switch (format) {
            case 'html':
                content = await exportAsHtml(file.content || '', file.slug);
                contentType = 'text/html; charset=utf-8';
                extension = 'html';
                break;

            case 'txt':
                content = exportAsText(file.rawContent);
                contentType = 'text/plain; charset=utf-8';
                extension = 'txt';
                break;

            case 'docx':
                content = await exportAsDocx(file.content || '', file.slug);
                contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                extension = 'docx';
                break;

            case 'md':
            default:
                content = file.rawContent;
                contentType = 'text/markdown; charset=utf-8';
                extension = 'md';
                break;
        }
    } catch (error) {
        console.error(`Export error for ${slug} as ${format}:`, error);
        return NextResponse.json(
            { error: 'Błąd podczas eksportu pliku' },
            { status: 500 }
        );
    }

    // SECURITY: Sanitize filename
    const safeFilename = slug.replace(/[^a-zA-Z0-9_-]/g, '_');

    // Handle binary vs text content for NextResponse
    const responseBody: BodyInit = Buffer.isBuffer(content)
        ? new Uint8Array(content)
        : content;

    return new NextResponse(responseBody, {
        status: 200,
        headers: {
            'Content-Type': contentType,
            'Content-Disposition': `attachment; filename="${safeFilename}.${extension}"`,
            'Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
        },
    });
}
