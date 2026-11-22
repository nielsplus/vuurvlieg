---
titel: Als agents de code schrijven, verschuift het werk naar controleren
datum: 2026-12-01
level: 4
blokken: [ident, policy, validator, hitl, audit]
status: reviewed
bronnen:
  - https://www.anthropic.com/research/building-effective-agents
  - https://anthropic.com/engineering/claude-code-sandboxing
  - https://cloud.google.com/transform/when-ai-writes-the-code-who-reviews-it-cto-google-cloud
  - https://thenewstack.io/?p=22827666
---

Agentic coding is het gebied waar agents het eerst echt zelfstandig werken. Het laat daarmee ook het eerst zien waar het knelpunt komt te liggen: niet bij het schrijven, maar bij het beoordelen.

## Wat zien we
Anthropic legt in een engineering-post uit waarom coding agents goed werken. De uitkomst is met geautomatiseerde tests te verifiëren, de agent kan zijn werk verbeteren op basis van testresultaten, en het probleem is afgebakend. Tegelijk blijft menselijke review nodig, omdat tests laten zien dat code werkt maar niet of het past bij de bredere eisen van het systeem.

Voor de veiligheid beschrijft Anthropic een aanpak met een sandbox: vaste grenzen waarbinnen de agent vrij mag werken, in plaats van elke actie apart goedkeuren. Daarbij zijn zowel bestands- als netwerkisolatie nodig. Intern zou dat het aantal goedkeuringsvragen met 84 procent verlagen.

Het knelpunt wordt breed gezien. Google Cloud beschrijft dat het schrijven van code niet langer de beperking is, maar het beoordelen en integreren ervan. Een GitLab-onderzoek meldt dat 85 procent van de respondenten dat bevestigt, en dat 43 procent niet betrouwbaar kan zien welke code van een AI komt.

## 1. Op welk level hoort dit?
Level 4. De agent kan al handelen. De vraag is hoeveel hij mag, binnen welke grenzen, en wie goedkeurt.

## 2. Welk blok verandert er?
Geen nieuw blok. Vijf bestaande blokken krijgen op dit gebied een concrete invulling: Agent Identity (eigen identiteit met minimale rechten voor de codeer-agent), Policy & budget (wat mag zelf, wat eerst vragen), Validator (tests als harde controle), Human review en Trace & audit.

## 3. Wat betekent het voor de harness?
Mijn vertaling:
- De agent werkt in een afgeschermde omgeving met een eigen identiteit en alleen de rechten voor deze taak.
- Tests en andere harde controles komen eerst. Daarna komt een onafhankelijke beoordelaar met alleen leesrechten.
- Het risico bepaalt de review: kleine, laagrisico-wijzigingen kunnen automatisch worden beoordeeld, risicovolle gaan naar een mens.
- Het is vastgelegd welke code door een agent is geschreven, zodat de herkomst terug te vinden is.

## 4. Wat moet de integrator ermee?
Kerngebied: rechten en identiteit van de codeer-agent, de poort in de pijplijn waar een wijziging doorheen moet, en eigenaarschap. Wie is verantwoordelijk voor code die een agent opleverde, en wie kan haar later nog uitleggen?

## Beoordeeld, niet verwerkt
De Atlas verandert niet. De Lifecycle krijgt op het niveau van Valideren één zin: code van agents gaat door dezelfde poort als de rest. Mijn oordeel is **inzetten** voor het afgebakende deel (tests, sandbox, identiteit) en **proberen** voor automatisch reviewen van laagrisico-wijzigingen, tot daar eigen cijfers voor zijn.
