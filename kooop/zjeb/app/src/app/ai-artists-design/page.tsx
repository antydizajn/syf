import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export default async function AiArtistsPage() {
  const filePath = path.join(process.cwd(), '..', 'files', 'AI_ARTISTS_REAL_DESIGN.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content } = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .process(content);
  const htmlContent = processedContent.toString();

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '40px' }}>
      {/* NUCLEAR OVERRIDE: KILL ALL HUD ELEMENTS AND THEME */}
      <style dangerouslySetInnerHTML={{ __html: `
        .noise, .glow-orb, .ScanlineOverlay, [class*="orb-"], .skip-link { 
          display: none !important; 
          visibility: hidden !important; 
          opacity: 0 !important; 
          pointer-events: none !important; 
        }
        body, html { 
          background: white !important; 
          color: black !important; 
          overflow: auto !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        * {
          box-shadow: none !important;
          text-shadow: none !important;
          animation: none !important;
          transition: none !important;
        }
        header, footer, nav { display: none !important; }
      ` }} />
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
}
