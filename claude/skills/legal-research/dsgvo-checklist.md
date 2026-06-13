# DSGVO scaffolds — CORE

This file lists WHICH fields a document must contain and WHAT to research. It deliberately contains no legal values — no article numbers, no deadlines, no legal-basis labels. Every entry below is a **search anchor, not an answer**. Look every value up live and quote it under the iron law and the loop in SKILL.md. Any value you remember instead of searching is UNGEPRÜFT and may not be stated.

## Privacy notice on /submit — required fields

Search the current information-duty provision and confirm each field is mandatory before drafting:

- controller identity and contact
- purpose of processing
- legal basis (search which one applies — do not assume)
- recipients
- storage location
- retention period (search; do not state a number from memory)
- data-subject rights (search the current list)
- right to lodge a complaint and the competent authority

Minimal consent reference in the form points to a `/datenschutz` page; the page must carry the verified fields above.

## AVV with Supabase (processor agreement) — to verify

- whether a processor agreement is required for this setup → search the relevant article
- how Supabase provides its DPA → confirm on supabase.com/legal/dpa
- store the confirmation for documentation

## AVV with the fund — required contents

Search the processor-agreement article and confirm the mandatory contents before drafting. Field checklist (verify each against the live text):

- subject matter and duration
- nature and purpose of processing
- categories of data subjects
- controller's rights and duties
- processing only on documented instruction
- confidentiality of staff
- security measures
- sub-processors
- assistance with data-subject requests
- deletion / return after the engagement

Template starting point: search a current SaaS AVV Muster; never copy values without verifying against the statute.

## Legal basis — to determine, not to assume

Two bases are plausible for CORE; which fits is a research + judgment call, not a memorized answer. Search the legal-basis article, read the conditions for each candidate basis, then reason about which applies to the /submit flow vs. internal analysis. State the basis only as GEPRÜFT with a quote.

## Retention periods — to define by research

There is no default to recall. For each data type (submissions, pipeline items, notes, emails, activity log) the retention period must be derived from the applicable rule and the fund's instruction. Search the relevant principles; do not state a number from memory.

## Data breach process — to verify live, under time pressure

A breach is the highest-risk moment to hallucinate the deadline. Do not state any notification window from memory. Steps:

1. contain — rotate keys / revoke access
2. search the current notification provision and window → quote it → notify the competent authority within the verified window
3. search whether affected founders must be informed directly
4. document what happened, when noticed, which data

Escalate to a lawyer in parallel.
