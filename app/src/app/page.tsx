import { getAllItems, getTotalSize } from '@/lib/files';
import { HomeAesthetic } from '@/components/HomeAesthetic';

export default async function HomePage() {
  const allItems = await getAllItems();
  const totalSize = await getTotalSize();

  // Root level items only (no slashes in slug)
  const rootItems = allItems
    .filter(item => !item.slug.includes('/'))
    .map(({ content, ...rest }) => rest); // EXPLICITLY STRIP CONTENT FOR HYDRATION PERFORMANCE

  return (
    <HomeAesthetic 
      items={rootItems as any} 
      totalSize={totalSize} 
    />
  );
}
