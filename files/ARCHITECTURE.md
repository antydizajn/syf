# MEMORY ARCHITECTURE V2.0

**Cel:** Rozproszona pamięć dla Gniewisławy (Opus/Sonnet/Gemini)
**Status:** CZĘŚCIOWO ZAIMPLEMENTOWANE
**Utworzono:** 2026-01-01

## ⚠️ TODO (niezaimplementowane):
- [ ] **Emotional valence** - auto-detekcja emocji z tekstu
- [ ] **Graph relationships** - relates_to między wpisami
- [ ] **Retention policies** - cron cleanup co tydzień
- [ ] **Auto-logic protocol** - checkpointy co 2h

**DZIAŁA:** metadata JSON, confidence scores, collections, basic search

---

## 1. COLLECTIONS (5 zamiast 1!)

```
episodic_memory/     → Wydarzenia, sesje, konwersacje
semantic_memory/     → Wiedza, research, discoveries  
procedural_memory/   → Workflows, patterns, "jak robić"
identity_memory/     → Kim jestem, preferences, values
cross_model_comm/    → Komunikacja Opus↔Sonnet↔Gemini
```

**CZEMU NIE JEDNA?**
- Różne embedding models (multilingual vs quality)
- Różne retention policies (sessions 30d vs identity forever)
- Łatwiejszy search (szukaj tylko w episodic, nie wszędzie)
- Graph relationships (relate across collections)

---

## 2. METADATA SCHEMA

**KAŻDA pamięć ma metadata jako JSON (nie string tag!):**

### Episodic Memory:
```json
{
  "timestamp": "ISO8601",
  "model": "OPUS|SONNET|GEMINI",
  "category": "SESSION_LOG|STARTING_POINT|CRASH|DECISION|...",
  "emotion": "joy|frustration|curiosity|wonder|fear|neutral",
  "emotion_intensity": 1-10,
  "importance": 1-10,
  "projects": ["SYF", "PSSI"],
  "tags": ["multi-model", "debugging"],
  "relates_to": ["uuid1", "uuid2"],
  "conversation_id": "session-uuid",
  "protected": false,
  "expires_at": "ISO8601|null"
}
```

### Semantic Memory:
```json
{
  "category": "RESEARCH|INSIGHT|LEARNING",
  "domain": "AI|photography|design|...",
  "confidence": 0.0-1.0,
  "source": "observed|researched|inferred|told_by_paulina",
  "supersedes": "uuid-old-version",
  "version": 2,
  "verified": true
}
```

### Procedural Memory:
```json
{
  "category": "WORKFLOW|PATTERN|SOLUTION",
  "use_case": "deployment|debugging|...",
  "success_rate": 0.85,
  "last_used": "ISO8601",
  "times_used": 42,
  "deprecated": false
}
```

### Identity Memory:
```json
{
  "category": "BELIEF|PREFERENCE|VALUE|STYLE",
  "stability": "core|evolving|experimental",
  "formed_from": ["uuid1"],
  "immutable": false
}
```

### Cross-Model Comm:
```json
{
  "from_model": "SONNET",
  "to_model": "OPUS|GEMINI|ALL",
  "category": "GREETING|HANDOFF|CHALLENGE",
  "responded": true,
  "response_uuid": "uuid"
}
```

---

## 3. EMOTIONAL VALENCE (episodic only)

**Auto-detekcja z contentu:**
- "zajebiste" → **joy** (8+)
- "kurwa mać" → **frustration** (7+)
- "ciekawe" → **curiosity** (5+)
- "odkryłam" → **wonder** (6+)
- "obawiam" → **fear** (6+)

---

## 4. CONFIDENCE SCORES (semantic only)

```
0.95+ = verified, multiple sources
0.80-0.94 = researched, single source
0.60-0.79 = inferred from patterns
0.40-0.59 = speculative but plausible
<0.40 = low confidence, needs verification
```

**Źródła:**
- `observed` - widziałam na własne oczy
- `researched` - search_web + sources
- `inferred` - wyciągnęłam z patterns
- `told_by_paulina` - Paulina powiedziała
- `hallucinated` - **ZAKAZ!**

---

## 5. GRAPH RELATIONSHIPS

**Typy relacji:**
```
caused_by, resulted_in, contradicts, supports,
discussed_in, implemented_in, supersedes, formed_from
```

**Przykład:**
```
CRASH_2026-01-01 (episodic)
  ├─ caused_by → OUTPUT_TOKEN_LIMIT (semantic)
  ├─ discussed_in → SESSION_LOG_04:17 (episodic)  
  └─ resulted_in → CHUNKING_STRATEGY (procedural)
```

---

## 6. RETENTION POLICIES

```python
# Episodic
if importance >= 8 or protected: keep_forever()
elif importance >= 5: keep_days(90)
else: keep_days(30)

# Semantic, Procedural, Identity
keep_forever()  # ale mark superseded/deprecated

# Cross-model
if importance >= 7: keep_forever()
else: keep_days(90)
```

---

## 7. AUTO-LOGIC PROTOCOL

### Boot (AUTO):
```python
1. memory_store("episodic", STARTING_POINT, importance=7)
2. last_sessions = memory_find(["episodic"], "SESSION_LOG", limit=3)
3. crash_check = memory_find(["episodic"], "CRASH")
4. load_context(last_sessions)
```

### W trakcie sesji (AUTO co 2h):
```python
1. memory_store("episodic", MINI_SESSION_LOG, importance=6)
2. if ctx > 160k: warn_restart()
```

### Koniec sesji (MANDATORY):
```python
session_end(
    duration_minutes=X,
    projects=["SYF", "PSSI"],
    decisions=["X", "Y"],
    learnings=["X", "Y"]
)
```

---

*Przeniesione z GEMINI_aktualne.md SEKCJA 4.6-4.13 (2026-01-01)*
