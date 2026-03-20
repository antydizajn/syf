import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileList from '@/components/FileList';
import SortDropdown from '@/components/SortDropdown';
import Pagination from '@/components/Pagination';
import { getAllItems, getTotalSize, ItemData } from '@/lib/files';
import { HUDPanel } from '@/components/HUDPanel';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

interface PageProps {
  searchParams: Promise<{ page?: string; sort?: string }>;
}

function sortItems(items: ItemData[], sortBy: SortOption): ItemData[] {
  // Zawsze foldery pierwsze
  const folders = items.filter(i => i.type === 'folder');
  const files = items.filter(i => i.type === 'file');

  const sortedFolders = [...folders].sort((a, b) => a.name.localeCompare(b.name));
  
  const sortedFiles = [...files];
  switch (sortBy) {
    case 'newest':
      sortedFiles.sort((a, b) => 
        new Date(b.modifiedDate).getTime() - new Date(a.modifiedDate).getTime()
      );
      break;
    case 'oldest':
      sortedFiles.sort((a, b) => 
        new Date(a.modifiedDate).getTime() - new Date(b.modifiedDate).getTime()
      );
      break;
    case 'name-asc':
      sortedFiles.sort((a, b) => a.slug.localeCompare(b.slug));
      break;
    case 'name-desc':
      sortedFiles.sort((a, b) => b.slug.localeCompare(a.slug));
      break;
  }

  return [...sortedFolders, ...sortedFiles];
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const sort = (params.sort || 'newest') as SortOption;
  
  const allItems = getAllItems();
  const sortedItems = sortItems(allItems, sort);
  
  const perPage = 30;
  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const startIndex = (page - 1) * perPage;
  const items = sortedItems.slice(startIndex, startIndex + perPage);
  
  const totalSize = getTotalSize();

  return (
    <>
      <Header activePage="files" />
      
      <main className="hud-main-container">
        {/* HERO SECTION - SYF_ */}
        <section className="hud-hero-section">
          <HUDPanel title="SYSTEM_INIT" className="hero-panel">
            <div className="hero-status-code">{">"} STATUS_OK // 0x53 0x59 0x46</div>
            
            <div className="hero-title-group">
              <span className="hero-label-top">PUBLICZNY</span>
              
              <div className="hero-logo-row glitch-hover">
                <span className="logo-letter">S</span>
                <span className="logo-letter accent">Y</span>
                <span className="logo-letter">F</span>
              </div>

              <span className="hero-label-bottom">PLIKÓW</span>
            </div>

            <p className="hero-footer-telemetry">
               INIT_MAIN_CONSOLE // DATA_STREAM:STABLE
            </p>
          </HUDPanel>
        </section>

        {/* HUD CONTROLS & FILE CONSOLE */}
        <section className="hud-system-layout">
          {/* SIDEBAR: SYSTEM STATUS */}
          <aside className="hud-sidebar">
            <HUDPanel title="SYSTEM_STATUS" className="sidebar-hud">
              <div className="telemetry-box">
                <div className="telemetry-row">
                  <span>MEMORY_TOTAL:</span>
                  <span className="val">{totalSize}</span>
                </div>
                <div className="telemetry-row">
                  <span>NODE_COUNT:</span>
                  <span className="val">{totalItems} UNITS</span>
                </div>
                <div className="telemetry-row">
                  <span>ENCRYPTION:</span>
                  <span className="val-secure">NULL / BYPASS</span>
                </div>
                
                <div className="telemetry-processes">
                  <p className="proc-title">{"//"} ACTIVE_PROCESSES:</p>
                  <ul className="proc-list">
                    <li>{">"} SCANNING_FILES...</li>
                    <li>{">"} HUD_RENDER_OK</li>
                    <li>{">"} ANTYDIZAJN_V2.0_LOADED</li>
                  </ul>
                </div>
              </div>
            </HUDPanel>
          </aside>

          {/* MAIN CONSOLE: FILE LISTING */}
          <div className="hud-console">
            <HUDPanel title="FILE_CONSOLE" className="console-hud">
              <div className="console-header">
                <div className="console-cmd">
                   $ ls -la /syf/files/ --sort={sort}
                </div>
                <Suspense fallback={<div className="loading-manifest">LOADING_MANIFEST...</div>}>
                  <SortDropdown currentSort={sort} />
                </Suspense>
              </div>

              {items.length > 0 ? (
                <div className="file-list-wrapper">
                   <FileList items={items} startIndex={startIndex} />
                </div>
              ) : (
                <div className="empty-console">
                  <p className="error-text">
                    {"[!]"} DATA_NOT_FOUND: PLEASE_UPLOAD_MARKDOWN
                  </p>
                </div>
              )}
            </HUDPanel>
          </div>
        </section>

        {/* PAGINATION */}
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          sortParam={sort !== 'newest' ? sort : undefined}
        />
      </main>


      <Footer fileCount={totalItems} totalSize={totalSize} />
    </>
  );
}
