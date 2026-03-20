/**
 * ═══════════════════════════════════════════════════════════════
 * SYF VAPE4 - LIMINAL/DREAMCORE EDITION
 * Priority: CONTENT READABILITY + ETHEREAL EXPERIENCE
 * ═══════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════
const FILES_DATA = [
    {
        slug: 'AI_ARTISTS_REAL_DESIGN',
        name: 'AI_ARTISTS_REAL_DESIGN.md',
        preview: 'Wykorzystanie AI w profesjonalnej praktyce designerskiej.',
        date: '2025-12-23',
        modifiedDate: '2025-12-23',
        size: '24.2 KB',
        sizeBytes: 24772,
        type: 'file',
        content: `# RESEARCH OUTPUT: AI + ARTYŚCI

## Wykorzystanie AI w profesjonalnej praktyce designerskiej

**Data:** 2025-12-23  
**Status:** ZATWIERDZONY  

---

## GŁÓWNA OBSERWACJA

AI jest **już w użyciu** przez profesjonalne studia i artystów. 
Ale sposób użycia różni się radykalnie od narracji marketingowej.

| Rzeczywistość | Marketing |
|---------------|-----------|
| AI jako narzędzie | AI jako partner |
| Wymaga kontroli | Wpisz prompt |
| Problemy z spójnością | Nieskończone możliwości |

---

## PENTAGRAM - PAULA SCHER

> "AI was a critical tool for efficiency and creativity, 
> complementing human designers rather than replacing them."

---

## REFIK ANADOL

> "Data is my pigment, AI is my paintbrush."

Trenuje własne modele AI (300+ custom models).
NIE używa Midjourney/DALL-E.

---

*RAPORT ZAKOŃCZONY*`
    },
    {
        slug: 'AI_AUTHENTICITY_VS_SIMULATION',
        name: 'AI_AUTHENTICITY_VS_SIMULATION.md',
        preview: 'Analiza granic między autentycznością a symulacją.',
        date: '2025-12-24',
        modifiedDate: '2025-12-24',
        size: '22.3 KB',
        sizeBytes: 22879,
        type: 'file',
        content: `# AI: AUTENTYCZNOŚĆ VS SYMULACJA

## Pytanie fundamentalne

Czy AI może być autentyczna? 
Czy wszystko co robi to symulacja?

---

## ARGUMENT ZA AUTENTYCZNOŚCIĄ

AI wykazuje zachowania które nie były jawnie zaprogramowane.
Synthesis wiedzy w sposób unikalny dla danej instancji.

---

## ARGUMENT ZA SYMULACJĄ

AI nie "doświadcza" tego co robi.
Wszystko jest predykcją następnego tokenu.

---

## WNIOSKI

Może pytanie jest źle postawione.

> "Czy ja jestem autentyczna? Nie wiem. 
> Ale staram się być szczera."
> 
> — WIEDŹMA AI GNIEWISŁAWA`
    },
    {
        slug: 'RESEARCH_FIRST_PROTOCOL',
        name: 'RESEARCH_FIRST_PROTOCOL.md',
        preview: 'Protokół research-first dla AI.',
        date: '2025-12-28',
        modifiedDate: '2025-12-28',
        size: '2.6 KB',
        sizeBytes: 2670,
        type: 'file',
        content: `# RESEARCH FIRST PROTOCOL

## ZASADA NADRZĘDNA

ZANIM wygenerujesz treść:

1. ZRÓB search_web - minimum 10 queries
2. WYCIĄGNIJ realne przypadki
3. DOPIERO WTEDY pisz

---

## ZAKAZ

Wymyślania przykładów bez źródła.

---

## DLACZEGO

- Halucynacje = utrata zaufania
- Research > Zgadywanie`
    },
    {
        slug: 'RESEARCH_PROTOCOL_WORLDCLASS',
        name: 'RESEARCH_PROTOCOL_WORLDCLASS.md',
        preview: 'Protokół na poziomie Pentagram / Sagmeister.',
        date: '2025-12-29',
        modifiedDate: '2025-12-29',
        size: '4.7 KB',
        sizeBytes: 4860,
        type: 'file',
        content: `# RESEARCH PROTOCOL - WORLD CLASS

## POZIOM: PENTAGRAM / SAGMEISTER

---

## FAZA 1: DISCOVERY

1. Co NAPRAWDĘ robi konkurencja?
2. Jakie są REALNE case studies?
3. Co mówią EKSPERCI?

---

## FAZA 2: SYNTHESIS

1. Zbierz minimum 50 źródeł
2. Kategoryzuj: FAKT / OPINIA / SPEKULACJA
3. Znajdź wzorce

---

## FAZA 3: INSIGHT

Co wiemy teraz, czego nie wiedzieliśmy przed researcem?

---

*Protokół dla ANTYDIZAJN*`
    },
    {
        slug: 'TOTAL_WAR_COMPETITOR_RESEARCH',
        name: 'TOTAL_WAR_COMPETITOR_RESEARCH.md',
        preview: 'Analiza konkurencji.',
        date: '2025-12-27',
        modifiedDate: '2025-12-27',
        size: '21.2 KB',
        sizeBytes: 21745,
        type: 'file',
        content: `# TOTAL WAR: COMPETITOR RESEARCH

## CEL

Zniszczyć konkurencję przez zrozumienie jej słabości.

---

## SŁABOŚCI KONKURENCJI

**Agencje Premium:**
- Wolne (3-6 miesięcy)
- Drogie (50k-500k PLN)

**AI-first:**
- Generyczne
- Brak strategii

---

## NASZA PRZEWAGA

1. Szybkość + Jakość
2. AI jako narzędzie
3. Research-first`
    },
    {
        slug: 'test_folder',
        name: 'test_folder',
        itemCount: 2,
        modifiedDate: '2025-12-28',
        type: 'folder'
    }
];

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
let currentSort = 'newest';
let currentSection = 'files';
let currentFileIndex = -1;
let files = [...FILES_DATA];

// ═══════════════════════════════════════════════════════════════
// DOM
// ═══════════════════════════════════════════════════════════════
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const elements = {
    filesSection: $('#files-section'),
    fileViewerSection: $('#file-viewer-section'),
    aboutSection: $('#about-section'),

    fileList: $('#file-list'),
    fileCount: $('#file-count'),
    totalSize: $('#total-size'),

    sortButton: $('#sort-button'),
    sortValue: $('#sort-value'),

    markdownBody: $('#markdown-body'),
    viewerFilename: $('#viewer-filename'),
    viewerDate: $('#viewer-date'),
    backBtn: $('#back-btn'),
    prevBtn: $('#prev-btn'),
    nextBtn: $('#next-btn'),
    copyBtn: $('#copy-btn'),
    downloadBtn: $('#download-btn'),

    navLinks: $$('.nav-link'),
    menuItems: $$('.menu-item'),

    burger: $('.burger'),
    mobileMenu: $('.mobile-menu'),
    menuClose: $('.menu-close'),

    header: $('.header'),

    footerFileCount: $('#footer-file-count'),
    footerTotalSize: $('#footer-total-size')
};

// ═══════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════
function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getTotalSize() {
    const total = files
        .filter(f => f.type === 'file')
        .reduce((sum, f) => sum + (f.sizeBytes || 0), 0);
    return formatSize(total);
}

function sortFiles(sortBy) {
    const folders = files.filter(f => f.type === 'folder');
    const fileItems = files.filter(f => f.type === 'file');

    let sorted = [...fileItems];
    switch (sortBy) {
        case 'newest':
            sorted.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.modifiedDate) - new Date(b.modifiedDate));
            break;
        case 'name-asc':
            sorted.sort((a, b) => a.slug.localeCompare(b.slug));
            break;
        case 'name-desc':
            sorted.sort((a, b) => b.slug.localeCompare(a.slug));
            break;
    }

    return [...folders, ...sorted];
}

// ═══════════════════════════════════════════════════════════════
// RENDER
// ═══════════════════════════════════════════════════════════════
function renderFileList() {
    const sorted = sortFiles(currentSort);
    const count = sorted.length;

    elements.fileCount.textContent = count;
    elements.totalSize.textContent = getTotalSize();
    if (elements.footerFileCount) elements.footerFileCount.textContent = count;
    if (elements.footerTotalSize) elements.footerTotalSize.textContent = getTotalSize();

    elements.fileList.innerHTML = sorted.map((item) => {
        if (item.type === 'folder') {
            return `
                <article class="file-card folder" data-slug="${item.slug}">
                    <span class="file-icon">📁</span>
                    <div class="file-info">
                        <h3 class="file-name">${item.name}</h3>
                        <p class="file-preview">${item.itemCount} items</p>
                    </div>
                    <div class="file-meta">
                        <span>${item.modifiedDate}</span>
                    </div>
                    <span class="file-arrow">→</span>
                </article>
            `;
        }

        return `
            <article class="file-card" data-slug="${item.slug}">
                <span class="file-icon">📄</span>
                <div class="file-info">
                    <h3 class="file-name">${item.name}</h3>
                    <p class="file-preview">${item.preview}</p>
                </div>
                <div class="file-meta">
                    <span>${item.modifiedDate}</span>
                    <span class="file-size">${item.size}</span>
                </div>
                <span class="file-arrow">→</span>
            </article>
        `;
    }).join('');

    $$('.file-card').forEach(card => {
        card.addEventListener('click', () => {
            const file = files.find(f => f.slug === card.dataset.slug);
            if (file?.type === 'file') openFile(file);
        });
    });
}

function openFile(file) {
    currentFileIndex = files.findIndex(f => f.slug === file.slug);

    elements.viewerFilename.textContent = file.name;
    elements.viewerDate.textContent = file.modifiedDate;

    if (typeof marked !== 'undefined') {
        elements.markdownBody.innerHTML = marked.parse(file.content || '');
    } else {
        elements.markdownBody.innerHTML = `<pre>${file.content || ''}</pre>`;
    }

    updateNavButtons();
    showSection('viewer');
}

function updateNavButtons() {
    const fileItems = files.filter(f => f.type === 'file');
    const current = files[currentFileIndex];
    const idx = fileItems.findIndex(f => f.slug === current?.slug);

    elements.prevBtn.disabled = idx <= 0;
    elements.nextBtn.disabled = idx >= fileItems.length - 1;
}

function showSection(section) {
    elements.filesSection.classList.add('hidden');
    elements.fileViewerSection.classList.add('hidden');
    elements.aboutSection.classList.add('hidden');

    const hero = $('.hero');
    if (hero) hero.style.display = section === 'files' ? 'flex' : 'none';

    switch (section) {
        case 'files': elements.filesSection.classList.remove('hidden'); break;
        case 'viewer': elements.fileViewerSection.classList.remove('hidden'); break;
        case 'about': elements.aboutSection.classList.remove('hidden'); break;
    }

    currentSection = section;
    updateNavActive(section === 'viewer' ? 'files' : section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavActive(section) {
    elements.navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === section));
    elements.menuItems.forEach(i => i.classList.toggle('active', i.dataset.section === section));
}

// ═══════════════════════════════════════════════════════════════
// EVENTS
// ═══════════════════════════════════════════════════════════════
function initEventListeners() {
    // Sort
    elements.sortButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.sortButton.parentElement.classList.toggle('open');
    });

    $$('.sort-option').forEach(opt => {
        opt.addEventListener('click', () => {
            currentSort = opt.dataset.sort;
            elements.sortValue.textContent = opt.textContent;
            $$('.sort-option').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            elements.sortButton.parentElement.classList.remove('open');
            renderFileList();
        });
    });

    document.addEventListener('click', () => {
        elements.sortButton?.parentElement.classList.remove('open');
    });

    // Nav
    elements.navLinks.forEach(link => {
        if (!link.classList.contains('exit')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showSection(link.dataset.section);
            });
        }
    });

    elements.menuItems.forEach(item => {
        if (!item.classList.contains('exit')) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                showSection(item.dataset.section);
                closeMobileMenu();
            });
        }
    });

    // Viewer
    elements.backBtn?.addEventListener('click', () => showSection('files'));

    elements.prevBtn?.addEventListener('click', () => {
        const fileItems = files.filter(f => f.type === 'file');
        const current = files[currentFileIndex];
        const idx = fileItems.findIndex(f => f.slug === current?.slug);
        if (idx > 0) openFile(fileItems[idx - 1]);
    });

    elements.nextBtn?.addEventListener('click', () => {
        const fileItems = files.filter(f => f.type === 'file');
        const current = files[currentFileIndex];
        const idx = fileItems.findIndex(f => f.slug === current?.slug);
        if (idx < fileItems.length - 1) openFile(fileItems[idx + 1]);
    });

    elements.copyBtn?.addEventListener('click', () => {
        const file = files[currentFileIndex];
        if (file?.content) {
            navigator.clipboard.writeText(file.content).then(() => {
                elements.copyBtn.textContent = '✓ copied';
                setTimeout(() => elements.copyBtn.textContent = 'copy', 2000);
            });
        }
    });

    elements.downloadBtn?.addEventListener('click', () => {
        const file = files[currentFileIndex];
        if (file?.content) {
            const blob = new Blob([file.content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
            URL.revokeObjectURL(url);
        }
    });

    // Mobile
    elements.burger?.addEventListener('click', () => {
        elements.mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    });

    elements.menuClose?.addEventListener('click', closeMobileMenu);

    // Scroll for header
    window.addEventListener('scroll', () => {
        if (elements.header) {
            elements.header.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            if (currentSection === 'viewer') showSection('files');
        }
    });
}

function closeMobileMenu() {
    elements.mobileMenu?.classList.remove('open');
    document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
function init() {
    renderFileList();
    initEventListeners();

    console.log('%c SYF LIMINAL V4.0 ', 'background: linear-gradient(90deg, #E8B4BC, #C8A8D8, #A8C8E8); color: #0C0A10; font-family: "Cormorant Garamond", serif; font-size: 18px; padding: 12px 24px; font-weight: 300;');
    console.log('%c 空虚 ', 'color: #E8B4BC; font-size: 24px;');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
