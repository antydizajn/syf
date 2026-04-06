import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  getFileBySlug, 
  getAllSlugs, 
  getAllItems, 
  getBreadcrumb 
} from '@/lib/files';
import { orphansGuard } from '@/lib/typography';
import dynamic from 'next/dynamic';

import ContentHUD from '@/components/ContentHUD';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  
  const item = await getFileBySlug(slug);
  
  if (item?.type === 'folder') {
    const title = `${item.title.toUpperCase()} /`;
    const description = orphansGuard(`Katalog ${item.title} zawierający ${item.itemCount} plików w systemie SYF.`);
    
    return {
      title,
      description,
      openGraph: {
        title: `${title} | SYF.ANTYDIZAJN.PL`,
        description,
        type: 'website',
        images: ["/og-image.png"],
      }
    };
  }

  if (item?.type === 'file') {
    const title = orphansGuard(item.title);
    const description = orphansGuard(item.preview || `Dokument ${item.title} w dumpie SYF.`);

    return {
      title,
      description,
      openGraph: {
        title: `${title} | SYF.ANTYDIZAJN.PL`,
        description,
        type: 'article',
        publishedTime: item.date,
        modifiedTime: item.modifiedDate,
        images: ["/og-image.png"],
      }
    };
  }

  return {
    title: 'Not Found',
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await params;
  const slug = slugArray.join('/');
  
  const item = await getFileBySlug(slug);
  
  if (!item) {
    notFound();
  }
  
  const breadcrumb = await getBreadcrumb(slugArray);

  // Pre-process orphans on server for Performance 100
  if (item.content) {
    item.content = orphansGuard(item.content);
  }

  if (item.type === 'folder') {
    // Get items within this folder
    const allItems = await getAllItems();
    const folderItems = allItems.filter(child => {
      const prefix = `${slug}/`;
      return child.slug.startsWith(prefix) && 
             !child.slug.slice(prefix.length).includes('/');
    });

    return (
      <ContentHUD 
        isFolder={true} 
        items={folderItems} 
        breadcrumb={breadcrumb} 
        slug={slug} 
        folderName={item.title} 
      />
    );
  }
  
  return (
    <ContentHUD 
      isFolder={false} 
      file={item} 
      breadcrumb={breadcrumb} 
      slug={slug} 
    />
  );
}
