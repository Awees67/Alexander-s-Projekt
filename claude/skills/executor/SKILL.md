---
name: executor
description: Use when the user wants a complex, multi-step task executed thoroughly and deeply (build a feature, larger refactor, multi-file bug hunt, migration, research+implementation) using maximum resources and parallel sub-agents to protect the main context window. Triggered by /executor or phrases like "nutze den executor", "voll-power", "geh tief", "gründlich umsetzen". NOTE: This is for EXECUTING tasks, not for writing a research report — do NOT confuse with the deep-research skill.
---

# Executor — Voll-Power-Ausführung

Dieser Skill aktiviert den **`executor`-Agent** für die vom Nutzer beschriebene
Aufgabe. Er ist für ECHTE Ausführung gedacht, nicht für reine Antworten — und
für komplexe Arbeit, die tief und vollständig erledigt werden soll.

**Wichtig — nicht verwechseln:** Dies ist NICHT der `deep-research`-Skill.
`deep-research` schreibt nur einen Recherche-Report. Dieser `executor` SETZT
Aufgaben tatsächlich UM (Code, Refactor, Migration, Bugfix) und nutzt Web-Research
nur als Mittel zum Zweck.

## Was du tun musst

1. **Aufgabe erfassen.** Nimm die Aufgabe aus den Argumenten des Slash-Commands
   (`$ARGUMENTS`). Falls keine Argumente übergeben wurden, nimm die zuletzt vom
   Nutzer beschriebene Aufgabe aus der laufenden Unterhaltung.

2. **An den Agent delegieren.** Rufe das `Agent`-Tool mit
   `subagent_type: "executor"` auf und übergib die vollständige
   Aufgabenbeschreibung als `prompt`. Gib dem Agent dabei mit:
   - Den vollen Kontext der Aufgabe (was, warum, gewünschtes Ergebnis).
   - Den Auftrag, **maximale Ressourcen** zu nutzen, **nicht** an Tokens zu
     sparen, **Web-Research** zu betreiben und **breite Lese-/Such-Arbeit an
     parallele Sub-Agenten** zu delegieren, um Kontext zu schonen.
   - Den Auftrag, die Projekt-Regeln (`CLAUDE.md`, `.claude/rules/`) und die
     passenden Projekt-Skills (`brainstorming` → `writing-plans` →
     `executing-plans` → `verification-before-completion`) verbindlich zu folgen.

3. **Mehrere unabhängige Teilaufgaben?** Wenn die Aufgabe in klar unabhängige
   Stränge zerfällt, starte **mehrere `executor`-Agenten parallel** in EINER
   Nachricht (mehrere Tool-Calls gleichzeitig), statt nacheinander.

4. **Ergebnis berichten.** Fasse das Fazit des Agents knapp für den Nutzer
   zusammen: was getan wurde, welche Dateien geändert wurden, wie verifiziert
   wurde, offene Punkte. Die token-intensive Arbeit bleibt im isolierten Kontext
   des Agents — der Hauptkontext bleibt frei.

## Hinweis

- Bei **trivialen Aufgaben** (Einzeiler, reine Faktenfrage) ist dieser Skill
  Overkill — erledige sie direkt, ohne den Agent zu starten, und sag das kurz.
- Der eigentliche „Voll-Power, tief, parallel"-Charakter steckt im System-Prompt
  des Agents (`.claude/agents/executor.md`). Dieser Skill ist nur der bequeme
  `/`-Auslöser dafür.
