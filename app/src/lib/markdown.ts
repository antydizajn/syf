import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

/**
 * Konwertuje Markdown do HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)  // Tabele, strikethrough, tasklists
    .use(html, { sanitize: false })
    .process(markdown);

  return result.toString();
}

/**
 * Przetwarza HTML dodając neonowe style do list
 * (zamienia standardowe bullets na kolorowe)
 */
function processHtmlForNeonStyle(html: string): string {
  let processed = html;

  // Wszystkie linki otwierają się w nowym tabie
  processed = processed.replace(
    /<a href="/g,
    '<a target="_blank" rel="noopener noreferrer" href="'
  );

  // Unordered lists - czerwone bullets
  processed = processed.replace(
    /<li>([^<]*)/g,
    '<li><span class="bullet">▸</span>$1'
  );

  return processed;
}

/**
 * Pełna konwersja MD -> styled HTML
 */
async function renderMarkdown(markdown: string): Promise<string> {
  const rawHtml = await markdownToHtml(markdown);
  return processHtmlForNeonStyle(rawHtml);
}

/**
 * Eksportuje MD jako standalone HTML z inline CSS
 */
export async function exportAsHtml(markdown: string, title: string): Promise<string> {
  const content = await renderMarkdown(markdown);

  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | SYF.ANTYDIZAJN.PL</title>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-void: #000000;
      --bg-primary: #0a0a0a;
      --bg-secondary: #111111;
      --neon-magenta: #ff00ff;
      --neon-cyan: #00ffff;
      --neon-green: #00ff66;
      --neon-orange: #ff6600;
      --neon-red: #ff3355;
      --neon-yellow: #ffff00;
      --neon-purple: #aa00ff;
      --text-primary: #ffffff;
      --text-secondary: #888888;
      --text-muted: #333333;
      --font-mono: 'JetBrains Mono', monospace;
      --font-display: 'Space Grotesk', sans-serif;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: var(--font-mono);
      background: var(--bg-void);
      color: var(--text-primary);
      line-height: 1.8;
      padding: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    
    h1 {
      font-family: var(--font-display);
      font-size: 2rem;
      color: var(--neon-magenta);
      text-shadow: 0 0 15px rgba(255,0,255,0.4);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 2rem 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 3px solid var(--neon-magenta);
    }
    
    h2 {
      font-family: var(--font-display);
      font-size: 1.5rem;
      color: var(--neon-cyan);
      text-shadow: 0 0 10px rgba(0,255,255,0.4);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin: 2rem 0 1rem 0;
      padding-left: 1rem;
      border-left: 4px solid var(--neon-cyan);
    }
    
    h3 {
      font-family: var(--font-display);
      font-size: 1.2rem;
      color: var(--neon-orange);
      text-shadow: 0 0 8px rgba(255,102,0,0.4);
      margin: 1.5rem 0 1rem 0;
    }
    
    p { margin: 1rem 0; }
    
    strong { font-weight: 700; color: var(--neon-magenta); }
    em { font-style: italic; color: var(--text-secondary); }
    
    a {
      color: var(--neon-green);
      text-decoration: none;
      border-bottom: 1px solid transparent;
    }
    a:hover {
      color: var(--neon-cyan);
      border-bottom-color: var(--neon-cyan);
    }
    
    hr {
      border: none;
      height: 3px;
      background: linear-gradient(90deg, transparent, var(--neon-orange) 20%, var(--neon-orange) 80%, transparent);
      margin: 2rem 0;
    }
    
    blockquote {
      margin: 1.5rem 0;
      padding: 1rem 1.5rem;
      background: rgba(255,0,255,0.05);
      border-left: 4px solid var(--neon-magenta);
      font-style: italic;
    }
    
    ul, ol { list-style: none; margin: 1rem 0; padding-left: 0; }
    li { position: relative; padding-left: 1.5rem; margin: 0.5rem 0; }
    .bullet { position: absolute; left: 0; color: var(--neon-red); font-weight: bold; }
    
    code {
      font-family: var(--font-mono);
      font-size: 0.9em;
      padding: 2px 6px;
      background: rgba(0,255,102,0.1);
      border: 1px solid rgba(0,255,102,0.3);
      color: var(--neon-green);
    }
    
    pre {
      margin: 1.5rem 0;
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--text-muted);
      border-left: 4px solid var(--neon-purple);
      overflow-x: auto;
    }
    
    pre code {
      padding: 0;
      background: transparent;
      border: none;
      color: var(--text-primary);
    }
    
    table { width: 100%; margin: 1.5rem 0; border-collapse: collapse; }
    th {
      padding: 0.5rem 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--text-muted);
      text-align: left;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--neon-magenta);
    }
    td {
      padding: 0.5rem 1rem;
      border: 1px solid var(--text-muted);
      color: var(--text-secondary);
    }
  </style>
</head>
<body>
  <article class="markdown-body">
    ${content}
  </article>
  <footer style="margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #333; font-size: 0.8rem; color: #555;">
    Exported from SYF.ANTYDIZAJN.PL
  </footer>
</body>
</html>`;
}

/**
 * Eksportuje MD jako plain text (bez formatowania)
 */
export function exportAsText(markdown: string): string {
  return markdown
    // Usuń frontmatter
    .replace(/^---[\s\S]*?---\n?/, '')
    // Usuń nagłówki hash
    .replace(/^#{1,6}\s/gm, '')
    // Usuń bold/italic
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Usuń inline code
    .replace(/`([^`]+)`/g, '$1')
    // Zamień linki na tekst
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Usuń obrazki
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Usuń horizontal rules
    .replace(/^[-*_]{3,}$/gm, '---')
    // Zamień bullets
    .replace(/^[\s]*[-*+]\s/gm, '• ')
    // Usuń code blocks markers
    .replace(/```[\s\S]*?```/g, (match) => {
      return match.replace(/```\w*\n?/g, '').replace(/```/g, '');
    })
    .trim();
}
