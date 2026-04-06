import { Suspense } from 'react';
import { getAllItems, getTotalSize } from '@/lib/files';
import { HomeAesthetic } from '@/components/HomeAesthetic';
import { HomeHeader } from '@/components/HomeHeader';
import { orphansGuard } from '@/lib/typography';

async function HomeDataWrapper() {
  const allItems = await getAllItems();
  const totalSize = await getTotalSize();

  // Root level items only (no slashes in slug)
  const rootItems = allItems
    .filter(item => !item.slug.includes('/'))
    .map(({ content, ...rest }) => rest);

  // Server-side sorting: folders first, then alphabetical
  const sortedItems = rootItems.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return (a.name || "").localeCompare(b.name || "");
  });

  return (
    <>
      <HomeHeader totalSize={totalSize} itemsCount={sortedItems.length} />
      <HomeAesthetic 
        items={sortedItems as any} 
        totalSize={totalSize} 
      />
    </>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen font-mono">
      <Suspense fallback={<HomeHeader />}>
        <HomeDataWrapper />
      </Suspense>
    </div>
  );
}
