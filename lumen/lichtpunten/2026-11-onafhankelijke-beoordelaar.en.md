---
titel: The judge should not be the maker
datum: 2026-11-22
level: 4
blokken: [validator, hitl, audit]
status: reviewed
bronnen:
  - https://www.anthropic.com/research/building-effective-agents
  - https://www.anthropic.com/institute/recursive-self-improvement
  - https://cs329a.stanford.edu/
---

Agents that improve themselves are getting closer, and Anthropic writes about it in two ways: as a simple building pattern and as a warning about control. Together they give a usable rule of thumb for the framework: whoever does the work should not also judge it.

## What Anthropic says
In its engineering post on effective agents, Anthropic describes the evaluator-optimizer pattern: one model produces an answer, a second model gives feedback, and this repeats in a loop. It fits when the criteria are clear and refining adds measurable value. The advice that comes with it is to start with the simplest solution and only add complexity when needed.

A recent post from the Anthropic Institute covers the other side. Anthropic is delegating a growing share of AI development to AI itself. According to the company, full recursive self-improvement is not here yet and not inevitable, but it could increase the risk of losing human control. People move towards reviewing, and that reviewing can itself become the bottleneck. The post also says AI is already good at carrying out a well-specified experiment, but still lags in choosing the right goals.

This matches a verifier lesson in the Stanford course CS329A on self-improving agents.

## 1. Which level does this belong to?
Level 4. It is not about more autonomy but about the limits around it: who may judge, who may change, and who approves.

## 2. Which block changes?
No new block in the Atlas, but three existing ones get a sharper role: the validator, trace and audit, and human review.

## 3. What does it mean for the harness?
My translation, not Anthropic's words:
- The judge has read-only rights. It cannot change the work or the answer key.
- The answer key sits out of reach of the agent that is improving.
- An improvement becomes a candidate beside the live version, with one change at a time and a fixed maximum number of rounds.
- A person approves, as long as the task is subjective or the goal is not hard to measure.

This fits the framework's principle: as deterministic as possible. The permissions and the answer key are deterministic. Only the judgement itself is probabilistic.

## 4. What should the integrator do with it?
Core area: separating roles and permissions, managing the answer key as a product of its own, and recording per task how much autonomy it has earned.

## Reviewed, not mapped
The Atlas does not change. The blocks already exist; this is about the division of roles. My verdict is try: start with a judge on one well-bounded task with a clear answer key, and let a person approve until you trust the judge itself.
