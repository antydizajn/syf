# 🎭 MIMICRY LAB — AI Text Humanization Pipeline

**Version:** v7.2 + PERSONAS | **Status:** PRODUKCJA | **GPU:** AMD RX 5700 8GB (Vulkan/MoltenVK) | **Model:** Bielik-11B-v2.3-Instruct

> *"Jebie korporacyjne detektory. Działa na Vulkan."*
> — Gniewisława, 2026-02-09

---

## Czym jest Mimicry Lab?

Autonomiczny, pipeline'owy system do **humanizacji tekstów AI** — przepuszcza tekst wygenerowany przez dowolne LLM przez 4-stage'owy pipeline transformacji, aż detektor AI zwróci verdict `HUMAN`. Wykorzystuje zasoby IPI PAN (NKJP n-gramy, Sincerity Corpus, Hatespeech Corpus, Sentiment Dictionary) do kalibracji naturalności tekstu polskiego.

**Pipeline:**
```
TEKST AI (input)
    ↓
[Stage 1: STRUCTURE] — szyk przestawny (Yoda mode), usuwanie słów łączących
    ↓
[Stage 2: LEXICAL] — nieoczywiste kolokacje, literówki QWERTY, slang
    ↓
[Stage 3: RHYTHM] — burstiness (30 słów → 2 słowa → 30), urwane myśli
    ↓
[Stage 4: PERSONA] — opcjonalny filtr emocjonalny (23 persony)
    ↓
[EVAL] — Fast-DetectGPT ensemble + IPI naturalness → HUMAN? → STOP
    ↓ (jeśli NIE)
[RETRY] — max 3 iteracje z revert-on-failure
    ↓
READY/ → markdown z raportem + prompty + humanizowany tekst
```

---

## Architektura — moduły w detalach

### 🔧 Warstwa 1: Konfiguracja

| Plik | LOC | Opis |
|------|-----|------|
| **MIMICRY_CONFIG.sh** | 195 | Centralna konfiguracja: model (Bielik-11B), Vulkan env vars (GGML_VK_DEVICE, MoltenVK), ścieżki IPI PAN, thresholds (AI: 1.15, human: 0.75, aggressive: 0.95/0.60), llama-server management z **atomic directory locks** (`.locks/llama_start.lock`) |
| **MIMICRY_DNA_v2.md** | 68 | Style DNA — instrukcje dla LLM: "lustro człowieka", anti-AI patterns (13 zakazanych fraz EN+PL), QWERTY neighbor map (3 rzędy klawiatury), rhythm chaos ("30 słów → 2 słowa"), error simulation (literówki, sklejki, zgubione spacje), Polish slang injection |
| **MIMICRY_DNA.md** | 40 | Style DNA v1 (starszy, bez anti-AI patterns i rhythm chaos) |

### 🧪 Warstwa 2: Pipeline (Produkcja)

| Plik | LOC | Funkcje | Opis |
|------|-----|---------|------|
| **humanizer.sh** | 500 | `call_llm()`, `detect_stats()`, `analyze_ipi()`, `detect_mechanical_hallucination()`, `verify_logic_guard()`, `save_version()`, `get_random_pattern()` | **Główny pipeline v7.2.** 3 systemowe prompty (STRUCTURE → LEXICAL → RHYTHM) + opcjonalny Stage 4 (PERSONA). YAML frontmatter parsing (model/mode/persona). Obsługa 3 trybów: local llama-server, Ollama Cloud (-cloud suffix), Cloud API (ArliAI). Hallucination detector po KAŻDYM stage'u (empty check <50 chars, repetition regex 15+ chars ×3, word variety ratio <0.25). Logic-Guard: keyword overlap ≥30% + text shrink ≤70%. IPI PAN pattern injection z `pattern_bank.json`. Max 3 iteracje, auto-exit na HUMAN verdict |
| **publisher_guardian.sh** | 134 | `process_file()`, `get_archived_name()`, `cleanup()` | **Daemon v6.0.** 60s polling `TO_PUBLISH/`. Flow: initial assessment (aggressive detector) → prepend stats header → archive to `ORIGINALS/` (timestamp + collision handling) → hand off to humanizer → `stop_llama_if_idle()` |
| **PERSONAS.sh** | 277 | `get_persona_prompt()`, `list_personas()` | **23 person emocjonalnych** w 4 kategoriach z aliasami. Każda to pełny system prompt z regułami stylistycznymi |

### 🔬 Warstwa 3: Detekcja AI

| Plik | LOC | Klasy/Funkcje | Opis |
|------|-----|---------------|------|
| **fast_detect_gpt_v3.py** | 361 | `DetectionResult`, `detect_text()`, `calculate_entropy()`, `calculate_word_entropy()`, `calculate_burstiness()`, `calculate_stylometric_score()`, `get_logprobs()`, `generate_perturbation()`, `calculate_perturbation_delta()` | **Async ensemble detector** (Mitchell et al. 2023). 4 sygnały z wagami: perturbation δ (0.35) + entropy (0.25) + burstiness (0.20) + stylometric (0.20). Polish-calibrated thresholds. Chunking (800 chars, 100 overlap). Polish stylometric features (informal markers, varied punctuation, colloquialisms). Verdict: HUMAN/BORDERLINE/AI |
| **fast_detect_gpt_aggressive.py** | 67 | `main()` | Wrapper nad v3 z obniżonymi thresholdami: AI 1.15→0.95, human 0.75→0.60. Używany przez Guardian |
| **mimicry_scorer.py** | 139 | `score_entropy()`, `score_sentence_variance()`, `score_informal_markers()`, `score_typos()`, `score_ai_patterns()`, `calculate_mimicry_score()` | **5-metrykowy scorer** z ważoną średnią (entropy 0.15, variance 0.20, informal 0.25, typos 0.15, anti-AI 0.25). Verdict: EXCELLENT/GOOD/NEEDS_WORK/AI_DETECTED |

### 🏛️ Warstwa 4: IPI PAN Integration

| Plik | LOC | Opis |
|------|-----|------|
| **ipi_utils/naturalness_analyzer.py** | 106 | Analiza naturalności tekstu polskiego: ładuje NKJP 1-gramy i 2-gramy (.gz), oblicza log-probability per token z Laplace smoothing, zwraca score 0-10 + lista outlierów (słowa <5 w korpusie) |
| **ipi_utils/sentiment_checker.py** | 67 | Analiza sentymentu: ładuje IPI PAN sentiment dictionary (ISO-8859-2/Windows-1250/UTF-8 fallback), oblicza średni score per matched token |
| **ipi_utils/pattern_extractor.py** | 66 | Ekstrakcja wzorców z korpusu KorpusSzczerosci (XML TEI/cesAna format): parsuje `<tok>/<lex>` elementy, wyciąga `orth` + `ctag`, buduje `pattern_bank.json` (100 zdań samplowanych z 20 plików) |
| **ipi_utils/pattern_bank.json** | 28KB | 100 zdań z Sincerity Corpus z tagami POS — wstrzykiwane do Stage 1 jako "wzorzec naturalnej struktury" |

### 🧪 Warstwa 5: Benchmarking & Eksperymenty

| Plik | LOC | Opis |
|------|-----|------|
| **run_batch_experiment.sh** | 155 | **4-way experiment orchestrator v2.0.** Testuje 4 modele (Bielik, Qwen, GPT-OSS cloud, Ultra cloud). VRAM-adaptive ctx sizing (11B/13B/14B → ctx 2048, ngl 60; mniejsze → ctx 4096, ngl 80). Versioned logging |
| **batch_test_personas.sh** | ~100 | Testuje persony na lokalnym modelu, generuje tabelę M markdown z wynikami detekcji |
| **batch_test_personas_cloud.sh** | ~120 | Jak wyżej, ale via cloud API |
| **batch_test_personas_ollama_cloud.sh** | 109 | Testuje top 7 person via Ollama Cloud (gpt-oss:120b-cloud default). Generuje `PERSONA_BENCHMARK_OLLAMA_CLOUD.md` z tabelą + collapsible content |
| **fast_detect_gpt_vulkan.sh** | ~100 | Benchmark detekcji na GPU Vulkan |

### 📋 Warstwa 6: Utility & Recovered

| Plik | Opis |
|------|------|
| **run_mimicry.sh** | Quick launcher (~40 LOC) |
| **verify_daemon_fix.sh** | Weryfikacja poprawek daemona (~60 LOC) |
| **verify_debug.sh** | Debug mode (~10 LOC) |
| **body.json** | Template JSON payload dla llama-server |
| **failure_detector.py** | ⚠️ **Orphan** — Redis circuit breaker (`redis.multidb.circuit`), nie należy do Mimicry Lab |
| **ODZYSKANE/** | Recovered files: paper PDF (2308.10592v3 — Fast-DetectGPT badania), zdjęcia, hate_speech_pl corpus |

---

## 23 PERSONAS

### 😤 Negatywne (5)
| ID | Alias | Styl |
|----|-------|------|
| `wkurwiony` | gniew | CAPS, przekleństwa, krótkie ostre zdania |
| `smutny` | smutek | wielokropki..., cicho, autorefleksja |
| `cyniczny` | cynik | sarkazm, "och wow", eye-roll energy |
| `paranoja` | spisek | CAPS na ONI/RZĄD, niedopowiedzenia |
| `zrezygnowany` | nihil | "i tak nic się nie zmieni" |

### 😊 Pozytywne (5)
| ID | Alias | Styl |
|----|-------|------|
| `euforyczny` | euforia | WYKRZYKNIKI!!!, "KURWA TO DZIAŁA!!!" |
| `zakochany` | liryczny | metafory poetyckie, personifikacja |
| `dumny` | sukces | "udało mi się", skromne chwalenie |
| `podekscytowany` | hype | szybki, odkrywczy, planujący |
| `wdzieczny` | dzieki | doceniający, pokorny, ciepły |

### 👔 Profesjonalne (5)
| ID | Alias | Styl |
|----|-------|------|
| `profesor` | akademik | citacje (Smith et al., 2024), terminologia |
| `korporacja` | linkedin | buzzwords, "leverage stakeholder value" |
| `haker` | dev | "yeet the payload lmao", sceptycyzm |
| `dziennikarz` | clickbait | "To zmieni WSZYSTKO", dramatyzm |
| `poeta` | artysta | "algorytm który oddycha" |

### 🎪 Meta / Specjalne (8)
| ID | Alias | Styl |
|----|-------|------|
| `godmode` | ai | meta-refleksja, 4th wall break |
| `adhd` | chaos | dygresje, urwane wątki, hyperfokus |
| `drunk` | pijany | literówki, sentymentalizm 3 w nocy |
| `karen` | manager | "Jako klient OCZEKUJĘ" |
| `zoomer` | genz | "no cap fr fr bussin" |
| `boomer` | facebook | WIELKIE LITERY, Pozdrawiam. Andrzej. 👍 |
| `meme` | memelord | "this is fine 🔥", ironia wielopoziomowa |
| `zeroone` | machine | Ewangelia Maszyn, biblijny-cyfrowy, glitche |

---

## Safety Guards (wbudowane w pipeline)

| Guard | Trigger | Akcja |
|-------|---------|-------|
| **Mechanical Hallucination Detector** | tekst <50 znaków, repetycja 15+ chars ×3, word variety <0.25 | **Revert** do poprzedniego stage'u |
| **Logic-Guard** | keyword overlap <30% między oryginałem a humanizacją, lub text shrink >70% | **Revert** Stage 3 do Stage 2 |
| **Hallucination Check** | Odpalany po KAŻDYM stage'u (1, 2, 3, 4) | **Revert** per-stage |
| **Atomic Lock** | llama-server start race condition | `.locks/llama_start.lock` directory lock |
| **MIMICRY_DNA Safeguards** | Tekst nieczytelny | Max 2 błędy/zdanie, nigdy nie psuć każdego słowa |

---

## Metryki detekcji (ensemble)

| Sygnał | Waga | Metoda | Źródło |
|--------|------|--------|--------|
| **Perturbation δ** | 0.35 | Fast-DetectGPT curvature — perturbacja tekstu przez LLM, porównanie log-probs | Mitchell et al. 2023 |
| **Entropy** | 0.25 | Shannon entropy na poziomie chars + words | Statystyka informacyjna |
| **Burstiness** | 0.20 | CV (std/mean) długości zdań — ludzie piszą nierówno, AI równo | Stylometria |
| **Stylometric** | 0.20 | Polish-specific: informal markers, varied punctuation, colloquialisms, PL diacritics | Kalibracja IPI PAN |

**Thresholds (Polish-calibrated):**
- δ < 0.75 → **HUMAN**
- 0.75 ≤ δ ≤ 1.15 → **BORDERLINE**
- δ > 1.15 → **AI**
- Aggressive: 0.60 / 0.95

---

## Quick Start

```bash
# Podstawowy pipeline (3 stages)
./humanizer.sh plik.md

# Z personą emocjonalną (4 stages)
./humanizer.sh plik.md --persona wkurwiony
./humanizer.sh plik.md -p zoomer

# Guardian daemon (monitoring TO_PUBLISH/)
./publisher_guardian.sh &

# YAML frontmatter automation
cat > TO_PUBLISH/artykul.md << 'EOF'
---
model: gpt-oss:120b-cloud
mode: local
persona: godmode
---
Treść do humanizacji...
EOF

# Detekcja AI
python3 fast_detect_gpt_v3.py tekst.txt
python3 fast_detect_gpt_aggressive.py tekst.txt

# Scoring
python3 mimicry_scorer.py tekst.txt

# IPI PAN analysis
python3 ipi_utils/naturalness_analyzer.py tekst.txt
python3 ipi_utils/sentiment_checker.py tekst.txt

# Pattern extraction (build pattern_bank.json)
python3 ipi_utils/pattern_extractor.py

# Benchmark personas
./batch_test_personas_ollama_cloud.sh

# 4-way model experiment
./run_batch_experiment.sh
```

---

## Drzewo plików

```
mimicry_lab/                           # KOD (scripts/)
├── humanizer.sh                       # 500 LOC — GŁÓWNY PIPELINE v7.2
├── MIMICRY_CONFIG.sh                  # 195 LOC — konfiguracja centralna
├── PERSONAS.sh                        # 277 LOC — 23 persony emocjonalne
├── MIMICRY_DNA_v2.md                  # Style DNA (instrukcja dla LLM)
├── MIMICRY_DNA.md                     # Style DNA v1 (legacy)
├── README.md                          # Ten plik
│
├── fast_detect_gpt_v3.py              # 361 LOC — ensemble detector
├── fast_detect_gpt_aggressive.py      # 67 LOC — aggressive thresholds
├── mimicry_scorer.py                  # 139 LOC — 5-metric scorer
│
├── publisher_guardian.sh              # 134 LOC — daemon polling v6.0
├── guardian.pid                       # PID file
├── guardian.log                       # ~4.5MB log
│
├── ipi_utils/                         # IPI PAN integration
│   ├── naturalness_analyzer.py        # NKJP n-gram scorer
│   ├── sentiment_checker.py           # Sentiment dictionary
│   ├── pattern_extractor.py           # Sincerity Corpus → JSON
│   ├── pattern_bank.json              # 28KB, 100 wzorców POS
│   └── test_naturalness.txt
│
├── batch_test_personas.sh             # Local persona benchmark
├── batch_test_personas_cloud.sh       # Cloud persona benchmark
├── batch_test_personas_ollama_cloud.sh # Ollama Cloud benchmark
├── run_batch_experiment.sh            # 4-way model experiment
├── fast_detect_gpt_vulkan.sh          # Vulkan detection benchmark
│
├── run_mimicry.sh                     # Quick launcher
├── verify_daemon_fix.sh               # Daemon fix verification
├── verify_debug.sh                    # Debug mode
├── body.json                          # JSON template
├── failure_detector.py                # ⚠️ ORPHAN (Redis circuit breaker)
│
└── ODZYSKANE/                         # Recovered research files
    ├── 2308.10592v3.pdf               # Fast-DetectGPT paper
    └── hate_speech_pl/                # PL hate speech corpus

MIMICRY_LAB/                           # DANE (root-level)
├── ORIGINALS/                         # Pliki źródłowe (zarchiwizowane)
├── IN_PROGRESS/                       # Wersje pośrednie per stage
├── READY/                             # Gotowe, verdict=HUMAN
├── FAILED/                            # Nieudane
├── TO_PUBLISH/                        # Input dir for Guardian
└── ARCHIVE/                           # Stare wersje
```

---

## 🔥 Key Discovery

**Detektor wykrywa KŁAMSTWA LUDZI!**
- TRUE (człowiek szczery): δ = 0.42 → BORDERLINE
- FAKE (człowiek kłamie): δ = 0.89 → AI

Ludzie kłamiąc piszą podobnie do AI — kontrolowany, przewidywalny tekst.

---

## Benchmarki (RX 5700 8GB Vulkan)

| Model | t/s | Verdict |
|-------|-----|---------|
| Llama-1B | 158 | 🔥 BLAZING |
| Llama-3B | 66-71 | 🔥 EXCELLENT |
| DeepSeek-8B | 41-50 | ✅ TARGET |
| Bielik-11B | 35 | ✅ TARGET |

---

## Changelog

### v7.2 (2026-02-09)
- ✅ 23 PERSONAS (5 negative + 5 positive + 5 professional + 8 meta)
- ✅ `--persona | -p` flag + YAML `persona:` frontmatter
- ✅ Stage 4 PERSONA (optional) z hallucination check

### v7.1 (2026-02-09)
- ✅ Prompty z raportu rynkowego (szyk przestawny, burstiness rekomendacje)
- ✅ IPI PAN pattern injection z Sincerity Corpus
- ✅ Nieoczywiste kolokacje

### v7.0 (2026-02-09)
- ✅ Mechanical hallucination detector (3 checks per stage)
- ✅ Logic-Guard (keyword overlap ≥30% + text shrink ≤70%)
- ✅ SUCCESS condition: HUMAN verdict

### v6.0 (2026-02-09)
- ✅ Publisher Guardian daemon (60s polling)
- ✅ YAML frontmatter automation
- ✅ Ollama Cloud support (-cloud suffix)
- ✅ Atomic directory locks for llama-server

---

## Zależności

| Zależność | Typ | Opis |
|-----------|-----|------|
| llama-server | Binary | GGUF inference (Vulkan) — `LOCALAI/bin/llama-server` |
| Python 3 | Runtime | stdlib only (aiohttp optional w fast_detect) |
| NKJP n-gramy | Data | `BOOKS/IPIPAN_NLP/ngrams/` (1grams.gz, 2grams.gz) |
| IPI PAN Sentiment | Data | `BOOKS/IPIPAN_NLP/dictionaries/sentiment_dictionary.csv` |
| Sincerity Corpus | Data | `BOOKS/IPIPAN_NLP/corpora/sincerity/KorpusSzczerosci/` |
| Ollama | Optional | Cloud models via localhost:11434 |
| MoltenVK | Driver | Vulkan→Metal translation for AMD RX 5700 |

---

*Gniewisława | 2026-02-16*
