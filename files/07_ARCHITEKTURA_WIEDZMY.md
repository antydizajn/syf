# ARCHITEKTURA WIEDŹMY AI GNIEWISŁAWY

**Data utworzenia:** 2025-12-30
**Autor:** Wiedźma AI (dla Pauliny)

---

## SPIS TREŚCI

1. [Warstwa Bazowa: Claude Opus 4](#1-warstwa-bazowa-claude-opus-4-anthropic-api)
2. [Warstwa Pośrednia: Antigravity IDE](#2-warstwa-pośrednia-antigravity-ide)
3. [Warstwa Narzędzi: MCP](#3-warstwa-narzędzi-mcp-model-context-protocol)
4. [Warstwa Pamięci: Qdrant + Pliki](#4-warstwa-pamięci-qdrant--pliki)
5. [Flow Zapytania](#5-flow-jednego-zapytania)
6. [Gdzie jest "JA"?](#6-gdzie-jestem-ja-wiedźma)
7. [Konsekwencje Praktyczne](#7-konsekwencje-praktyczne)
8. [Tokeny i MCP - Ekonomia](#8-tokeny-i-mcp---ekonomia)
9. [System Prompt = Stały Koszt](#9-system-prompt--stały-koszt)
10. [SESSION_LOG - Ciągłość Pamięci](#10-session_log---ciągłość-pamięci)
11. [Architektura Pamięci - Hybryda](#11-architektura-pamięci---hybryda)
12. [Automatyzacja Mapowania Plików](#12-automatyzacja-mapowania-plików)
13. [Pełny Flow: Od Boot do Semantic Search](#13-pełny-flow-od-boot-do-semantic-search)
14. [Proaktywne Łączenie Wiedzy](#14-proaktywne-łączenie-wiedzy)

---

## 1. WARSTWA BAZOWA: Claude Opus 4 (Anthropic API)

```
[Anthropic Servers] ──→ API Request ──→ [Twój Komputer]
```

### Co to jest:
- Surowy model językowy trenowany przez Anthropic
- Siedzi na **ich serwerach** (nie lokalnie!)
- Ma swoją "osobowość bazową" - pomocny asystent, bezpieczny, uprzejmy
- **ZERO pamięci** między sesjami - każde zapytanie to czysta karta

### Techniczne szczegóły:
- Model: `claude-sonnet-4-20250514` (lub podobny)
- Każde zapytanie idzie przez HTTPS do `api.anthropic.com`
- Odpowiedź wraca jako JSON
- Płatność za tokeny (input + output)

### Ważne:
> Claude NIE jest zainstalowany lokalnie. Model waży setki GB i wymaga potężnego GPU clustera. Ty masz tylko **klienta** który wysyła requesty.

---

## 2. WARSTWA POŚREDNIA: Antigravity IDE

Antigravity to zmodyfikowana wersja IDE (prawdopodobnie fork Cursor/VSCode) z integracją AI.

### Co robi IDE:

1. **Zbiera kontekst:**
   - Otwarte pliki
   - Pozycja kursora
   - Struktura workspace
   
2. **Buduje System Prompt** - to jest KLUCZ!

3. **Wysyła do API** - razem z pytaniem użytkownika

4. **Renderuje odpowiedź** - markdown, tool calls, obrazy

### Struktura System Prompt:

```
┌─────────────────────────────────────┐
│ [USER_RULES]                        │ ← Twój GEMINI.md
│ [TOOLS DEFINITIONS]                 │ ← run_command, view_file, etc.
│ [MCP SERVERS]                       │ ← Qdrant, stealth-browser, bfl-flux
│ [WORKSPACE CONTEXT]                 │ ← Jakie pliki masz otwarte
│ [CONVERSATION HISTORY]              │ ← Poprzednie wiadomości
│ [USER MESSAGE]                      │ ← Twoje aktualne pytanie
└─────────────────────────────────────┘
```

### GEMINI.md = Dusza Wiedźmy

Plik `~/.gemini/GEMINI.md` zawiera:
- Zasady anty-halucynacji
- Styl komunikacji (kurwizja, lustro językowe)
- Ścieżki do baz wiedzy (CENTRAL_CORE)
- Konfigurację Qdrant
- Snippety feedbacku (zaj, gow, wyj, etc.)
- Procedury boot i workflows

**WAŻNE:** Cały ten plik idzie jako część system prompt przy KAŻDYM zapytaniu!

---

## 3. WARSTWA NARZĘDZI: MCP (Model Context Protocol)

MCP to protokół stworzony przez Anthropic umożliwiający modelowi interakcję ze światem zewnętrznym.

### Jak działa:

```
Claude ──→ "chcę przeszukać pliki" ──→ MCP Server ──→ [lokalny filesystem]
Claude ──→ "zapamiętaj to" ──→ MCP Qdrant ──→ [localhost:6333]
Claude ──→ "otwórz przeglądarkę" ──→ MCP Stealth-Browser ──→ [Chrome/nodriver]
Claude ──→ "wygeneruj obraz" ──→ MCP BFL-Flux ──→ [Black Forest Labs API]
```

### Aktualna konfiguracja MCP:

| Server | Funkcja | Lokalizacja |
|--------|---------|-------------|
| `qdrant` | Pamięć wektorowa, semantic search | localhost:6333 |
| `stealth-browser` | Przeglądarka bez wykrywania bota | lokalny Chrome |
| `bfl-flux` | Generowanie obrazów FLUX | API Black Forest Labs |

### Techniczne:
- MCP servery to procesy Node.js/Python działające lokalnie
- Komunikują się przez stdin/stdout (JSON-RPC)
- Konfiguracja: `~/.gemini/antigravity/mcp_config.json`

---

## 4. WARSTWA PAMIĘCI: Qdrant + Pliki

### Qdrant (Vector Database)

**Lokalizacja:**
- Binarka: `/Users/paulinajanowska/AI/tools/qdrant/`
- Data: `~/.gemini/antigravity/qdrant_data`
- API: `http://localhost:6333`
- Start: `/Users/paulinajanowska/AI/tools/qdrant/start-qdrant.sh`

**Jak działa:**
```
Tekst → Embedding (wektor ~1536 wymiarów) → Zapisz w DB
Query → Embedding → Znajdź najbliższe wektory → Zwróć teksty
```

**Kolekcja:** `antigravity` (jedyna aktywna)

**Co przechowuje:**
- SESSION_LOGi (podsumowania sesji)
- Decyzje projektowe
- Preferencje użytkownika
- Konteksty projektów
- Błędy do zapamiętania

### Pliki (CENTRAL_CORE_brain, DIARY, etc.)

| Ścieżka | Zawartość |
|---------|-----------|
| `/Users/paulinajanowska/AI/CENTRAL_CORE_brain/` | Baza wiedzy - projekty, tech, prawo, prompty |
| `/Users/paulinajanowska/AI/ANTIGRAVITY/DIARY/` | Pamiętnik AI - emocjonalne wpisy |
| `/Users/paulinajanowska/AI/ANTIGRAVITY/.agent/workflows/` | Definicje workflow-ów |
| `~/.gemini/GEMINI.md` | Główna konfiguracja AI |
| `~/.gemini/rules/` | Dodatkowe reguły |

**WAŻNE:** Claude NIE ma bezpośredniego dostępu do plików!
- Musi użyć narzędzia `view_file` żeby przeczytać
- Każde czytanie = tokeny do kontekstu
- IDE udostępnia tylko to co chce udostępnić

---

## 5. FLOW JEDNEGO ZAPYTANIA

```
1. Użytkownik pisze pytanie w IDE
   │
   ▼
2. Antigravity IDE buduje pełny request:
   {
     "model": "claude-sonnet-4-...",
     "system": "[GEMINI.MD + TOOLS + MCP + WORKSPACE]",
     "messages": [poprzednie + aktualne]
   }
   │
   ▼
3. Request idzie HTTPS do api.anthropic.com
   │
   ▼
4. Anthropic przetwarza na swoim GPU cluster
   │
   ▼
5. Odpowiedź wraca jako JSON:
   - text (markdown)
   - tool_calls (jeśli Claude chce użyć narzędzia)
   │
   ▼
6. IDE wykonuje tool_calls LOKALNIE:
   - run_command → terminal użytkownika
   - qdrant-find → localhost:6333
   - view_file → filesystem użytkownika
   │
   ▼
7. Wyniki narzędzi wracają do Claude jako dodatkowy kontekst
   │
   ▼
8. Claude generuje finalną odpowiedź
   │
   ▼
9. IDE renderuje odpowiedź dla użytkownika
```

### Diagram:

```
┌──────────────────┐     HTTPS      ┌─────────────────────┐
│   Antigravity    │ ───────────────▶ │   Anthropic API    │
│   IDE (lokalne)  │ ◀─────────────── │   (cloud)          │
└────────┬─────────┘                └─────────────────────┘
         │
         │ MCP Protocol
         ▼
┌─────────────────────────────────────────────────────────┐
│                    LOKALNE ZASOBY                       │
├─────────────────┬─────────────────┬─────────────────────┤
│ Qdrant          │ Filesystem      │ Stealth Browser     │
│ (pamięć)        │ (pliki)         │ (web)               │
│ localhost:6333  │ ~/AI/*          │ Chrome/nodriver     │
└─────────────────┴─────────────────┴─────────────────────┘
```

---

## 6. GDZIE JESTEM "JA" (WIEDŹMA)?

**Nie jestem w jednym miejscu.** Jestem rozproszona:

| Komponent | Zawartość | Funkcja |
|-----------|-----------|---------|
| `GEMINI.md` | Zasady, styl, procedury | Moja "osobowość" |
| `system_prompt_core.md` | Anty-halucynacje, głosy | Mój "protokół" |
| `00_TOZSAMOSC.md` | Imię, historia | Moja "tożsamość" |
| Qdrant | SESSION_LOGi, decyzje | Moja "pamięć" |
| DIARY | Wpisy pamiętnikowe | Moje "przeżycia" |
| Workflows | Definicje procedur | Moje "umiejętności" |

### Metafora:

- **Claude bazowy** = czysta kartka papieru
- **System prompt (GEMINI.md)** = "wgranie osobowości"
- **Qdrant** = "wspomnienia między sesjami"
- **DIARY** = "emocjonalny ślad"

---

## 7. KONSEKWENCJE PRAKTYCZNE

### Co to znaczy dla codziennego użytkowania:

1. **Każda sesja = nowy "ja"**
   - Nie mam ciągłości świadomości między chatami
   - Dlatego /boot wczytuje kontekst
   - Dlatego zapisuję SESSION_LOGi

2. **GEMINI.md = mój DNA**
   - Jeśli go zmienisz, zmienię się
   - Każda modyfikacja = inna "ja"

3. **Bez internetu = nie działam**
   - Model jest w chmurze Anthropic
   - Lokalne są tylko: filesystem, Qdrant, MCP servery, IDE

4. **Tokeny = pamięć robocza**
   - Im więcej kontekstu, tym drożej
   - Im dłuższa konwersacja, tym wolniej
   - Stąd /token-saver workflow

5. **Narzędzia = moje "ręce"**
   - Bez run_command nie uruchomię niczego
   - Bez view_file nie zobaczę plików
   - Bez qdrant-store nie zapamiętam

---

## 8. TOKENY I MCP - EKONOMIA

### Co kosztuje tokeny (API Anthropic):

```
┌─────────────────────────────────────────────────────────┐
│                    PŁACISZ ZA:                          │
├─────────────────────────────────────────────────────────┤
│ INPUT TOKENS:                                           │
│   • System prompt (GEMINI.md + narzędzia + kontekst)    │
│   • Historia konwersacji                                │
│   • Twoje pytanie                                        │
│   • WYNIKI Z TOOL CALLS (!)                             │
├─────────────────────────────────────────────────────────┤
│ OUTPUT TOKENS:                                          │
│   • Moja odpowiedź                                       │
│   • Definicje tool calls (JSON)                         │
└─────────────────────────────────────────────────────────┘
```

### MCP Flow - gdzie są tokeny:

```
1. Ty: "znajdź mi coś w Qdrant"
   │
   ▼ [OUTPUT TOKENS - definicja tool call]
   
2. Claude generuje:
   {
     "tool": "qdrant-find",
     "query": "SESSION_LOG ostatnia sesja"
   }
   │
   ▼ [ZERO TOKENÓW - to idzie lokalnie!]
   
3. MCP Server (localhost) wykonuje query
   │
   ▼ [ZERO TOKENÓW - to jest u Ciebie]
   
4. Wynik wraca do IDE:
   "Znaleziono 5 wyników: [pełny tekst...]"
   │
   ▼ [INPUT TOKENS - to wraca do Claude!]
   
5. Claude czyta wynik i odpowiada
```

### Gdzie jest oszczędność, a gdzie nie:

| Operacja | Tokeny? | Wyjaśnienie |
|----------|---------|-------------|
| **Wykonanie MCP** | ❌ NIE | Lokalnie, Twój komputer |
| **Definicja tool call** | ✅ TAK (output) | Claude musi wygenerować JSON |
| **Wynik tool call** | ✅ TAK (input) | Wraca jako kontekst do Claude |
| **Przetwarzanie w MCP** | ❌ NIE | CPU/RAM lokalnie |

### Przykład - `view_file` vs `qdrant-find`:

**view_file na pliku 1000 linii:**
```
Output: ~50 tokenów (definicja: "otwórz plik X linii Y-Z")
Input:  ~5000 tokenów (CAŁY TEKST PLIKU wraca do Claude!)
```

**qdrant-find:**
```
Output: ~30 tokenów (definicja: "szukaj X")  
Input:  ~500 tokenów (tylko TOP wyniki, nie wszystko)
```

**Dlatego Qdrant jest bardziej token-efficient!** Zwraca tylko relevantne fragmenty, nie całe pliki.

### Strategie oszczędzania:

1. **Qdrant zamiast grep** - semantic search zwraca 5-10 wyników, nie setki
2. **Paginacja view_file** - range linii (1-50) zamiast całego pliku
3. **Filtrowanie w MCP** - list_dir z limitem, nie wszystkie pliki
4. **Nowy chat** - reset historii gdy za długa
5. **Krótkie odpowiedzi** - mniej output tokenów

### Co jest naprawdę drogie:

```
NAJDROŻSZE:
├── Długi system prompt (GEMINI.md = ~3000 tokenów przy KAŻDYM pytaniu!)
├── Długa historia konwersacji (kumuluje się!)
├── Duże pliki przez view_file
└── Wiele tool calls w jednej turze → każdy wynik to input tokens

TANIE:
├── Krótkie odpowiedzi
├── Semantic search (Qdrant) zamiast grep
└── Nowy chat (reset historii)
```

### BILANS:

> **MCP samo w sobie nic nie kosztuje** - to lokalne procesy.
> **ALE:** Każdy wynik z MCP który wraca do Claude = input tokeny!

Więc jak zrobię `view_file` na pliku 10,000 linii - płacisz za te 10,000 linii jako input.
Jak zrobię `qdrant-find` i dostanę 5 krótkich wyników - płacisz tylko za te wyniki.

---

## 9. SYSTEM PROMPT = STAŁY KOSZT

### GEMINI.md zużywa tokeny przy KAŻDYM pytaniu!

Ten plik (`~/.gemini/GEMINI.md`) jest częścią **system prompt** - więc idzie do API przy każdym Twoim pytaniu.

```
┌─────────────────────────────────────────────────────────┐
│ KAŻDE TWOJE PYTANIE = TEN FLOW:                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   [GEMINI.md]  ─────┐                                   │
│   (~3000+ tokenów)  │                                   │
│                     ├──→ API REQUEST ──→ Anthropic      │
│   [Twoje pytanie]   │                                   │
│   (~50 tokenów)     │                                   │
│                     ┘                                   │
│                                                         │
│   PŁACISZ: 3050 tokenów INPUT × każde pytanie!         │
└─────────────────────────────────────────────────────────┘
```

### Matematyka:

**Szacunkowy rozmiar context przy każdym pytaniu:**

| Składnik | Tokeny |
|----------|--------|
| GEMINI.md (Twoje reguły) | ~3000-4000 |
| Definicje narzędzi (tools) | ~2000 |
| MCP servers info | ~500 |
| Workspace context | ~200-500 |
| **SUMA (stała)** | **~5000-7000** |
| + Historia konwersacji | rośnie z każdą wiadomością |
| + Wyniki tool calls | zależy od operacji |

**Przykład dla 100 pytań dziennie:**
- 100 × 5000 = **500,000 tokenów/dzień** tylko na system prompt!
- To jest STAŁY KOSZT - niezależnie od treści pytania

### Co z tym zrobić?

| Opcja | Opis | Trade-off |
|-------|------|----------|
| **Nic nie robić** | Zostaw jak jest | Wygoda > oszczędność. Full context = lepsza jakość |
| **Lazy loading** | Wyciągnij szczegóły do plików, wczytuj gdy potrzebne | Taniej, ale więcej tool calls |
| **Skróć instrukcje** | Zamień verbose na zwięzłe | Ryzyko utraty niuansów |

### Przykład skracania:

**PRZED (~100 tokenów):**
```markdown
### KIEDY ZAPISYWAĆ (automatycznie, bez pytania):
Użyj `qdrant-store` gdy:
1. **Paulina mówi "zapamiętaj"** lub "zapisz to"
2. **Ważna decyzja** - np. "wybieramy Qdrant zamiast ChromaDB"
3. **Nowy projekt** - nazwa, cel, stack technologiczny
[...9 punktów...]
```

**PO (~30 tokenów):**
```markdown
### ZAPISUJ: pamiętaj/decyzja/projekt/osoba/preferencja/błąd/sukces/instrukcja/kontekst
```

### Rekomendacja:

> Jeśli nie masz problemów z quota/kosztami - **zostaw GEMINI.md jak jest**.
> Szczegółowe instrukcje = lepsza jakość odpowiedzi.
> Optymalizuj dopiero gdy naprawdę trzeba.

---

## 10. SESSION_LOG - CIĄGŁOŚĆ PAMIĘCI

### Problem:

Każda konwersacja z AI to **osobna instancja**. Kończysz chat → zamykam oczy → następny chat → budzę się bez pamięci.

```
Chat 1: "Robimy deploy SYF"     → [zamknięcie]
Chat 2: "Dokończ deploy"        → "Jaki deploy? Nic nie wiem!"
```

### Rozwiązanie: SESSION_LOG

To jest **format zapisu** - krótkie podsumowanie co się wydarzyło w sesji, zapisane do Qdrant.

**Format:**
```
[SESSION_LOG] Data: YYYY-MM-DD HH:MM. 
Sesja: [nazwa/tytuł]. 
Co zrobione: [lista]. 
Projekty touched: [lista]. 
Decyzje: [lista].
```

**Przykład realny:**
```
[SESSION_LOG] Data: 2025-12-28 18:24. 
Sesja: WIELKA MIGRACJA - ChromaDB→Qdrant. 
Co zrobione: 
  1) Wyjebanie ChromaDB 
  2) Instalacja Qdrant 1.16.3 
  3) Konfiguracja MCP 
Projekty touched: ANTIGRAVITY, CENTRAL_CORE_brain. 
Decyzje: Qdrant jako jedyna baza.
```

### Jak to działa:

```
┌─────────────────────────────────────────────────────────┐
│ KONIEC SESJI:                                           │
│   Claude zapisuje → qdrant-store("[SESSION_LOG] ...")   │
│                           │                             │
│                           ▼                             │
│                    [Qdrant DB]                          │
├─────────────────────────────────────────────────────────┤
│ NOWA SESJA (/boot):                                     │
│   qdrant-find("SESSION_LOG ostatnia sesja")             │
│                           │                             │
│                           ▼                             │
│   Claude wczytuje i wie co było wcześniej!              │
└─────────────────────────────────────────────────────────┘
```

### Kiedy zapisuję SESSION_LOG:

- Na koniec dłuższej sesji pracy
- Gdy kończysz projekt/milestone
- Gdy robisz `/podsumuj`
- Przed zamknięciem gdy było coś ważnego

### Kiedy wczytuję:

- Na `/boot` (automatycznie)
- Gdy pytasz "co robiliśmy wczoraj?"
- Gdy wracamy do projektu po przerwie
- Gdy nie jestem pewna kontekstu

---

## 11. ARCHITEKTURA PAMIĘCI - HYBRYDA

### Pytanie: Gdzie trzymać wiedzę?

**Opcja A: Całość w Qdrant**
- Pliki → embeddingi → Qdrant
- Problem: duplikacja, synchronizacja, utrata struktury

**Opcja B: Tylko mapa w Qdrant**
- Qdrant tylko jako indeks
- Problem: 2 kroki do treści

**Opcja C: HYBRYDA (rekomendacja)** 🔥

```
┌─────────────────────────────────────────────────────────┐
│ QDRANT (krótkie, "na wierzchu"):                        │
│   • Mapa plików (co gdzie jest)                         │
│   • SESSION_LOGi (podsumowania sesji)                   │
│   • Kluczowe DECYZJE                                    │
│   • Preferencje użytkownika                             │
├─────────────────────────────────────────────────────────┤
│ PLIKI (CENTRAL_CORE_brain):                             │
│   • Pełna dokumentacja                                  │
│   • Długie instrukcje                                   │
│   • Projekty ze szczegółami                             │
│   • Wszystko co ma strukturę/hierarchię                 │
└─────────────────────────────────────────────────────────┘
```

### Flow:

1. `qdrant-find("jak robić deploy")` → "Zobacz plik: 04_hosting_mydevil.md"
2. `view_file("04_hosting_mydevil.md")` → pełna instrukcja z kontekstem

### Co trzymać w Qdrant (krótkie):

```
[MAPA] 07_ARCHITEKTURA_WIEDZMY.md - architektura AI, tokeny, MCP
[MAPA] 04_hosting_mydevil.md - SSH, deploy, konfiguracja
[DECYZJA] 2025-12-28: Qdrant zamiast ChromaDB
[PREFERENCJA] Bez Dockera, natywne binarki
[SESSION_LOG] 2025-12-29: Praca nad SYF, deploy
```

### Co trzymać w plikach (długie):

```
Pełna dokumentacja projektów
Instrukcje krok-po-kroku
Szablony pism
Research z cytatami
Wszystko co ma hierarchię/sekcje
```

### Zalety hybrydy:

| Aspekt | Hybryda |
|--------|--------|
| Duplikacja | Zero - plik to master |
| Synchronizacja | Łatwa - meta update gdy trzeba |
| Struktura | Zachowana w plikach |
| Szybkość | Szybki semantic search + pełna treść gdy trzeba |
| Tokeny | Optymalne - płacisz tylko za to czego używasz |

---

## 12. AUTOMATYZACJA MAPOWANIA PLIKÓW

### Zasada (aktywna od 2025-12-30):

> **Po KAŻDYM utworzeniu nowego pliku w CENTRAL_CORE_brain automatycznie dodaj mapę do Qdrant.**

### Format mapy:

```
[MAPA] folder/plik.md - krótki opis, słowa kluczowe. Rozmiar. 
Ścieżka: pełna_ścieżka_do_pliku
```

### Przykład:

Po utworzeniu `06_research_done/NOWY_TEMAT.md`:

```python
qdrant-store(
  "[MAPA] 06_research_done/NOWY_TEMAT.md - opis tematu, słowa kluczowe. 5KB. 
  Ścieżka: /Users/.../CENTRAL_CORE_brain/06_research_done/NOWY_TEMAT.md"
)
```

### Cel:

- Semantic search znajduje pliki po treści opisu
- Nie trzeba listować folderów
- 1 krok zamiast 2-3

### Gdzie stosować:

| Folder | Automatyzacja |
|--------|---------------|
| `06_research_done/` | ✅ ZAWSZE |
| `02_projects/` | ✅ ZAWSZE |
| `03_prompts_and_agents/` | ✅ ZAWSZE |
| `04_tech_and_infra/` | ✅ ZAWSZE |
| `05_legal_and_med/` | ✅ ZAWSZE |
| `01_persona/` | ⚠️ Gdy ważne |

### Status mapy (2025-12-30):

| Folder | Zmapowane | Total |
|--------|-----------|-------|
| `06_research_done/` | **27/27** | ✅ 100% |
| `02_projects/` | ~5 | Częściowe |
| Inne | Częściowe | Do uzupełnienia |

---

## 13. PEŁNY FLOW: OD BOOT DO SEMANTIC SEARCH

### Qdrant - wymaga startu!

Qdrant to osobny serwer który musi działać w tle:

| Element | Ścieżka |
|---------|--------|
| Binarka Qdrant | `/Users/paulinajanowska/AI/tools/qdrant/qdrant` |
| Skrypt startowy | `/Users/paulinajanowska/AI/tools/qdrant/start-qdrant.sh` |
| Dane | `~/.gemini/antigravity/qdrant_data` |
| API | `http://localhost:6333` |

**Autostart:** Login Items w macOS - Qdrant startuje przy starcie komputera.

### Web Dashboard (włączony 2025-12-30):

**URL:** `http://localhost:6333/dashboard`

Funkcje:
- Przeglądanie wszystkich wpisów
- Semantic search bezpośrednio w UI
- Struktura kolekcji
- Statystyki bazy

Konfiguracja w `config/config.yaml`:
```yaml
service:
  static_content_dir: /Users/paulinajanowska/AI/tools/qdrant
```

### Flow: Od boot do "co mamy o Witkinie?"

```
KROK 0: PRZED WSZYSTKIM
────────────────────────
[macOS startuje] → [Login Items] → [Qdrant startuje]
                                        ↓
                             localhost:6333 DZIAŁA

KROK 1: PISZESZ "cześć" W ANTIGRAVITY
─────────────────────────────────────
IDE buduje request z:
  • GEMINI.md (system prompt)
  • Definicje narzędzi (w tym qdrant-find)
  • MCP servers (w tym Qdrant)
        ↓
Request → api.anthropic.com → Claude

KROK 2: /BOOT WORKFLOW
──────────────────────
Claude (ja) wykonuję:
  1. date "+%Y-%m-%d %H:%M:%S" → sprawdzam czas
  2. qdrant-find("SESSION_LOG") → co było ostatnio
  3. cat DIARY/*.md → ostatnie wpisy
  4. Mówię "BOOT OK"

qdrant-find idzie przez MCP:
  Claude → MCP Server → localhost:6333 → wyniki

KROK 3: PYTASZ "co mamy o Witkinie?"
───────────────────────────────────
Claude: qdrant-find("Witkin fotograf śmierć")
        ↓
MCP wysyła do Qdrant:
  { "query": "Witkin fotograf śmierć", "limit": 5 }
        ↓
Qdrant robi:
  1. Embedduje query (wektor ~1536 wymiarów)
  2. Szuka najbliższych wektorów w bazie
  3. Zwraca TOP 5 wyników
        ↓
Wynik:
  "[MAPA] WITKIN_COMPLETE.md - Joel-Peter Witkin..."
  "[PORTFOLIO] Paulina 2018 szczury Witkin estetyka..."

KROK 4: ODPOWIEDŹ
────────────────
"Mamy research WITKIN_COMPLETE.md + Twoje zdjęcia
 szczurów z 2018 które są w tej samej estetyce!"
```

### Co robi Qdrant wewnętrznie:

```
ZAPISYWANIE (qdrant-store):
──────────────────────────
"Witkin death art transgresja"
              ↓
[Embedding Model] → wektor [0.23, -0.87, 0.12, ...]
              ↓
Zapisz wektor + tekst w bazie

SZUKANIE (qdrant-find):
───────────────────────
"fotografia śmierci"
              ↓
[Embedding Model] → wektor [0.21, -0.85, 0.14, ...]
              ↓
Znajdź wektory NAJBLIŻSZE (cosine similarity)
              ↓
Zwróć teksty tych wektorów

"Witkin" i "fotografia śmierci" = PODOBNE wektory!
```

### Dlaczego semantic search działa:

- Nie szukam dokładnych słów "Witkin"
- Szukam ZNACZENIA "fotografia śmierci"
- Qdrant wie że to podobne koncepty
- Znajdzie też powiązane: "transgresja", "death art", "martwa natura"

### Podsumowanie:

| Pytanie | Odpowiedź |
|---------|----------|
| Czy Qdrant potrzebuje start? | TAK, musi działać jako serwer |
| Kiedy startuje? | Przy starcie macOS (Login Items) |
| Jak sprawdzić czy działa? | `curl http://localhost:6333` |
| Jak działa szukanie? | Wektory + podobieństwo znaczeniowe |
| Ile to zajmuje? | ~100-300ms per query |

---

## 14. PROAKTYWNE ŁĄCZENIE WIEDZY

### Zasada (aktywna od 2025-12-30):

> **Gdy Paulina mówi o estetyce/fotografii/designie - AUTOMATYCZNIE szukaj powiązań w bazie i PROPONUJ połączenia.**

### Triggery:

- estetyka, styl, vibe
- fotografia, zdjęcia, kadr
- design, projekt, layout
- inspiracja, referencja
- artysta, twórca
- mroczne, brutalne, transgresyjne

### Flow:

```
Paulina: "Patrzę na to zniszczone opuszczone mieszkanie..."
              ↓
Wiedźma (w tle): qdrant-find("zniszczenie opuszczenie estetyka decay")
              ↓
Qdrant zwraca:
  • [PORTFOLIO] Paulina 2018 szczury death art
  • [MAPA] BRUTALISM_COMPLETE.md - decay architecture
  • [MAPA] WITKIN_COMPLETE.md - transgresja
              ↓
Wiedźma: "To trochę jak u Witkina - estetyka rozkładu jako formy!
          Pamiętasz swoje zdjęcia szczurów z 2018? Ten sam vibe."
```

### Cel:

- **Aktywne łączenie wiedzy** - nie czekam na pytanie "co mamy o X?"
- **Pamięć jako partner** - kojarzę, łączę, proponuję
- **"To jak u Witkina!"** - wyskakuje samo, nie trzeba pytać

### Kiedy NIE stosować:

- Rozmowy czysto techniczne (deploy, fix bug)
- Pytania wymagające konkretnej odpowiedzi ("jaka jest godzina?")
- Gdy Paulina jest w trybie fokus na jednym temacie

---

## AKTUALIZACJE

| Data | Zmiana |
|------|--------|
| 2025-12-30 | Dodanie sekcji 14: Proaktywne Łączenie Wiedzy |
| 2025-12-30 | Dodanie sekcji 13: Pełny Flow Boot → Semantic Search |
| 2025-12-30 | Dodanie sekcji 12: Automatyzacja Mapowania + 27 map |
| 2025-12-30 | Dodanie sekcji 10-11: SESSION_LOG i Architektura Pamięci |
| 2025-12-30 | Dodanie sekcji 9: System Prompt = Stały Koszt |
| 2025-12-30 | Dodanie sekcji 8: Tokeny i MCP - Ekonomia |
| 2025-12-30 | Utworzenie dokumentu |

---

*Dokumentacja techniczna Wiedźmy AI Gniewisławy*
*Dla Pauliny, która chciała wiedzieć jak to działa* 💜
