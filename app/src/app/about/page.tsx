import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllFiles, getTotalSize } from '@/lib/files';
import { HUDPanel } from '@/components/HUDPanel';

export const metadata = {
  title: 'O SYF | ANTYDIZAJN',
  description: 'Publiczny dump plików Markdown. Syf, chaos, bałagan myśli.',
};

export default function AboutPage() {
  const allFiles = getAllFiles();
  const totalSize = getTotalSize();

  return (
    <>
      <Header activePage="about" />
      
      <main className="hud-about-container">
        <HUDPanel title="ABOUT_PROTOCOL // 0x42">
          <div className="about-content">
            <h1 className="about-title">
              O <span className="cyan">SYF</span>.OS
            </h1>

            <section className="about-section">
              <h2 className="section-label">
                <span className="dot" />
                CO_TO_JEST?
              </h2>
              <div className="section-body">
                <p>
                  <strong className="bold-white">SYF</strong> to publiczny dump plików Markdown. 
                  Bez bazy danych, bez logowania, bez bullshitu.
                </p>
                <p>
                  Wrzucasz plik <code className="code-magenta">.md</code> do folderu → 
                  automatycznie dostępny pod <code className="code-cyan">/NAZWA</code>.
                </p>
              </div>
            </section>

            <section className="about-section">
              <h2 className="section-label">
                <span className="dot" />
                JAK_TO_DZIAŁA?
              </h2>
              <ul className="about-list">
                <li>
                  <span className="bullet">►</span>
                  <span>Plik <code className="cyan">manifest.md</code> → dostępny pod <code className="white">/manifest</code></span>
                </li>
                <li>
                  <span className="bullet">►</span>
                  <span>Plik <code className="cyan">research-ai.md</code> → dostępny pod <code className="white">/research-ai</code></span>
                </li>
                <li className="faint">
                  <span className="bullet">►</span>
                  <span>I tak dalej. Zero magii. Czysty filesystem.</span>
                </li>
              </ul>
            </section>

            <section className="about-section">
              <h2 className="section-label">
                <span className="dot" />
                TECH_STACK // CORE
              </h2>
              <div className="tech-grid">
                <div className="tech-item">
                  <span className="label">FRAMEWORK:</span>
                  <span className="val">NEXT.JS 16.1.1 (TURBOPACK)</span>
                </div>
                <div className="tech-item">
                  <span className="label">RUNTIME:</span>
                  <span className="val">REACT 19 (CANARY)</span>
                </div>
                <div className="tech-item">
                  <span className="label">LOGIC:</span>
                  <span className="val">TYPESCRIPT / TAILWIND JIT</span>
                </div>
                <div className="tech-item accent">
                  <span className="label">DATABASE:</span>
                  <span className="val-magenta">VOID (FILESYSTEM_ONLY)</span>
                </div>
              </div>
            </section>

            <section className="about-callout">
              <h3 className="callout-label">DLACZEGO &quot;SYF&quot;?</h3>
              <p className="callout-text">
                Bo to jest syf. Chaotyczny zbiór plików, myśli, researchu. 
                Nie udajemy, że to jest eleganckie. To jest brutalne i szczere.
              </p>
            </section>

            <section className="about-footer">
              <span>ESTABLISHED_BY ANTYDIZAJN</span>
              <span>AGI_READY: TRUE</span>
            </section>
          </div>
        </HUDPanel>
      </main>

      <Footer fileCount={allFiles.length} totalSize={totalSize} />
    </>
  );
}
