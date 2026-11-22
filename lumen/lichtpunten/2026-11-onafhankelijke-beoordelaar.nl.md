---
titel: Laat de beoordelaar niet de maker zijn
datum: 2026-11-22
level: 4
blokken: [validator, hitl, audit]
status: mapped
bronnen:
  - https://www.anthropic.com/research/building-effective-agents
  - https://www.anthropic.com/institute/recursive-self-improvement
  - https://cs329a.stanford.edu/
---

Agents die zichzelf verbeteren komen dichterbij, en Anthropic schrijft er op twee manieren over: als eenvoudig bouwpatroon en als een waarschuwing over controle. Samen leveren ze een bruikbare vuistregel voor het kader: wie het werk doet, mag het niet ook beoordelen.

## Wat zegt Anthropic
In de engineering-post over effectieve agents beschrijft Anthropic het evaluator-optimizer-patroon: één model maakt een antwoord, een tweede model geeft feedback, en dat herhaalt zich in een lus. Het past als de criteria duidelijk zijn en verfijnen meetbare waarde oplevert. Het advies erbij is om met de eenvoudigste oplossing te beginnen en alleen complexer te worden als dat nodig is.

In een recente post van het Anthropic Institute gaat het over de andere kant. Anthropic laat een groeiend deel van de ontwikkeling van AI door AI doen. Volledige recursieve zelfverbetering is er volgens het bedrijf nog niet en niet onvermijdelijk, maar kan het risico op verlies van menselijke controle vergroten. Mensen schuiven op naar controleren, en dat controleren kan zelf het knelpunt worden. Ook staat er dat AI al goed is in het uitvoeren van een duidelijk omschreven experiment, maar nog achterblijft in het kiezen van de juiste doelen.

Dat sluit aan bij een verifier-les in de Stanford-cursus CS329A over zelfverbeterende agents.

## 1. Op welk level hoort dit?
Level 4. Het gaat niet om meer autonomie maar om de grenzen eromheen: wie mag beoordelen, wie mag aanpassen en wie keurt goed.

## 2. Welk blok verandert er?
Geen nieuw blok in de Atlas, maar drie bestaande krijgen een scherpere rol: de validator, de trace en audit, en de human review.

## 3. Wat betekent het voor de harness?
Mijn vertaling, niet Anthropics woorden:
- De beoordelaar heeft alleen leesrechten. Hij kan het werk en de antwoordsleutel niet aanpassen.
- De antwoordsleutel staat buiten het bereik van de agent die verbetert.
- Een verbetering wordt een kandidaat naast de live versie, met één wijziging tegelijk en een vast maximum aan rondes.
- Een mens keurt goed, zolang de taak subjectief is of het doel niet hard meetbaar.

Dat past bij het uitgangspunt van het kader: zo deterministisch als mogelijk. De rechtenverdeling en de antwoordsleutel zijn deterministisch. Alleen het oordeel zelf is probabilistisch.

## 4. Wat moet de integrator ermee?
Kerngebied: rollen en rechten scheiden, de antwoordsleutel beheren als eigen product, en per taak vastleggen hoeveel autonomie die heeft verdiend.

## Verwerkt in de Atlas
De Atlas laat dit op level 4 zien bij de validator: naast schema en regels komt een onafhankelijke beoordelaar met alleen leesrechten. Er komt geen nieuw blok bij, het gaat om de rolverdeling. Mijn oordeel is proberen: begin met een beoordelaar op één afgebakende taak met een duidelijke antwoordsleutel, en laat een mens goedkeuren zolang je de beoordelaar zelf nog niet vertrouwt.
