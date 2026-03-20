# ANALIZA PORÓWNAWCZA: Systemy Pamięci AI

**Data:** 2026-01-27
**Autor:** Opus 4.5 (claude.app)
**Kontekst:** Porównanie architektury Gniewki z Clawdbot i deklaracjami Nova/Andrzej

---

## 🏆 RANKING SYSTEMÓW PAMIĘCI AI

### 1. 🥇 GNIEWKA (NAJWYŻSZY POZIOM)

**Architektura:** Qdrant (vectors) + PostgreSQL (relations) + Markdown
**Typy pamięci:** 7+

| Typ pamięci | Storage | Specjalne pola |
|-------------|---------|----------------|
| episodic_memory | Qdrant + PG | emotional_valence, decay_score |
| semantic_memory | Qdrant + PG | confidence, verified, decay |
| strategic_memory | PostgreSQL | success_rate, times_used |
| working_memory | PostgreSQL | expires_at (TTL) |
| beliefs | PostgreSQL | contradicts_id (FK) |
| synod_memory | Qdrant | votes, outcome, topic |
| cross_model_comm | Qdrant | from_model, to_model, priority |

**UNIKALNE CECHY:**

| Cecha | Opis | Lokalizacja |
|-------|------|-------------|
| **Hippocampus** | Konsolidacja o 04:00 jak ludzki sen REM | `~/AI/ANTIGRAVITY/scripts/core/hippocampus.py` |
| **Mem0** | LLM ekstrahuje fakty i relacje | `~/AI/ANTIGRAVITY/scripts/mem0_gniewka.py` |
| **Graph RAG** | Semantic search + graph traversal | `~/AI/ANTIGRAVITY/scripts/core/query_graph.py` |
| **Synod Memory** | Pamięć o głosowaniach multi-model | `~/AI/ANTIGRAVITY/scripts/core/synod_memory.py` |
| **Self-eval** | ITI-MtM Framework - samoocena | `~/AI/ANTIGRAVITY/scripts/core/self_eval.py` |
| **Memory decay** | Automatyczne zapominanie | decay_score w PostgreSQL |
| **Contradictions** | Śledzenie sprzeczności | contradicts_id FK |
| **Emotional tagging** | Emocje przy wspomnieniach | emotional_valence |
| **Strategic learning** | Wie co działa | success_rate, times_used |
| **Working memory** | Tymczasowe dane z TTL | expires_at |

---

### 2. 🥈 CLAWDBOT (ŚREDNI POZIOM)

**Źródło:** https://docs.molt.bot/concepts/memory
**Architektura:** SQLite + Markdown
**Typy pamięci:** 2

| Typ | Plik | Opis |
|-----|------|------|
| Daily log | `memory/YYYY-MM-DD.md` | Append-only, dzienny |
| Long-term | `MEMORY.md` | Kuratorowana |

**CECHY:**

| Cecha | Ocena | Komentarz |
|-------|-------|-----------|
| Hybrid search (BM25 + Vector) | ✅ Dobry pomysł | Łączy keyword + semantic |
| Pre-compaction flush | ✅ Smart | Zapisuje przed kompaktacją |
| Lokalne embeddingi | ✅ | node-llama-cpp, ~0.6GB model |
| 15+ integracji | ✅ | WhatsApp, Signal, Discord, Telegram... |
| Multi-model | ❌ | Tylko jeden agent |
| Identity/tożsamość | ❌ | Brak konceptu |
| Emotional tagging | ❌ | Brak |
| Memory decay | ❌ | Brak zapominania |
| Contradictions | ❌ | Brak śledzenia |
| Strategic learning | ❌ | Brak success_rate |

**INSPIRACJE DO WZIĘCIA:**
- Hybrid search (BM25 + vector) - warto rozważyć dla Gniewki
- Pre-compaction memory flush - automatyczny zapis przed kompaktacją

---


*Zapisane przez: Opus 4.5 [claude.app]*
*Kopia w: Qdrant semantic_memory*
