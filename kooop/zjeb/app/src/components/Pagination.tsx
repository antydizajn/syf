import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  sortParam?: string;
}

export default function Pagination({ 
  currentPage, 
  totalPages, 
  baseUrl = '/',
  sortParam 
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set('page', String(page));
    if (sortParam) params.set('sort', sortParam);
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // Generuj numery stron do wyswietlenia
  const getPageNumbers = () => {
    const pages: (number | 'dots')[] = [];
    
    if (totalPages <= 7) {
      // Pokaz wszystkie strony
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Zawsze pierwsza strona
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('dots');
      }
      
      // Strony wokol aktualnej
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('dots');
      }
      
      // Zawsze ostatnia strona
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav className="hud-pagination" aria-label="Paginacja">
      {currentPage > 1 ? (
        <Link href={buildUrl(currentPage - 1)} className="pagination-ctrl prev">
          <span>←</span> POPRZEDNIA
        </Link>
      ) : (
        <button className="pagination-ctrl prev" disabled>
          <span>←</span> POPRZEDNIA
        </button>
      )}

      <div className="pagination-list">
        {getPageNumbers().map((page, index) => 
          page === 'dots' ? (
            <span key={`dots-${index}`} className="pagination-dots">...</span>
          ) : (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`pagination-num ${page === currentPage ? 'active' : ''}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              <span className="num-val">{page}</span>
              {page === currentPage && <span className="active-glow" />}
            </Link>
          )
        )}
      </div>

      {currentPage < totalPages ? (
        <Link href={buildUrl(currentPage + 1)} className="pagination-ctrl next">
          NASTĘPNA <span>→</span>
        </Link>
      ) : (
        <button className="pagination-ctrl next" disabled>
          NASTĘPNA <span>→</span>
        </button>
      )}
    </nav>
  );
}
