'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

const SORT_LABELS: Record<SortOption, string> = {
  'newest': 'Najnowsze',
  'oldest': 'Najstarsze',
  'name-asc': 'Nazwa A–Z',
  'name-desc': 'Nazwa Z–A',
};

interface SortDropdownProps {
  currentSort: SortOption;
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Zamknij dropdown po kliknieciu poza nim
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    params.delete('page'); // Reset do strony 1
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <div 
      ref={dropdownRef}
      className={`hud-dropdown ${isOpen ? 'open' : ''}`}
    >
      <button 
        className="hud-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="trigger-label">{isOpen ? '[-] COLLAPSE' : '[+] SORT_BY'}</span>
        <span className="current-sort">{SORT_LABELS[currentSort].toUpperCase()}</span>
      </button>
      
      {isOpen && (
        <div 
          className="hud-dropdown-menu"
          role="listbox"
        >
          <div className="menu-header">SELECT_CRITERIA</div>
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <button
              key={option}
              className={`menu-option ${option === currentSort ? 'selected' : ''}`}
              onClick={() => handleSort(option)}
              role="option"
              aria-selected={option === currentSort}
            >
              {option === currentSort ? '► ' : ''}{SORT_LABELS[option].toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
