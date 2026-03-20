import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import DownloadBar from '@/components/DownloadBar';
import FileList from '@/components/FileList';
import Link from 'next/link';
import { 
  getFileBySlug, 
  getAllSlugs, 
  getAdjacentFiles, 
  getAllItems, 
  getTotalSize, 
  getBreadcrumb 
} from '@/lib/files';
import { renderMarkdown } from '@/lib/markdown';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function CatchAllPage({ params }: Props) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  
  // Check if it's a folder
  const allItems = await getAllItems();
  const items = allItems.filter(item => item.slug.startsWith(slug + '/') && !item.slug.slice(slug.length + 1).includes('/'));
  
  if (items.length > 0 || (allItems.some(item => item.slug === slug && item.type === 'folder'))) {
    const totalSize = await getTotalSize();
    const breadcrumb = await getBreadcrumb(slugArray);
    const folderName = slug.split('/').pop() || slug;
    
    return (
      <>
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 md:px-10 py-12 flex flex-col gap-8 min-h-screen">
          {/* BREADCRUMB */}
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50">
            <Link href="/" className="hover:underline">SYF</Link>
            {breadcrumb.map((item, i) => (
              <span key={item.href} className="flex items-center gap-2">
                <span>/</span>
                {i === breadcrumb.length - 1 ? (
                  <span className="text-black">{item.title}</span>
                ) : (
                  <Link href={item.href} className="hover:underline">{item.title}</Link>
                )}
              </span>
            ))}
          </nav>

          {/* FOLDER HEADER */}
          <header className="border-b-12 border-black pb-8 sticky top-[64px] bg-white z-50">
            <h1 className="text-6xl md:text-8xl font-[1000] tracking-tighter uppercase wrap-break-word leading-[0.8]">
              {folderName}/
            </h1>
            <p className="mt-4 bg-black text-white px-4 py-1 inline-block text-xs font-black uppercase">
              {items.length} ELEMENTÓW // DIRECTORY_NODE
            </p>
          </header>

          {/* FILE LIST */}
          <div className="flex-1">
            {items.length > 0 ? (
              <FileList items={items} />
            ) : (
              <div className="border-4 border-black border-dashed p-12 text-center">
                <p className="font-black uppercase opacity-20">FOLDER_IS_EMPTY</p>
              </div>
            )}
          </div>
        </main>
      </>
    );
  }
  
  // Check if it's a file
  const file = await getFileBySlug(slug);
  
  if (!file || !file.content) {
    notFound();
  }
  
  const htmlContent = await renderMarkdown(file.content);
  const { prev, next } = await getAdjacentFiles(slug);
  const breadcrumb = await getBreadcrumb(slugArray);

  return (
    <>
      <Header />
      <DownloadBar slug={slug} />
      
      <main className="max-w-5xl mx-auto px-4 md:px-10 py-20 flex flex-col gap-12 min-h-screen font-mono">
        {/* BREADCRUMB */}
        {breadcrumb.length > 1 && (
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-50">
            <Link href="/" className="hover:underline">SYF</Link>
            {breadcrumb.slice(0, -1).map((item) => (
              <span key={item.href} className="flex items-center gap-2">
                <span>/</span>
                <Link href={item.href} className="hover:underline">{item.title}</Link>
              </span>
            ))}
          </nav>
        )}

        {/* FILE HEADER */}
        <header className="border-b-12 border-black pb-8">
          <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase leading-[0.9] wrap-break-word mb-6">
            {file.title}
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] font-black uppercase opacity-50">
            <div className="flex gap-2">
              <span>MODIFIED:</span>
              <span className="text-black">{file.modifiedDate}</span>
            </div>
            <div className="flex gap-2">
              <span>CREATED:</span>
              <span className="text-black">{file.date}</span>
            </div>
            <div className="flex gap-2">
              <span>SIZE:</span>
              <span className="text-black">{file.size}</span>
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
          <nav className="grid grid-cols-1 md:grid-cols-2 border-t-12 border-black pt-12 gap-4">
            {prev ? (
              <Link href={`/${prev.slug}`} className="border-4 border-black p-6 hover:bg-black hover:text-white transition-all group">
                <span className="block text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest">← PREVIOUS_FILE</span>
                <span className="text-2xl font-[1000] tracking-tighter uppercase leading-none wrap-break-word block">
                  {prev.slug.split('/').pop()}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/${next.slug}`} className="border-4 border-black p-6 hover:bg-black hover:text-white transition-all group text-right">
                <span className="block text-[10px] font-black mb-2 opacity-50 uppercase tracking-widest text-right">NEXT_FILE →</span>
                <span className="text-2xl font-[1000] tracking-tighter uppercase leading-none wrap-break-word block">
                  {next.slug.split('/').pop()}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        )}
      </main>
    </>
  );
}
