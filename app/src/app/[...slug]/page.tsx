import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { 
  getFileBySlug, 
  getAllSlugs, 
  getAllItems, 
  getBreadcrumb 
} from '@/lib/files';
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
    return {
      title: `${item.title.toUpperCase()} /`,
      description: `Katalog ${item.title} zawierający ${item.itemCount} plików w systemie SYF.`,
      openGraph: {
        title: `${item.title.toUpperCase()} | SYF.ANTYDIZAJN.PL`,
        description: `Eksploruj zawartość folderu ${item.title}.`,
        type: 'website',
      }
    };
  }

  if (item?.type === 'file') {
    return {
      title: item.title,
      description: item.preview || `Dokument ${item.title} w dumpie SYF.`,
      openGraph: {
        title: `${item.title} | SYF.ANTYDIZAJN.PL`,
        description: item.preview,
        type: 'article',
        publishedTime: item.date,
        modifiedTime: item.modifiedDate,
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

  if (item.type === 'folder') {
    // Get items within this folder
    const allItems = await getAllItems();
    const folderItems = allItems.filter(child => {
      // Must start with parent slug + /
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
