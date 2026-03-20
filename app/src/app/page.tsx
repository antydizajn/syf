import { getAllItems, getTotalSize } from '@/lib/files';
import { HomeAesthetic } from '@/components/HomeAesthetic';

export default async function HomePage() {
  const allItems = getAllItems();
  const totalSize = getTotalSize();

  return (
    <HomeAesthetic 
      items={allItems} 
      totalSize={totalSize} 
    />
  );
}
