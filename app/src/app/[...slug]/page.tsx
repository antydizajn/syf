import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DownloadBar from '@/components/DownloadBar';
import FileList from '@/components/FileList';
import { 
  getFileBySlug, 
  getAllSlugs, 
  getAdjacentFiles, 
  getAllItems, 
  getTotalSize,
  isFolder,
  getBreadcrumb
} from '@/lib/files';
import { renderMarkdown } from '@/lib/markdown';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Static generation dla wszystkich plikow i folderow
export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.split('/') }));
}

// Dynamic metadata
export async function generateMetadata({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  const ogImageUrl = `https://syf.antydizajn.pl/api/og?slug=${encodeURIComponent(slug)}`;
  
  // Sprawdź czy to folder
  if (isFolder(slug)) {
    return {
      title: `${slug} | SYF.ANTYDIZAJN.PL`,
      description: `Zawartość folderu ${slug}`,
      openGraph: {
        title: `📁 ${slug} | SYF`,
        description: `Zawartość folderu ${slug}`,
        url: `https://syf.antydizajn.pl/${slug}`,
        images: [ogImageUrl],
      },
    };
  }
  
  const file = getFileBySlug(slug);
  
  if (!file) {
    return { title: 'Nie znaleziono | SYF' };
  }
  
  return {
    title: `${file.title} | SYF.ANTYDIZAJN.PL`,
    description: file.preview,
    openGraph: {
      title: `${file.title} | SYF`,
      description: file.preview,
      url: `https://syf.antydizajn.pl/${slug}`,
      type: 'article',
      images: [ogImageUrl],
    },
  };
}

export default async function FilePage({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  
  // Sprawdź czy to folder
  if (isFolder(slug)) {
    const items = getAllItems(slug);
    const totalSize = getTotalSize();
    const breadcrumb = getBreadcrumb(slug);
    const folderName = slug.split('/').pop() || slug;
    
    return (
      <>
        <Header />
        
        <main className="main">
          {/* BREADCRUMB */}
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">SYF</Link>
            {breadcrumb.map((item, i) => (
              <span key={item.slug}>
                <span className="breadcrumb-sep"> / </span>
                {i === breadcrumb.length - 1 ? (
                  <span className="breadcrumb-current">{item.name}</span>
                ) : (
                  <Link href={`/${item.slug}`} className="breadcrumb-link">{item.name}</Link>
                )}
              </span>
            ))}
          </nav>

          {/* FOLDER HEADER */}
          <section className="folder-header">
            <h1 className="folder-title">{folderName.toUpperCase()}/</h1>
            <p className="folder-meta">drwxr-xr-x • {items.length} elementów</p>
          </section>

          {/* COMMAND LINE */}
          <div className="cmd-line">
            <span className="cmd-prompt">$</span>
            <span className="cmd-text">ls -la /syf/{slug}/ --sort=date</span>
            <span className="cmd-cursor">_</span>
          </div>

          {/* SEPARATOR */}
          <div className="separator">
            <span className="separator-text">{'//'} FOLDER</span>
            <span className="separator-line"></span>
            <span className="separator-count">[{items.length}]</span>
          </div>

          {/* FILE LIST */}
          {items.length > 0 ? (
            <FileList items={items} />
          ) : (
            <div className="empty-state">
              <p>Pusty folder</p>
            </div>
          )}
        </main>

        <Footer fileCount={items.length} totalSize={totalSize} />
      </>
    );
  }
  
  // To jest plik
  const file = getFileBySlug(slug);
  
  if (!file || !file.content) {
    notFound();
  }
  
  const htmlContent = await renderMarkdown(file.content);
  const { prev, next } = getAdjacentFiles(slug);
  const allItems = getAllItems();
  const totalSize = getTotalSize();
  const breadcrumb = getBreadcrumb(slug);

  return (
    <>
      <Header />
      <DownloadBar slug={slug} />
      
      <main className="main file-page">
        {/* BREADCRUMB */}
        {breadcrumb.length > 1 && (
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">SYF</Link>
            {breadcrumb.slice(0, -1).map((item) => (
              <span key={item.slug}>
                <span className="breadcrumb-sep"> / </span>
                <Link href={`/${item.slug}`} className="breadcrumb-link">{item.name}</Link>
              </span>
            ))}
          </nav>
        )}

        {/* FILE HEADER */}
        <header className="file-header">
          <h1 className="file-title">{file.title}</h1>
          <div className="file-metadata">
            <div className="meta-item">
              <span className="meta-label">ZMODYFIKOWANY</span>
              <span className="meta-value">{file.modifiedDate}</span>
            </div>
            <span className="meta-sep">|</span>
            <div className="meta-item">
              <span className="meta-label">UTWORZONY</span>
              <span className="meta-value">{file.date}</span>
            </div>
            <span className="meta-sep">|</span>
            <div className="meta-item">
              <span className="meta-label">ROZMIAR</span>
              <span className="meta-value">{file.size}</span>
            </div>
          </div>
        </header>

        {/* MARKDOWN BODY */}
        <article 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* FILE NAVIGATION */}
        {(prev || next) && (
          <nav className="file-navigation">
            {prev ? (
              <Link href={`/${prev.slug}`} className="file-nav-link file-nav-prev">
                <span className="nav-direction">← POPRZEDNI</span>
                <span className="nav-filename">{prev.slug}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/${next.slug}`} className="file-nav-link file-nav-next">
                <span className="nav-direction">NASTĘPNY →</span>
                <span className="nav-filename">{next.slug}</span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </main>

      <Footer fileCount={allItems.length} totalSize={totalSize} />
    </>
  );
}
