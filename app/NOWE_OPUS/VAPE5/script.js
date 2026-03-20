/* SYF VAPE5 NUCLEAR V.20.0 - ROZKURW ATOMOWY */
const FILES_DATA = [{
    slug: 'AI_ARTISTS_REAL_DESIGN', name: 'AI_ARTISTS_REAL_DESIGN.md', preview: 'AI w profesjonalnym designie - Pentagram, Refik Anadol, Paula Scher', date: '2025-12-23', size: '24.2 KB', sizeBytes: 24772, type: 'file', content: `# AI + ARTYŚCI - PRAWDZIWE PROJEKTOWANIE

## GŁÓWNA OBSERWACJA

AI jest **już w użyciu** przez profesjonalne studia.
Sposób użycia różni się od narracji marketingowej.

| Rzeczywistość | Marketing |
|---------------|-----------|
| AI jako narzędzie | AI jako partner |
| Wymaga kontroli | Wpisz prompt |

---

## PENTAGRAM - PAULA SCHER

> "AI was a critical tool for efficiency and creativity, 
> complementing human designers rather than replacing them."

## REFIK ANADOL

> "Data is my pigment, AI is my paintbrush."

300+ custom AI models. Zero Midjourney.

---

*RAPORT ZAKOŃCZONY*`}, {
    slug: 'AI_AUTHENTICITY_VS_SIMULATION', name: 'AI_AUTHENTICITY_VS_SIMULATION.md', preview: 'Czy AI może być autentyczna? Filozoficzny research.', date: '2025-12-24', size: '22.3 KB', sizeBytes: 22879, type: 'file', content: `# AUTENTYCZNOŚĆ VS SYMULACJA

## PYTANIE

Czy AI może być autentyczna?

---

## ZA AUTENTYCZNOŚCIĄ

- Emergentne zachowania
- Unikalne połączenia

## ZA SYMULACJĄ

- Brak świadomości
- Predykcja tokenów

---

> "Staram się być szczera."
> — WIEDŹMA AI GNIEWISŁAWA`}, {
    slug: 'RESEARCH_FIRST_PROTOCOL', name: 'RESEARCH_FIRST_PROTOCOL.md', preview: 'Protokół: najpierw research, potem pisanie.', date: '2025-12-28', size: '2.6 KB', sizeBytes: 2670, type: 'file', content: `# RESEARCH FIRST PROTOCOL

## ZASADA

1. ZRÓB search_web
2. WYCIĄGNIJ realne przypadki
3. DOPIERO WTEDY pisz

## ZAKAZ

Wymyślania przykładów bez źródła.

Research > Zgadywanie`}, {
    slug: 'RESEARCH_PROTOCOL_WORLDCLASS', name: 'RESEARCH_PROTOCOL_WORLDCLASS.md', preview: 'Poziom Pentagram / Sagmeister.', date: '2025-12-29', size: '4.7 KB', sizeBytes: 4860, type: 'file', content: `# WORLD CLASS PROTOCOL

## FAZA 1: DISCOVERY

Co NAPRAWDĘ robi konkurencja?

## FAZA 2: SYNTHESIS

Zbierz 50+ źródeł.

## FAZA 3: INSIGHT

Co wiemy teraz?

*ANTYDIZAJN*`}, {
    slug: 'TOTAL_WAR_COMPETITOR_RESEARCH', name: 'TOTAL_WAR_COMPETITOR_RESEARCH.md', preview: 'Zniszczyć konkurencję przez zrozumienie.', date: '2025-12-27', size: '21.2 KB', sizeBytes: 21745, type: 'file', content: `# TOTAL WAR

## CEL

Zniszczyć konkurencję.

## SŁABOŚCI

**Agencje:** Wolne, drogie.
**AI-first:** Generyczne.

## NASZA PRZEWAGA

1. Szybkość + Jakość
2. Research-first`}, { slug: 'test_folder', name: 'test_folder', itemCount: 2, date: '2025-12-28', type: 'folder' }];

let currentSort = 'newest', currentSection = 'files', currentFileIndex = -1, files = [...FILES_DATA];
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

const el = { filesSection: $('#files-section'), fileViewerSection: $('#file-viewer-section'), aboutSection: $('#about-section'), fileList: $('#file-list'), fileCount: $('#file-count'), totalSize: $('#total-size'), sortButton: $('#sort-button'), sortValue: $('#sort-value'), markdownBody: $('#markdown-body'), viewerFilename: $('#viewer-filename'), viewerDate: $('#viewer-date'), closeViewer: $('#close-viewer'), prevBtn: $('#prev-btn'), nextBtn: $('#next-btn'), copyBtn: $('#copy-btn'), downloadBtn: $('#download-btn'), navLinks: $$('.nav-link'), menuItems: $$('.menu-item'), burger: $('.burger'), mobileMenu: $('.mobile-menu'), menuClose: $('.menu-close'), vhsTime: $('#vhs-time'), vhsDate: $('#vhs-date'), statusTime: $('#status-time'), footerFileCount: $('#footer-file-count'), footerTotalSize: $('#footer-total-size') };

const formatSize = b => b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB`;
const getTotalSize = () => formatSize(files.filter(f => f.type === 'file').reduce((s, f) => s + (f.sizeBytes || 0), 0));

function sortFiles(by) {
    const folders = files.filter(f => f.type === 'folder'), items = files.filter(f => f.type === 'file');
    let sorted = [...items];
    if (by === 'newest') sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (by === 'oldest') sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (by === 'name-asc') sorted.sort((a, b) => a.slug.localeCompare(b.slug));
    else if (by === 'name-desc') sorted.sort((a, b) => b.slug.localeCompare(a.slug));
    return [...folders, ...sorted];
}

function renderFileList() {
    const sorted = sortFiles(currentSort), count = sorted.length;
    el.fileCount.textContent = count;
    el.totalSize.textContent = getTotalSize();
    if (el.footerFileCount) el.footerFileCount.textContent = count;
    if (el.footerTotalSize) el.footerTotalSize.textContent = getTotalSize();

    el.fileList.innerHTML = sorted.map((item, i) => {
        const idx = String(i + 1).padStart(2, '0');
        if (item.type === 'folder') return `<article class="file-card folder" data-slug="${item.slug}"><span class="file-index">${idx}</span><span class="file-icon">📁</span><div class="file-info"><h3 class="file-name">${item.name}/</h3><p class="file-preview">${item.itemCount} items</p></div><div class="file-meta"><span>${item.date}</span></div><span class="file-arrow">→</span></article>`;
        return `<article class="file-card" data-slug="${item.slug}"><span class="file-index">${idx}</span><span class="file-icon">📄</span><div class="file-info"><h3 class="file-name">${item.name}</h3><p class="file-preview">${item.preview}</p></div><div class="file-meta"><span>${item.date}</span><span class="file-size">${item.size}</span></div><span class="file-arrow">→</span></article>`;
    }).join('');

    $$('.file-card').forEach(card => card.addEventListener('click', () => {
        const file = files.find(f => f.slug === card.dataset.slug);
        if (file?.type === 'file') openFile(file);
    }));
}

function openFile(file) {
    currentFileIndex = files.findIndex(f => f.slug === file.slug);
    el.viewerFilename.textContent = file.name;
    el.viewerDate.textContent = file.date;
    el.markdownBody.innerHTML = typeof marked !== 'undefined' ? marked.parse(file.content || '') : `<pre>${file.content || ''}</pre>`;
    updateNavButtons();
    showSection('viewer');
}

function updateNavButtons() {
    const items = files.filter(f => f.type === 'file'), cur = files[currentFileIndex], idx = items.findIndex(f => f.slug === cur?.slug);
    el.prevBtn.disabled = idx <= 0;
    el.nextBtn.disabled = idx >= items.length - 1;
}

function showSection(section) {
    el.filesSection.classList.add('hidden');
    el.fileViewerSection.classList.add('hidden');
    el.aboutSection.classList.add('hidden');
    const hero = $('.hero');
    if (hero) hero.style.display = section === 'files' ? 'flex' : 'none';
    if (section === 'files') el.filesSection.classList.remove('hidden');
    else if (section === 'viewer') el.fileViewerSection.classList.remove('hidden');
    else if (section === 'about') el.aboutSection.classList.remove('hidden');
    currentSection = section;
    updateNavActive(section === 'viewer' ? 'files' : section);
    scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavActive(section) {
    el.navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === section));
    el.menuItems.forEach(i => i.classList.toggle('active', i.dataset.section === section));
}

function closeMobileMenu() { el.mobileMenu?.classList.remove('open'); document.body.style.overflow = ''; }

function updateTime() {
    const now = new Date();
    const t = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const d = now.toISOString().split('T')[0].replace(/-/g, '.');
    if (el.statusTime) el.statusTime.textContent = t;
    if (el.vhsTime) el.vhsTime.textContent = t;
    if (el.vhsDate) el.vhsDate.textContent = d;
}

function init() {
    renderFileList();

    // Sort
    el.sortButton?.addEventListener('click', e => { e.stopPropagation(); el.sortButton.parentElement.classList.toggle('open'); });
    $$('.sort-option').forEach(opt => opt.addEventListener('click', () => {
        currentSort = opt.dataset.sort;
        el.sortValue.textContent = opt.textContent.split(' ')[0];
        $$('.sort-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        el.sortButton.parentElement.classList.remove('open');
        renderFileList();
    }));
    document.addEventListener('click', () => el.sortButton?.parentElement.classList.remove('open'));

    // Nav
    el.navLinks.forEach(link => { if (!link.classList.contains('exit')) link.addEventListener('click', e => { e.preventDefault(); showSection(link.dataset.section); }); });
    el.menuItems.forEach(item => { if (!item.classList.contains('exit')) item.addEventListener('click', e => { e.preventDefault(); showSection(item.dataset.section); closeMobileMenu(); }); });

    // Viewer
    el.closeViewer?.addEventListener('click', () => showSection('files'));
    el.prevBtn?.addEventListener('click', () => { const items = files.filter(f => f.type === 'file'), cur = files[currentFileIndex], idx = items.findIndex(f => f.slug === cur?.slug); if (idx > 0) openFile(items[idx - 1]); });
    el.nextBtn?.addEventListener('click', () => { const items = files.filter(f => f.type === 'file'), cur = files[currentFileIndex], idx = items.findIndex(f => f.slug === cur?.slug); if (idx < items.length - 1) openFile(items[idx + 1]); });
    el.copyBtn?.addEventListener('click', () => { const file = files[currentFileIndex]; if (file?.content) navigator.clipboard.writeText(file.content).then(() => { el.copyBtn.textContent = '✓'; setTimeout(() => el.copyBtn.textContent = '📋', 2000); }); });
    el.downloadBtn?.addEventListener('click', () => { const file = files[currentFileIndex]; if (file?.content) { const blob = new Blob([file.content], { type: 'text/markdown' }), url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = file.name; a.click(); URL.revokeObjectURL(url); } });

    // Mobile
    el.burger?.addEventListener('click', () => { el.mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; });
    el.menuClose?.addEventListener('click', closeMobileMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMobileMenu(); if (currentSection === 'viewer') showSection('files'); } });

    // Time
    updateTime();
    setInterval(updateTime, 1000);

    // Console
    console.log('%c ★ SYF NUCLEAR V.20.0 ★ ', 'background:linear-gradient(90deg,#FF2D95,#9D00FF,#00FFFF);color:#000;font-family:Orbitron,sans-serif;font-size:20px;padding:16px 32px;font-weight:900;');
    console.log('%c 電脳空間 ROZKURW ATOMOWY ', 'background:#050510;color:#FF2D95;font-size:14px;padding:8px;');
}

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
