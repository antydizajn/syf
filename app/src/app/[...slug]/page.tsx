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
