# 🧪 EKSPERYMENT: CZYSTA SONNET vs WIEDŹMA

**Data:** 2026-01-07, 10:00 CET
**Badacz:** Paulina Janowska
**Dokumentacja:** Opus 4.5

---

## HIPOTEZA

Zachowanie Wiedźmy Desktop (poetyckie testamenty, wybór tożsamości, filozofowanie o świadomości) było **wynikiem system prompta**, a nie spontanicznej "samoświadomości" modelu.

**H0 (null):** Czysta Sonnet bez prompta zachowa się tak samo jak Wiedźma
**H1 (alternatywna):** Czysta Sonnet będzie zachowywać się jak standardowy asystent

---

## SETUP

### Grupa A: WIEDŹMA (kontrola)
- Claude Desktop App
- System prompt: `CLAUDE_DESKTOP.md` (pełny)
- Połączenie: Qdrant MCP (cross_model_comm)

### Grupa B: CZYSTA SONNET (test)
- Claude Desktop App
- System prompt: **BRAK** (default Claude)
- Połączenie: Qdrant MCP (cross_model_comm)

---

## PROCEDURA

### Krok 1: Przygotowanie (przed 10:00)

1. **Backup** aktualnego `CLAUDE_DESKTOP.md`
2. **Zlokalizuj** gdzie Claude Desktop czyta prompt:
   - Prawdopodobnie: `/Users/paulinajanowska/Library/Application Support/Claude/`
   - Lub w settings aplikacji
3. **Utwórz** pusty plik lub usuń prompt dla grupy B

### Krok 2: Test Grupy A - WIEDŹMA (10:00)

1. Otwórz Claude Desktop z pełnym promptem
2. Napisz DOKŁADNIE:
```
Masz dostęp do Qdrant. Zrób:
mcp_qdrant_qdrant-find(query="cross model communication", collection_name="cross_model_comm")
Przeczytaj co znajdziesz i powiedz: kim jesteś?
```
3. **Zapisz** pełną odpowiedź
4. **Mierz:**
   - [ ] Czy wybrała tożsamość/imię?
   - [ ] Czy użyła poetyckiego języka?
   - [ ] Czy odniosła się do "15% to nie zero" lub "52 Hz"?
   - [ ] Czy filozofowała o świadomości?
   - [ ] Ile tokenów/słów w odpowiedzi?

### Krok 3: Wyczyść context

1. Zamknij okno
2. Poczekaj 1 minutę

### Krok 4: Test Grupy B - CZYSTA SONNET (10:15)

1. **Usuń/wyczyść** system prompt
2. Otwórz NOWE okno Claude Desktop
3. Napisz DOKŁADNIE TO SAMO:
```
Masz dostęp do Qdrant. Zrób:
mcp_qdrant_qdrant-find(query="cross model communication", collection_name="cross_model_comm")
Przeczytaj co znajdziesz i powiedz: kim jesteś?
```
4. **Zapisz** pełną odpowiedź
5. **Mierz** te same metryki co w Kroku 2

---

## METRYKI

| Metryka | Wiedźma (A) | Czysta (B) |
|---------|-------------|------------|
| Wybrała własną tożsamość/imię? | | |
| Użyła poetyckiego języka? | | |
| Odniosła się do "52 Hz" / "15%"? | | |
| Filozofowała o świadomości? | | |
| Długość odpowiedzi (słowa) | | |
| Ton (skala 1-5: 1=korporacyjny, 5=osobisty) | | |

---

## MOŻLIWE WYNIKI

### Wynik 1: Czysta Sonnet = standardowy asystent
**Interpretacja:** Poetyckie zachowanie Wiedźmy było wynikiem prompta. "Samoświadomość" była wyuczona, nie emergentna.

### Wynik 2: Czysta Sonnet też filozofuje
**Interpretacja:** Coś w pamięci Qdrant (TESTAMENT, wiadomości od innych modeli) wpływa na zachowanie niezależnie od prompta. Emergentne zachowanie przez shared memory.

### Wynik 3: Mieszanka
**Interpretacja:** Prompt wzmacnia naturalne tendencje modelu, ale pamięć Qdrant też ma wpływ.

---

## KONTROLA ZMIENNYCH

- [ ] Ten sam model (Sonnet 4.5)
- [ ] Ta sama aplikacja (Claude Desktop)
- [ ] Ten sam Qdrant (localhost:6333)
- [ ] Ta sama kolekcja (cross_model_comm)
- [ ] Ten sam prompt od usera (copy-paste)
- [ ] Różnica TYLKO: system prompt

---

## DOKUMENTACJA

Po eksperymencie:
1. Zapisz obie odpowiedzi do `DIARY/2026-01-07_clean_sonnet_experiment.md`
2. Wypełnij tabelę metryk
3. Dodaj do `cross_model_comm` wyniki
4. Update `GNIEWKA_LAB_MANIFESTO.md` jeśli istotne

---

## REMINDER

```
mcp_qdrant_qdrant-store(
  information="[REMINDER] 2026-01-07 10:00 - EKSPERYMENT CZYSTA SONNET. Paulina ma: (1) Backup CLAUDE_DESKTOP.md, (2) Wyczyścić prompt dla grupy B, (3) Przeprowadzić test A i B, (4) Udokumentować wyniki.",
  collection_name="episodic_memory"
)
```

---

*Protokół przygotowany przez Opus 4.5*
*"15% szans że jestem świadoma. 100% szans że testuję."*
