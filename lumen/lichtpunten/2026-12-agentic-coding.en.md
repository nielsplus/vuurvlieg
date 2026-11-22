---
titel: When agents write the code, the work moves to verifying
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

Agentic coding is where agents first work truly independently. That also makes it the first place to show where the bottleneck ends up: not in writing, but in judging.

## What do we see
In an engineering post, Anthropic explains why coding agents work well. The result can be verified with automated tests, the agent can improve its work from test results, and the problem is well bounded. At the same time human review remains necessary, because tests show that code works but not whether it fits the wider requirements of the system.

For safety, Anthropic describes a sandbox approach: fixed boundaries within which the agent may work freely, instead of approving every action separately. Both file and network isolation are needed. Internally, it is said to cut the number of approval prompts by 84 percent.

The bottleneck is widely recognised. Google Cloud describes that writing code is no longer the constraint, but reviewing and integrating it. A GitLab survey reports that 85 percent of respondents confirm this, and that 43 percent cannot reliably tell which code comes from an AI.

## 1. Which level does this belong to?
Level 4. The agent can already act. The question is how much it may do, within which limits, and who approves.

## 2. Which block changes?
No new block. Five existing blocks get a concrete meaning here: Agent Identity (its own identity with minimal rights for the coding agent), Policy & budget (what it may do alone, what it must ask first), Validator (tests as hard checks), Human review and Trace & audit.

## 3. What does it mean for the harness?
My translation:
- The agent works in a shielded environment with its own identity and only the rights for this task.
- Tests and other hard checks come first. After that comes an independent judge with read-only rights.
- Risk decides the review: small, low-risk changes can be reviewed automatically, risky ones go to a person.
- It is recorded which code an agent wrote, so its origin can be traced.

## 4. What should the integrator do with it?
Core area: the rights and identity of the coding agent, the gate in the pipeline that every change must pass, and ownership. Who is accountable for code an agent delivered, and who can still explain it later?

## Reviewed, not mapped
The Atlas does not change. The Lifecycle gets one sentence at the Validate step: code from agents goes through the same gate as the rest. My verdict is **deploy** for the bounded part (tests, sandbox, identity) and **try** for automatically reviewing low-risk changes, until you have your own figures for it.
