import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt = 'SYF.ANTYDIZAJN.PL';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
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
          alignItems: 'center',
          justifyContent: 'center',
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
            background: 'radial-gradient(ellipse at top right, rgba(255,0,255,0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(0,255,255,0.2) 0%, transparent 50%)',
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: 40,
            }}
          >
            <span style={{ color: '#ff00ff', fontSize: 140, fontWeight: 700 }}>[</span>
            <span style={{ color: '#ffffff', fontSize: 140, fontWeight: 700 }}>SYF</span>
            <span style={{ color: '#ff00ff', fontSize: 140, fontWeight: 700 }}>]</span>
          </div>
          
          {/* Domain */}
          <div
            style={{
              fontSize: 36,
              color: '#555555',
              letterSpacing: '0.2em',
            }}
          >
            .ANTYDIZAJN.PL
          </div>
          
          {/* Tagline */}
          <div
            style={{
              fontSize: 28,
              color: '#888888',
              marginTop: 40,
              letterSpacing: '0.1em',
            }}
          >
            PUBLICZNY DUMP PLIKÓW MD
          </div>
        </div>
        
        {/* Border effect */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid rgba(255,0,255,0.3)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
