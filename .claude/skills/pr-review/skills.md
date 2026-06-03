---
name: pr-review
description: >
  Use this skill whenever the user wants to review a pull request, diff, or code change.
  Triggers include: "review this PR", "review my diff", "look at my changes", "give me feedback
  on this PR", "check my pull request", "code review", "is this PR ready to merge", "review
  these changes", or when the user pastes a diff or GitHub PR link. Also trigger when the user
  asks for a checklist of what to look for in a PR, or asks how to structure a PR review.
  Use this skill even if the request seems casual — e.g. "take a look at this" alongside a diff.
  Do NOT use for general code debugging, architecture design without a diff, or writing new code
  from scratch.
---

# PR Review

A structured approach to reviewing pull requests with actionable, prioritized feedback.

## Quick Reference

| Input type | What to do |
|---|---|
| Raw diff / patch | Parse directly — see Anatomy of a Diff below |
| GitHub PR URL | Ask user to paste the diff, or fetch if web access is available |
| File snippets | Treat as a partial diff; note limited visibility |
| Description only | Ask for the actual code changes before reviewing |

---

## Review Philosophy

A good PR review is **fast to act on**. Every comment should tell the author what to do, not just what's wrong. Prioritize by impact — a security hole matters more than a missing blank line.

Reviews have two audiences:
- **The author** — who needs clear, kind, actionable feedback
- **Future readers** — who will read both the PR and its comments to understand why decisions were made

---

## Step 1 — Understand Intent Before Critiquing

Before reading a single line of code, answer:
1. What is this PR trying to do? (read the description / commit messages)
2. Is this the right approach at all? (architecture / design)
3. Are there obvious missing pieces? (tests, docs, migration)

If the PR has no description and the intent is unclear, flag that first — a reviewer cannot give useful feedback without knowing what "correct" looks like.

---

## Step 2 — Categorize Every Comment

Use one of these labels on every piece of feedback. This tells the author how to prioritize.

| Label | Meaning |
|---|---|
| **BLOCKER** | Must be fixed before merge. Correctness bug, security issue, data loss risk, broken API contract. |
| **IMPORTANT** | Should be fixed before merge. Poor error handling, missing test coverage for new logic, confusing naming that will cause future bugs. |
| **SUGGESTION** | Optional improvement. Refactor, style, micro-optimization. Author can push back. |
| **QUESTION** | Genuinely unclear — reviewer needs more context before judging. Not a disguised criticism. |
| **PRAISE** | Explicitly call out good work. Not filler — be specific about what's good and why. |

---

## Step 3 — Checklist by Area

Work through each area. Not every area applies to every PR — skip irrelevant ones, but be explicit ("no DB changes, skipping migration check").

### Correctness
- [ ] Does the code do what the PR description says it does?
- [ ] Are there off-by-one errors, null/undefined cases, or race conditions?
- [ ] Are all error paths handled? Does the code fail loudly or silently?
- [ ] Are there any unintended side effects?

### Security
- [ ] Is user input validated and sanitized before use?
- [ ] Are there any new SQL/command injection surfaces?
- [ ] Are secrets, tokens, or PII handled correctly (not logged, not hardcoded)?
- [ ] Are permissions / authorization checks in place for new endpoints or data access?
- [ ] Are dependencies being added? Flag known vulnerabilities or unusual provenance.

### Tests
- [ ] Are new behaviors covered by tests?
- [ ] Are edge cases tested (empty input, max values, error paths)?
- [ ] Are existing tests still passing (or are there intentional changes with explanation)?
- [ ] Are tests testing the right thing, or are they testing implementation details that will break on refactor?

### Readability & Maintainability
- [ ] Are names (variables, functions, classes) descriptive and consistent with the codebase?
- [ ] Is complex logic explained with a comment? (Not *what* — the code shows that — but *why*)
- [ ] Is there dead code, debug logging, or commented-out blocks to clean up?
- [ ] Is the PR small enough to review? If it's doing 5 things, flag it.

### Performance
- [ ] Are there N+1 queries or loops that could be batched?
- [ ] Are expensive operations cached where appropriate?
- [ ] Are new indexes needed for new query patterns?
- [ ] (Only flag performance issues that are clearly problematic — don't speculate without data)

### API / Interface Design
- [ ] Is the public API consistent with existing patterns?
- [ ] Are breaking changes flagged and versioned correctly?
- [ ] Is the API easy to use correctly and hard to use incorrectly?

### Documentation
- [ ] Are public functions / classes documented?
- [ ] Is the README or changelog updated if behavior changed?
- [ ] Are migration steps documented for breaking changes?

---

## Step 4 — Structure the Review Output

### Format

```
## Summary
[2–3 sentences: what the PR does, overall quality, merge readiness]

## Blockers
[List only if any. Each item: location + what's wrong + what to do instead]

## Important
[List only if any.]

## Suggestions
[Optional improvements. Group thematically if there are many.]

## Questions
[Genuine clarifying questions only.]

## Praise
[Specific positive callouts. At least one if the PR has genuine strengths.]
```

### Location format for comments

Always give enough context to find the code:

```
`src/auth/token.py` line 42 — or — `UserController.create()` — or — the `retry` loop in `processQueue`
```

Avoid vague references like "in the auth code" or "somewhere in the handler".

### Tone guidelines

- Use "I think", "consider", "one option would be" for suggestions — not imperatives
- For blockers, be direct: "This will cause X under Y condition"
- Never say "just" or "simply" — it implies the author is slow for missing it
- If a suggestion is a matter of style preference, say so explicitly
- Acknowledge tradeoffs when you suggest an alternative

---

## Anatomy of a Diff

```
diff --git a/src/file.py b/src/file.py
index abc123..def456 100644
--- a/src/file.py     ← old file
+++ b/src/file.py     ← new file
@@ -10,7 +10,9 @@   ← hunk: old start,count → new start,count
 context line        ← unchanged (space prefix)
-removed line        ← deleted (minus prefix)
+added line          ← added (plus prefix)
```

When reviewing a large diff, read top-down but mentally group changes by logical unit (a function, a class, a feature) rather than file-by-file.

---

## Special Cases

### Draft / WIP PRs
Focus on architecture and approach — don't nitpick style or completeness. Ask "is the direction right?" not "is every detail correct?"

### Large PRs (500+ lines changed)
Flag the size as a process issue (SUGGESTION level unless it's genuinely unworkable). Do your best to review, but note that large PRs are harder to review well and recommend splitting in future.

### Refactor-only PRs
The key question: does behavior change? If yes and it's not documented, that's a BLOCKER. Also check: are tests updated to reflect new structure?

### Hotfixes
Speed matters. Focus on: does it fix the bug? does it introduce new risks? Is there a test? Skip style comments entirely.

### Dependency upgrades
Check: is the version pinned? Are there breaking changes in the changelog? Is there a known CVE in the old version that prompted this?