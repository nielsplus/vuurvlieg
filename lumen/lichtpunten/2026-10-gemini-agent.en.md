---
titel: One agent that gets goals instead of steps
datum: 2026-10-08
level: 5
blokken: [orch, gemini, state]
status: volgen
bronnen:
  - https://9to5google.com/2026/10/08/gemini-agent-google-cloud/
---

In October Google announced the Gemini agent: one agent for work that gets goals instead of steps. It touches three blocks of the model at once, which makes it a good test for the framework.

## What was announced
The agent distributes work over sub-agents and carries out tasks that can take hours or days. It chooses a model per task, including Gemini and models from other providers, and has four kinds of memory: session, semantic, procedural and episodic. It is still in private preview.

## 1. Which level does this belong to?
Level 5. It is about multiple agents, multiple models and memory across tasks: working at scale.

## 2. Which block changes?
Three blocks. The orchestrator becomes a router with sub-agents, the model becomes a model router, and session state becomes a memory layer with four kinds of memory.

## 3. What does it mean for the harness?
Tasks that take days need checkpoints, budgets and a maximum number of steps. Memory needs new rules: what may an agent remember, for how long, and does it contain personal data? And the checks must stay the same, whatever model sits behind them.

## 4. What should the integrator do with it?
Core area: which sources and APIs such an agent may use, one access layer to models, and how the memory survives an outage.

## My verdict: follow
The direction is clear: from separate agents to one agent that distributes work. But as long as it is in private preview, the value lies mainly in the questions it raises about memory and oversight. You can already take those into account in an architecture today.
