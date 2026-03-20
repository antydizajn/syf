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
  
  // Check if it's a folder
  const allItems = await getAllItems();
  const folderItems = allItems.filter(item => 
    item.slug.startsWith(slug + '/') && 
    !item.slug.slice(slug.length + 1).includes('/')
  );
  
  const isFolder = folderItems.length > 0 || allItems.some(item => item.slug === slug && item.type === 'folder');

  if (isFolder) {
    const folderName = slug.split('/').pop() || slug;
    const itemsCount = folderItems.length;
    return {
      title: `${folderName.toUpperCase()} /`,
      description: `Katalog ${folderName} zawierający ${itemsCount} plików w systemie SYF.`,
      openGraph: {
        title: `${folderName.toUpperCase()} | SYF.ANTYDIZAJN.PL`,
        description: `Eksploruj zawartość folderu ${folderName}.`,
        type: 'website',
      }
    };
  }

  const file = await getFileBySlug(slug);
  if (file) {
    return {
      title: file.title,
      description: file.preview || `Dokument ${file.title} w dumpie SYF.`,
      openGraph: {
        title: `${file.title} | SYF.ANTYDIZAJN.PL`,
        description: file.preview,
        type: 'article',
        publishedTime: file.date,
        modifiedTime: file.modifiedDate,
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
  
  // Check if it's a folder
  const allItems = await getAllItems();
  const folderItems = allItems.filter(item => 
    item.slug.startsWith(slug + '/') && 
    !item.slug.slice(slug.length + 1).includes('/')
  );
  
  const isFolder = folderItems.length > 0 || allItems.some(item => item.slug === slug && item.type === 'folder');
  const breadcrumb = await getBreadcrumb(slugArray);

  if (isFolder) {
    const folderName = slug.split('/').pop() || slug;
    return (
      <ContentHUD 
        isFolder={true} 
        items={folderItems} 
        breadcrumb={breadcrumb} 
        slug={slug} 
        folderName={folderName} 
      />
    );
  }
  
  // Check if it's a file
  const file = await getFileBySlug(slug);
  
  if (!file) {
    notFound();
  }
  
  return (
    <ContentHUD 
      isFolder={false} 
      file={file} 
      breadcrumb={breadcrumb} 
      slug={slug} 
    />
  );
}
