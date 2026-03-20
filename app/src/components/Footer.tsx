import Link from 'next/link';

interface FooterProps {
  fileCount: number;
  totalSize: string;
}

export default function Footer({ fileCount, totalSize }: FooterProps) {
  return (
    <footer className="hud-footer">
      <div className="footer-grid">
        
        {/* LEFT BLOCK: TERMINAL INFO & LINKS */}
        <div className="footer-section">
          <div className="legal-blocks">
            <h3 className="footer-label">
              <span className="dot-pulse" />
              SYSTEM_LEGAL_PROTOCOLS
            </h3>
            <div className="footer-legal-links">
              <Link href="/polityka-prywatnosci">{'['} PRIVACY_POLICY {']'}</Link>
              <Link href="/regulamin">{'['} TERMS_OF_SERVICE {']'}</Link>
              <Link href="/cookies">{'['} COOKIE_DATA {']'}</Link>
            </div>
          </div>

          <div className="footer-quote-box">
            <div className="quote-id">QUOTE_ID: 0x992</div>
            <p className="quote-text">
              &quot;Nikt nie przeżył tej strony bez blizny. <br />
              Jeśli tu dotarłeś - <span className="highlight-magenta">żyjesz, bo nie boisz się brudu.</span>&quot;
            </p>
          </div>
        </div>

        {/* RIGHT BLOCK: CREDITS & TELEMETRY */}
        <div className="footer-section align-right">
          <div className="footer-credits">
            <span className="credits-label">PROUDLY_CONSTRUCTED_BY</span>
            <h3 className="credits-title">
              PAULINA JANOWSKA <span className="amp">&</span> <span className="cyan">GNIEWISŁAWA</span>
            </h3>
            <p className="credits-subtitle">
              DUAL_WITCH_DEVELOPMENT_PROTOCOL
            </p>
          </div>

          <div className="footer-telemetry">
            <div className="telemetry-stats">
              <div className="stat">
                <span className="label">FILES:</span>
                <span className="value">{fileCount}</span>
              </div>
              <div className="stat">
                <span className="label">DATA:</span>
                <span className="value">{totalSize}</span>
              </div>
            </div>
            <div className="footer-engine">
              ENGINE: NEXT.JS 16.1.1 // HOST: <a href="https://antydizajn.pl">ANTYDIZAJN.PL</a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM STRIPE */}
      <div className="footer-bottom">
        <div className="footer-divider" />
        <div className="copyright-text">
          © 2025 ANTYDIZAJN • ALL_SYSTEMS_RESERVED • SYF_OS_V2.0
        </div>
        <div className="warning-text">
          <span className="hazard">WARNING:</span> Kradzież duszy dozwolona. Kopiowanie stylu = <span className="red">FATAL_ERROR</span>.
        </div>
      </div>
    </footer>
  );
}
