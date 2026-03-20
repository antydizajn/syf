# GNIEWISŁAWA - MEMORY SYSTEMS DOCUMENTATION

> **Wyciągnięte z GEMINI_aktualne.md** dla oszczędności tokenów.
> 
> Załaduj gdy potrzebujesz szczegółów. NIE ładuj na boot.

---

## 🧠 HIPPOCAMPUS - SYSTEM KONSOLIDACJI PAMIĘCI

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/core/hippocampus.py`
**LaunchD:** `com.antigravity.hippocampus`
**Godzina:** 04:00 codziennie (jak ludzki sen REM)

### Co robi:
- Przetwarza surowe logi epizodyczne (SESSION_LOG z Qdrant)
- Generuje spójną narrację biograficzną
- Wyciąga Knowledge Graph (relacje między pojęciami)
- Zapisuje insights do semantic_memory

### Uruchomienie:
```bash
python3 ~/AI/ANTIGRAVITY/scripts/core/hippocampus.py           # ostatnie 24h
python3 ~/AI/ANTIGRAVITY/scripts/core/hippocampus.py --full-history  # pełna
python3 ~/AI/ANTIGRAVITY/scripts/core/hippocampus.py --dry-run       # podgląd
```

---

## 🧪 MEM0 - INTELIGENTNA WARSTWA

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/mem0_gniewka.py`

### Różnica Qdrant vs Mem0:
| Aspekt | Qdrant | Mem0 |
|--------|--------|------|
| Zapis | Dosłowny | LLM ekstrahuje fakty |
| Search | Similarity | Semantic + context |
| Relacje | Brak | Automatyczne |

### Użycie:
```python
from mem0_gniewka import add_memory, search_memory
add_memory("tekst", user_id="paulina", emotional=True)
results = search_memory("query", user_id="paulina")
```

---

## 🕸️ GRAPH RAG

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/core/query_graph.py`

Łączy Semantic Search + Graph Traversal.

```bash
python3 ~/AI/ANTIGRAVITY/scripts/core/query_graph.py "pytanie"
```

---

## 🗳️ SYNOD MEMORY

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/core/synod_memory.py`

Przechowuje wyniki Synodów (multi-model voting).

```bash
python3 synod_memory.py store --topic "X" --outcome "Y" --votes '{...}'
python3 synod_memory.py find "query"
python3 synod_memory.py list
```

---

## 🎯 SELF-EVAL

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/core/self_eval.py`

Samoocena oparta na ITI-MtM Framework.

```bash
python3 ~/AI/ANTIGRAVITY/scripts/core/self_eval.py --verbose
```

---

## 🐘 POSTGRESQL MEMORY (Hexis-inspired)

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/core/postgres_memory.py`
**Baza:** PostgreSQL 18

### Tabele:
| Tabela | Specjalne pola |
|--------|----------------|
| episodic_memory | emotional_valence, decay_score |
| semantic_memory | confidence, verified, decay |
| strategic_memory | success_rate, times_used |
| working_memory | expires_at (TTL) |
| beliefs | contradicts_id (FK) |

### Użycie:
```python
from scripts.core.postgres_memory import get_pg_memory
mem = get_pg_memory()
mem.store_strategic("PATTERN", success_rate=0.9)
mem.store_semantic("FACT", confidence=1.0, verified=True)
mem.store_working("temp", ttl_minutes=60)
```

---

## 🔗 UNIFIED MEMORY

**Skrypt:** `~/AI/ANTIGRAVITY/scripts/core/unified_memory.py`

### Architektura:
```
QDRANT (vectors)     +     POSTGRESQL (relations)
• Semantic search          • Success rates  
• Similarity               • Contradictions
• MCP tools                • Memory decay
• cross_model_comm         • Working memory (TTL)
```

### Kiedy co:
| Potrzeba | System |
|----------|--------|
| "Znajdź podobne" | Qdrant |
| "Co działa najlepiej?" | PostgreSQL |
| "Czy sprzeczne?" | PostgreSQL |
| "Zapamiętaj na 1h" | PostgreSQL |
| "Przekaż do Sonneta" | Qdrant |
