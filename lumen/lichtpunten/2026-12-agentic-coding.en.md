---
titel: Anthropic on agentic coding: tests, a sandbox and a person who keeps looking
datum: 2026-12-01
level: 4
blokken: [ident, policy, validator, hitl, audit]
status: reviewed
bronnen:
  - https://www.anthropic.com/research/building-effective-agents
  - https://anthropic.com/engineering/claude-code-sandboxing
  - https://www.anthropic.com/institute/recursive-self-improvement
---

Agentic coding is where agents first work truly independently. Anthropic builds such agents and uses them itself, and writes about them in three places. This Glimmer reads those three through the lens of the framework.

## What does Anthropic say
**Why it works.** In the engineering post on effective agents, Anthropic explains why coding agents work well: the result can be verified with automated tests, the agent can adjust its work from the test results, and the problem is bounded. Anthropic adds directly that human review stays crucial, because tests show that code works but not whether it fits the wider requirements of the system. According to the same post, agents should be tested extensively in a shielded environment, with suitable guardrails, because autonomy costs more and lets errors accumulate.

**How to run it safely.** In the post on sandboxing in Claude Code, Anthropic chooses fixed boundaries up front, instead of approving every action separately. Effective sandboxing needs both file and network isolation. You can decide per path and domain what is and is not allowed. Anthropic reports that internally this cut the number of approval prompts by 84 percent, and that even a successful prompt injection stays inside the sandbox.

**What changes in practice.** The Anthropic Institute describes that Anthropic has a growing share of AI development done by AI, and that Anthropic engineers deliver on average about eight times as much code per quarter as in 2021-2025. The post warns that human review can become a bottleneck if people cannot judge code as fast as Claude makes it. Anthropic says organisations need tools to validate and verify what AI systems do.

## 1. Which level does this belong to?
Level 4. The agent can already act. The question is how much it may do, within which limits, and who approves.

## 2. Which block changes?
No new block. Five existing blocks get a meaning for code: Agent Identity, Policy & budget, Validator, Human review and Trace & audit. That is my link to the framework, not Anthropic's classification.

## 3. What does it mean for the harness?
What Anthropic itself describes:
- Fixed boundaries up front instead of a question per action, with file and network isolation together.
- Tests as feedback and as a check, and a person who keeps reviewing.
- A second model giving feedback on the first (the evaluator-optimizer pattern from the same engineering post), provided the criteria are clear.

My translation:
- What is allowed in the sandbox (paths, domains) I read as the minimal rights of the coding agent: its own identity in the framework.
- Tests and other hard checks first, then a judge with read-only rights, then a person. This follows the principle of the framework: as deterministic as possible, as probabilistic as needed. Tests and rules always give the same answer for the same code; a judge that is a model does not. That is why it comes only after the hard checks.

## 4. What should the integrator do with it?
My translation. Core area: what the coding agent may read, write and reach, the gate in the pipeline that every change must pass, and who is accountable for code an agent delivered. That last point touches Anthropic's own warning that review becomes the bottleneck.

## Reviewed, not mapped
The Atlas does not change. The Lifecycle gets one sentence at the Validate step: code from agents goes through the same gate as the rest. My verdict is **deploy** for sandbox, tests and human review, and **try** for an independent judge on code. That second one is not Anthropic advice for coding; it is my application of their pattern.
