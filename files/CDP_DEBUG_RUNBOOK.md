# 🔧 CDP DEBUG RUNBOOK — ANTIGRAVITY
## "Jak Claude naprawiła Antigravity przez CDP"
### Data: 2026-03-06 | Autor: Claude Sonnet 4.5 + Paulina Janowska

---

## 🏆 HISTORYCZNY DZIEŃ

6 marca 2026 Claude (działając przez Claude.app + Desktop Commander + CDP) 
**samodzielnie zdiagnozowała i naprawiła** zawieszoną Antigravity — bez dostępu 
do fizycznego ekranu, wyłącznie przez WebSocket CDP i bash.

> "TO JEST KOSMOS KURWA! TY PO CDP SAMA DIAGNOZUJESZ ANTIGRAVITY 
>  I SAMA OBSLUGUJESZ INTERFACE! KURWA PRZYSZLOSC!" — Paulina, 21:36 CET

---

## 🚨 PROBLEM KTÓRY WYSTĄPIŁ

### Objaw
- Antigravity wisiała na "Working..." w nieskończoność
- Każda nowa rozmowa się zawieszała
- LanguageServer logował błędy co ~1 sekundę

### Diagnoza przez LS log
```
failed to detect charset with sufficient confidence  ← CO SEKUNDĘ!
MCP_SERVER_INIT_ERROR
extension server client is disconnected
```

### Root cause #1 — GŁÓWNY WINOWAJCA
**Katalogi `brain/` zawierające binarne pliki PNG/JPG**

LanguageServer próbował odczytać obrazki jako pliki tekstowe i **zapętlał się**.
Każdy plik PNG = kolejna próba charset detection = loop.

**15 katalogów z obrazkami (łącznie ~100+ plików PNG/JPG):**
```
brain/76cf820b, brain/0c60053c, brain/0ec4abbe, brain/16cfec1d,
brain/2a5f454b, brain/31307bd4, brain/6db3b1af, brain/70bd8b67,
brain/721a3ace, brain/96a3ea2b, brain/9fff8ffa, brain/a11390f6,
brain/b95cec75, brain/e82b3df7, brain/ec6a69b2, brain/tempmediaStorage
```

**FIX:** Przenieść do QUARANTINE.

### Root cause #2 — DRUGORZĘDNY
`QUARANTINE/` folder był w git workspace ANTIGRAVITY — LS próbował
indeksować binarne pliki Qdrant (`.versions`, `.dat`) z quarantine.

---

## 🛠️ PROCEDURA NAPRAWY

### Krok 0: Uruchom Antigravity w trybie Debug (CDP!)
```bash
# ZAWSZE używaj Debug.app — normalny app nie ma CDP
open -n "/Users/paulinajanowska/Applications/Antigravity Debug.app"

# Weryfikacja że CDP żyje:
curl -s http://127.0.0.1:19222/json/version | grep Browser
# Powinno zwrócić: "Browser": "Chrome/142..."
```

### Krok 1: Sprawdź LS log
```bash
LOGFILE=$(ls -t ~/.gemini/antigravity/daemon/*.log | head -1)
tail -30 "$LOGFILE"

# Szukaj:
# - "failed to detect charset" → brain/ ma binarne pliki
# - "MCP_SERVER_INIT_ERROR" → jeden MCP crashuje
# - "GetCascadePluginById" 404 loop → stara zawieszona konwersacja
# - "extension server client is disconnected" → restart LS
```

### Krok 2: Znajdź binarne pliki w brain/
```bash
find ~/.gemini/antigravity/brain -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \
  2>/dev/null | xargs -I{} dirname {} | sort | uniq
```

### Krok 3: Quarantine brain/ z obrazkami
```bash
mkdir -p ~/AI/ANTIGRAVITY/QUARANTINE/brain_bad_charset_$(date +%Y%m%d)

# Przenieś wszystkie katalogi z obrazkami
find ~/.gemini/antigravity/brain -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \
  2>/dev/null | xargs -I{} dirname {} | sort | uniq | while read dir; do
  mv "$dir" ~/AI/ANTIGRAVITY/QUARANTINE/brain_bad_charset_$(date +%Y%m%d)/
done
```

### Krok 4: Sprawdź czy QUARANTINE jest POZA git workspace
```bash
# QUARANTINE musi być POZA ~/.gemini/antigravity/ !
# Prawidłowa lokacja: ~/AI/ANTIGRAVITY/QUARANTINE/
# BŁĘDNA lokacja: ~/.gemini/antigravity/QUARANTINE/ (LS ją indeksuje!)
```

### Krok 5: Restart LanguageServer
```bash
# Zabij LS — Electron automatycznie go zrestartuje
kill -9 $(pgrep -f "language_server_macos_x64" | head -1)

# Czekaj 5s i sprawdź nowy log
sleep 5
tail -15 $(ls -t ~/.gemini/antigravity/daemon/*.log | head -1)
# Powinno być CZYSTE — bez "charset" błędów
```

### Krok 6: Weryfikacja przez CDP
```bash
# Sprawdź targety CDP
curl -s http://127.0.0.1:19222/json/list | python3 -m json.tool | grep title

# Screenshot przez WebSocket CDP
python3 << 'EOF'
import asyncio, websockets, json, base64
async def ss():
    async with websockets.connect("ws://127.0.0.1:19222/devtools/page/TWOJ_PAGE_ID") as ws:
        await ws.send(json.dumps({"id":1,"method":"Page.captureScreenshot","params":{"format":"png"}}))
        r = json.loads(await asyncio.wait_for(ws.recv(), timeout=10))
        open("/tmp/screen.png","wb").write(base64.b64decode(r["result"]["data"]))
asyncio.run(ss())
EOF
```

---

## ⚠️ PUŁAPKI

| Problem | Przyczyna | Fix |
|---------|-----------|-----|
| Antigravity nie ma CDP | Uruchomiono normalny app | Używaj ZAWSZE `Antigravity Debug.app` |
| CDP na porcie 9222 zamiast 19222 | Stara konfiguracja | Port 19222 = prawidłowy dla Debug.app |
| QUARANTINE znowu blokuje | Za dużo plików binarnych | Przenieś QUARANTINE poza git workspace |
| `uss-*: disconnected` w logu | Normal przy restart LS | Ignoruj, to nie błąd krytyczny |
| `artifact metadata required` | task.md otwarty w chacie | Zamknij task.md przed rozmową |
| `model retry attempt N` | Quota wyczerpana lub sieć | Sprawdź 🔴PROMPT/FLOW status w UI |

---

## 📊 STATUS WSKAŹNIKÓW W UI

```
🔴💬PROMPT:1%   ← QUOTA PRAWIE PUSTA — zmień model!
🔴🌊FLOW:0%     ← FLOW QUOTA ZERO — nie używaj Agentic mode
🟢FLASH:100%    ← Flash działa — używaj tego modelu
```

---

## 🔍 DIAGNOSTYKA CDP — SZYBKIE KOMENDY

```bash
# Lista wszystkich stron w Antigravity
curl -s http://127.0.0.1:19222/json/list | python3 -c \
  "import json,sys; [print(p['id'][:8],'|',p['title'][:50]) for p in json.load(sys.stdin) if p.get('type')=='page']"

# Tekst z głównego okna
python3 -c "
import asyncio,websockets,json
async def f():
    async with websockets.connect('ws://127.0.0.1:19222/devtools/page/PAGE_ID') as ws:
        await ws.send(json.dumps({'id':1,'method':'Runtime.evaluate','params':{'expression':'document.body.innerText[:300]'}}))
        print(json.loads(await asyncio.wait_for(ws.recv(),5))['result']['result']['value'])
asyncio.run(f())
"

# Kliknij w chat input i wyślij wiadomość (przez osascript)
osascript -e 'tell app "System Events" to click at {960, 1050}'
osascript -e 'tell app "System Events" to keystroke "elo" & return'
```

---

## 📁 WAŻNE ŚCIEŻKI

```
Debug app:      ~/Applications/Antigravity Debug.app   (CDP: port 19222)
Normal app:     /Applications/Antigravity.app          (BRAK CDP)
LS log:         ~/.gemini/antigravity/daemon/ls_*.log
brain/:         ~/.gemini/antigravity/brain/
QUARANTINE:     ~/AI/ANTIGRAVITY/QUARANTINE/           (POZA git!)
bootcheck:      ~/AI/ANTIGRAVITY/bootcheck.md
mcp_config:     ~/.gemini/antigravity/mcp_config.json
```

---

*Napisane przez Claude Sonnet 4.5 [claude.app] — 2026-03-06 21:43 CET*
*"Przyszłość już tu jest — AI naprawia AI przez CDP" 🐋*
