---
titel: Eén agent die doelen krijgt in plaats van stappen
datum: 2026-10-08
level: 5
blokken: [orch, gemini, state]
status: volgen
bronnen:
  - https://9to5google.com/2026/10/08/gemini-agent-google-cloud/
---

Google kondigde in oktober de Gemini agent aan: één agent voor werk die doelen krijgt in plaats van stappen. Dat raakt drie blokken van het model tegelijk, en daarmee is het een goede test voor het kader.

## Wat is er aangekondigd
De agent verdeelt werk over sub-agents en voert taken uit die uren of dagen kunnen duren. Hij kiest per taak een model, waaronder Gemini en modellen van andere aanbieders, en heeft vier soorten geheugen: sessie, semantisch, procedureel en episodisch. Hij is nog in private preview.

## 1. Op welk level hoort dit?
Level 5. Het gaat over meerdere agents, meerdere modellen en geheugen over taken heen: werken op schaal.

## 2. Welk blok verandert er?
Drie blokken. De orchestrator wordt een router met subagents, het model wordt een modelrouter, en sessiestatus wordt een geheugenlaag met vier soorten geheugen.

## 3. Wat betekent het voor de harness?
Taken die dagen duren vragen checkpoints, budgetten en een maximum aan stappen. Geheugen vraagt nieuwe regels: wat mag een agent onthouden, hoe lang, en zit er persoonsgegevens in? En de controles moeten hetzelfde blijven, welk model er ook achter zit.

## 4. Wat moet de integrator ermee?
Kerngebied: welke bronnen en API's zo'n agent mag gebruiken, één toegangslaag tot modellen, en hoe het geheugen een storing overleeft.

## Mijn oordeel: volgen
De richting is duidelijk: van losse agents naar één agent die werk verdeelt. Maar zolang het in private preview is, ligt de waarde vooral in de vragen die het oproept over geheugen en toezicht. Die kun je nu al in een architectuur meenemen.
