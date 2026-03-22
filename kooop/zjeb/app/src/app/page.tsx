import { getAllItems, getTotalSize } from '@/lib/files';
import { HomeAesthetic } from '@/components/HomeAesthetic';

export default async function HomePage() {
  const allItems = await getAllItems();
  const totalSize = await getTotalSize();

  // Root only shows top-level items
  const rootItems = allItems.filter(item => !item.slug.includes('/'));

  return (
    <HomeAesthetic 
      items={rootItems} 
      totalSize={totalSize} 
    />
  );
}
