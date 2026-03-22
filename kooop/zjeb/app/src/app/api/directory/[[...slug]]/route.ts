import { NextRequest, NextResponse } from 'next/server';
import { getAllItems } from '@/lib/files';
import { encode } from '@/lib/binary';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug?: string[] }> }
) {
    const { slug: slugPartsArray } = await params;
    const allItems = await getAllItems();
    const slugParts = slugPartsArray || [];
    const currentPath = slugParts.join('/');
    
    // Filter items to only show immediate children of the requested directory
    const filteredItems = allItems.filter(item => {
        if (!item.path.startsWith(currentPath)) return false;
        
        const relativePath = currentPath === '' 
            ? item.path 
            : item.path.slice(currentPath.length + 1);
            
        return relativePath !== '' && !relativePath.includes('/');
    });

    const acceptHeader = request.headers.get('accept');
    const isJson = acceptHeader?.includes('application/json');

    if (isJson) {
        return NextResponse.json({ items: filteredItems }, {
            headers: {
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
            },
        });
    }

    const binaryData = encode(filteredItems);

    return new NextResponse(new Uint8Array(binaryData), {
        headers: {
            'Content-Type': 'application/x-msgpack',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
