import { ImageResponse } from 'next/og';
import { getFileBySlug, isFolder } from '@/lib/files';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const slug = searchParams.get('slug') || '';
  
  const isFolderPath = await isFolder(slug);
  const file = isFolderPath ? null : await getFileBySlug(slug);
  const title = file?.title || slug.split('/').pop() || slug || 'SYF';
  const preview = file?.preview || (isFolderPath ? '📁 Folder' : '');
  const icon = isFolderPath ? '📁' : '📄';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: 60,
          position: 'relative',
        }}
      >
        {/* Gradient background */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at top right, rgba(255,0,255,0.25) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(0,255,255,0.15) 0%, transparent 50%)',
          }}
        />
        
        {/* Top section */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            width: '100%',
          }}
        >
          {/* File/Folder indicator */}
          <div
            style={{
              fontSize: 24,
              color: isFolderPath ? '#00ffff' : '#ff00ff',
              letterSpacing: '0.2em',
              marginBottom: 20,
              textTransform: 'uppercase',
            }}
          >
            {icon} {isFolderPath ? 'FOLDER' : 'PLIK MD'}
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: 64,
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              maxWidth: '90%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title.length > 40 ? title.substring(0, 40) + '...' : title}
          </div>
          
          {/* Preview */}
          {preview && (
            <div
              style={{
                fontSize: 28,
                color: '#888888',
                marginTop: 30,
                maxWidth: '85%',
                lineHeight: 1.4,
              }}
            >
              {preview.length > 100 ? preview.substring(0, 100) + '...' : preview}
            </div>
          )}
        </div>
        
        {/* Bottom section - Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <span style={{ color: '#ff00ff', fontSize: 48, fontWeight: 700 }}>[</span>
          <span style={{ color: '#ffffff', fontSize: 48, fontWeight: 700 }}>SYF</span>
          <span style={{ color: '#ff00ff', fontSize: 48, fontWeight: 700 }}>]</span>
          <span style={{ color: '#555555', fontSize: 32, marginLeft: 10 }}>.antydizajn.pl</span>
        </div>
        
        {/* Border effect */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            borderLeft: `4px solid ${isFolderPath ? '#00ffff' : '#ff00ff'}`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
