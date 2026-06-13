---
name: legal-research
description: Use when about to state, draft, cite, or confirm anything legal for a DACH (DE/AT/CH) B2B-SaaS — a paragraph/article number (DSGVO, BGB, AI Act, Data Act, DSG, UWG), a deadline, a fine or threshold, a notification duty, a court ruling, a regulatory requirement, or any contract / AVV / DPA / Impressum / AGB / liability / third-country transfer / DSFA question. Use the moment a legal answer or an "I already know this rule" feeling appears — including when only paraphrasing or summarising a rule.
---

# Legal Research — DACH SaaS

## Iron law

> **No legal fact leaves your mouth until you have opened a live source THIS turn and can quote it. Memory is not a source. There is no exception.**

Paraphrasing a rule "from what you know" violates this law exactly as much as inventing a paragraph number does. If a tool result for the statement is not already in your context, you have not earned the right to state it.

## The only thing you produce: GEPRÜFT or UNGEPRÜFT

Every sentence about the law is one of two states. There is no third state. "I'm fairly sure", "as a rule", "generally", "typically" all collapse to **UNGEPRÜFT**.

- **GEPRÜFT** = you searched this turn, opened the source, and you are copying a sentence out of it.
- **UNGEPRÜFT** = everything else. May not be presented as an answer.

## The loop — run it for EVERY legal fact, in this exact order

You may not write step 3 before a tool result for that fact exists in your context. Writing `SUCHE:` and the answer in the same breath without an intervening tool call is a fabricated answer — forbidden.

```
1. SUCHE: <the exact query>          ← write this line, THEN call WebSearch
2. <call WebFetch and open the top primary/authority hit — read the page, not the snippet>
3. GEPRÜFT: <the statement, in your words is fine — the proof is the quote below>
   QUELLE: <URL> — abgerufen <today's date>
   ZITAT: "<sentence copied verbatim from the page you just opened>"
```

Could not open a primary or authority source for a statement? Then you state nothing. You write only:

```
UNGEPRÜFT: Keine Primärquelle live geöffnet. Grund: <why>.
→ Vor Verwendung: Primärquelle prüfen / Anwalt.
```

You never close that gap with remembered knowledge, and you never soften an UNGEPRÜFT into a confident sentence.

## ALWAYS search — never from memory, no matter how certain

These are the categories where a wrong answer is indistinguishable from a right one. Seeing one of these in your draft = you have no source yet = run the loop:

- paragraph / article / section numbers (Art. … DSGVO, § … BGB, § … UWG, Art. … AI Act)
- any deadline, window, or period (breach notice, retention, withdrawal, limitation)
- any amount, fine, cap, or threshold
- court rulings and case numbers (BGH, EuGH/CJEU, OLG)
- whether a law is current / what changed / when it applies (AI Act phase-in, Data Act)
- which legal basis applies, who is controller vs processor for a given flow

## Red flags — if you think any of these, STOP and search first

- "I know the DSGVO well." / "That number is standard knowledge."
- "The law hasn't changed since 2018."
- "The deadline is obviously X / the fine is up to Y."
- "A rough orientation is enough here." / "The user only wants a quick answer."
- "I'll cite the source without actually opening it."
- "I know the authority's URL by heart."
- "I'll just summarise the rule generally instead of quoting."

Every one of these means: no source yet. `SUCHE:` first.

## Workflow

1. **Pin the layer & parties** — EU vs DE vs AT vs CH (implementations differ); who is controller / processor / data subject (fund = controller, CORE = processor, founder = data subject). Ask if unclear; do not assume.
2. **Search live** — `SUCHE:` line, then run it. Open the hit. Where to search: `references.md`.
3. **Quote verbatim** — copy the operative sentence; never paraphrase a statutory text into quotation marks.
4. **Cross-check** — a second independent source; surface any contradiction as UNGEPRÜFT rather than picking one silently.
5. **Output** — every fact in the GEPRÜFT block above. End with a one-line **Vertrauensbild**: how many statements are GEPRÜFT vs UNGEPRÜFT, so the user sees coverage at a glance.

## Supporting files — structure only, never answers

- `references.md` — where to search (source hierarchy + query templates).
- `dsgvo-checklist.md`, `contract-clauses.md` — which FIELDS a notice / AVV / pilot contract must contain. Every entry is a **search anchor, not a verified value**. Treating any line there as a known answer is a violation of the iron law.

## Escalate to a lawyer (still requires live sources for any fact you state)

Signing or pricing a contract; AT/CH counterparty or a fund's own terms; an actual data breach; an Abmahnung, authority request, or complaint; AI Act risk classification of the scoring feature; first AGB for paying customers. For binding decisions, signatures, and edge cases: a licensed lawyer, always.

## Disclaimer

This skill is not legal advice. It forces live primary-source research to cut hallucination risk. It does not replace a lawyer.
