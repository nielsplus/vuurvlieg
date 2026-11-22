---
titel: Anthropic over agentic coding: tests, een sandbox en een mens die blijft kijken
datum: 2026-12-01
level: 4
blokken: [ident, policy, validator, hitl, audit]
status: reviewed
bronnen:
  - https://www.anthropic.com/research/building-effective-agents
  - https://anthropic.com/engineering/claude-code-sandboxing
  - https://www.anthropic.com/institute/recursive-self-improvement
---

Agentic coding is het gebied waar agents het eerst echt zelfstandig werken. Anthropic bouwt zulke agents en gebruikt ze zelf, en schrijft er op drie plekken over. Dit Lichtpunt leest die drie door de bril van het kader.

## Wat zegt Anthropic
**Waarom het werkt.** In de engineering-post over effectieve agents legt Anthropic uit waarom coding agents goed werken: de uitkomst is met geautomatiseerde tests te verifiëren, de agent kan zijn werk bijsturen op basis van de testresultaten, en het probleem is afgebakend. Anthropic zegt er direct bij dat menselijke review cruciaal blijft, omdat tests laten zien dat code werkt maar niet of het past bij de bredere eisen van het systeem. Agents horen volgens dezelfde post uitgebreid getest te worden in een afgeschermde omgeving, met passende guardrails, want autonomie kost meer en laat fouten opstapelen.

**Hoe je het veilig laat draaien.** In de post over sandboxing in Claude Code kiest Anthropic voor vaste grenzen vooraf, in plaats van elke actie apart goedkeuren. Effectieve sandboxing vraagt zowel bestands- als netwerkisolatie. Je kunt per pad en domein bepalen wat wel en niet mag. Anthropic meldt dat dit intern het aantal goedkeuringsvragen met 84 procent verlaagde, en dat zelfs een geslaagde prompt injection binnen de sandbox blijft.

**Wat er in de praktijk verandert.** Het Anthropic Institute beschrijft dat Anthropic een groeiend deel van de ontwikkeling aan AI laat doen, en dat Anthropic-engineers gemiddeld ongeveer acht keer zoveel code per kwartaal opleveren als in 2021-2025. De post waarschuwt dat menselijk reviewen een knelpunt kan worden als mensen code niet zo snel kunnen beoordelen als Claude hem maakt. Anthropic zegt dat organisaties tools nodig hebben om te valideren en verifiëren wat AI-systemen doen.

## 1. Op welk level hoort dit?
Level 4. De agent kan al handelen. De vraag is hoeveel hij mag, binnen welke grenzen, en wie goedkeurt.

## 2. Welk blok verandert er?
Geen nieuw blok. Vijf bestaande blokken krijgen een invulling voor code: Agent Identity, Policy & budget, Validator, Human review en Trace & audit. Dat is mijn koppeling aan het kader, niet Anthropics indeling.

## 3. Wat betekent het voor de harness?
Wat Anthropic zelf beschrijft:
- Vaste grenzen vooraf in plaats van een vraag per actie, met bestands- en netwerkisolatie samen.
- Tests als feedback en als controle, en een mens die blijft beoordelen.
- Een tweede model dat feedback geeft op het eerste (het evaluator-optimizer-patroon uit dezelfde engineering-post), mits de criteria duidelijk zijn.

Mijn vertaling:
- Wat in de sandbox mag (paden, domeinen) zie ik als de minimale rechten van de codeer-agent: zijn eigen identiteit in het kader.
- Tests en andere harde controles eerst, daarna een beoordelaar met alleen leesrechten, daarna een mens. Dat volgt het principe van het kader: zo deterministisch als mogelijk, zo probabilistisch als nodig. Tests en regels geven bij dezelfde code altijd hetzelfde antwoord; een beoordelaar die een model is, niet. Daarom komt die pas na de harde controles.

## 4. Wat moet de integrator ermee?
Mijn vertaling. Kerngebied: wat de codeer-agent mag lezen, schrijven en bereiken, de poort in de pijplijn waar elke wijziging doorheen moet, en wie verantwoordelijk is voor code die een agent opleverde. Dat laatste raakt Anthropics eigen waarschuwing dat reviewen het knelpunt wordt.

## Beoordeeld, niet verwerkt
De Atlas verandert niet. De Lifecycle krijgt bij Valideren één zin: code van agents gaat door dezelfde poort als de rest. Mijn oordeel is **inzetten** voor sandbox, tests en menselijke review, en **proberen** voor een onafhankelijke beoordelaar bij code. Dat tweede staat niet als Anthropic-advies voor coding, dat is mijn toepassing van hun patroon.
