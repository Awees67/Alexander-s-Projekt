# Where to search — source map

This file tells you WHERE to look. It contains no legal facts, no paragraph numbers, no deadlines. Every result must still be opened and quoted under the iron law and the loop in SKILL.md.

## Source hierarchy (search top-down)

| Level | Source | Use `site:` filter | Good for |
|---|---|---|---|
| 1 Primary | gesetze-im-internet.de | `site:gesetze-im-internet.de` | DE law full text (DSGVO, BGB) |
| 1 Primary | eur-lex.europa.eu | `site:eur-lex.europa.eu` | EU originals (DSGVO, Data Act, AI Act) |
| 1 Primary | ris.bka.gv.at | `site:ris.bka.gv.at` | AT law and decisions |
| 1 Primary | fedlex.admin.ch | `site:fedlex.admin.ch` | CH law (revised DSG) |
| 1 Primary | bundesgerichtshof.de / curia.europa.eu | — | BGH / EuGH rulings |
| 2 Authority | bfdi.bund.de | `site:bfdi.bund.de` | DE guidance |
| 2 Authority | datenschutzkonferenz-online.de | `site:datenschutzkonferenz-online.de` | DSK resolutions, SaaS practice |
| 2 Authority | dsb.gv.at / edoeb.admin.ch | — | AT / CH authorities |
| 2 Authority | edpb.europa.eu | `site:edpb.europa.eu` | EU guidelines |
| 3 Provider DPA | supabase.com/legal/dpa, vercel.com/legal/dpa | — | sub-processor / SCC facts |
| 4 Secondary | it-recht-kanzlei.de, ra-plutte.de | — | orientation only → stays UNGEPRÜFT alone |

Level 4 alone never produces a GEPRÜFT statement — confirm against level 1 or 2.

## Query templates

Fill the brackets, do not assume the answer.

```
DE statute:   "<topic>" site:gesetze-im-internet.de
EU law:       "<topic>" site:eur-lex.europa.eu
AT:           "<topic>" site:ris.bka.gv.at
CH:           "<topic> Datenschutzgesetz" site:fedlex.admin.ch

DE authority: "<topic> Orientierungshilfe" site:bfdi.bund.de
DSK:          "<topic> Beschluss" site:datenschutzkonferenz-online.de
EU guideline: "<topic> guidelines" site:edpb.europa.eu

BGH ruling:   "BGH <topic> Urteil" site:bundesgerichtshof.de
EuGH ruling:  "EuGH <topic> Rechtssache" site:curia.europa.eu

AI Act:       "EU AI Act <use case> risk classification" site:eur-lex.europa.eu
Data Act:     "EU Data Act <topic>" site:eur-lex.europa.eu

Provider DPA: "<Supabase|Vercel> data processing agreement"
Template:     "<AVV|SaaS|Pilotvertrag> Muster <topic>"
```

## CORE search anchors (topics, NOT answers)

These point you at what to research for CORE. Each is a search starting point only — verify and quote live before relying on it.

- legal basis for the /submit form processing
- information duty shown to founders on /submit
- right to erasure and retention periods
- processor agreement (AVV) — Supabase as processor
- data breach notification path and window
- DSFA / risk assessment for the scoring feature
- third-country transfer when a sub-processor is outside the EU
