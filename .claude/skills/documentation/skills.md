---
name: documentation
description: >
  Use this skill whenever the user wants to write, improve, review, or restructure technical
  documentation. Triggers include: "write docs for this", "document this function", "write a
  README", "add docstrings", "write API docs", "improve the docs", "write a runbook",
  "write an ADR", "create a CONTRIBUTING guide", "write inline comments", "generate JSDoc /
  docstring / godoc", or when the user pastes code and asks for documentation to accompany it.
  Also trigger when the user asks what documentation a project should have, or asks for a
  documentation review. Use this skill proactively when the user has just written or shared
  code and hasn't yet documented it.
  Do NOT use for writing blog posts, marketing copy, or non-technical prose unless it's part
  of a documentation deliverable (e.g., a conceptual overview in a README).
---

# Technical Documentation

Write documentation that developers actually read: clear, complete, and maintained alongside the code.

## Quick Reference

| What to write | Jump to |
|---|---|
| README for a project | README section |
| Docstrings / inline comments | Inline Documentation section |
| API reference | API Docs section |
| Architecture Decision Record | ADR section |
| Runbook / ops guide | Runbook section |
| CONTRIBUTING guide | CONTRIBUTING section |
| Review existing docs | Documentation Review section |

---

## Core Principles

**Write for the reader, not the writer.** The author knows the code — the reader doesn't. Every doc should answer: what does this do, why does it exist, how do I use it, and what can go wrong?

**Documentation has an audience.** Before writing, identify:
- **New users** — need quickstart, installation, "hello world"
- **Existing users** — need reference, how-tos, troubleshooting
- **Contributors** — need architecture, development setup, conventions
- **Ops / on-call** — need runbooks, alerting, rollback steps

**Show, don't just tell.** Every concept should have an example. Every function should show a call. Every error should show how to fix it.

**Docs rot.** Documentation that's hard to keep up to date won't be. Keep docs close to the code, use automation (docgen, openapi) where possible, and flag docs that will need updating as part of PR reviews.

---

## README

A README is the front door of a project. It should answer: *What is this? Can I use it? How do I start?*

### Structure

```markdown
# Project Name

[One sentence: what does this do?]
[One sentence: who is it for?]

## Quick Start

[The fastest possible path to a working example — ideally under 5 commands]

## Installation

[Full install steps, including prerequisites]

## Usage

[Most common use cases with examples. Link to full docs if they exist elsewhere.]

## Configuration

[Key config options, environment variables, config file format]

## Contributing

[Link to CONTRIBUTING.md, or brief summary if simple]

## License
```

### Quick Start guidelines
- Assume a clean machine with only the language runtime installed
- Include every command, including install steps
- The output of the final command should be something visibly satisfying (a server starting, a test passing, a file produced)
- Test the Quick Start yourself (or prompt the user to — it breaks constantly)

### README anti-patterns
- Wall of text with no headers or examples
- "See the docs" with no link
- Installation instructions that assume prior knowledge
- Outdated screenshots that no longer match the UI
- Badges that only exist to look impressive

---

## Inline Documentation

### When to comment

Comment the **why**, not the **what**. If someone reading the code would wonder "why is this done this way?", that's a comment. If they would understand it by reading the code, it's not.

```python
# ✅ Explains non-obvious reasoning
# We retry exactly 3 times to match the payment processor's idempotency window.
for attempt in range(3):
    ...

# ❌ Restates what the code already says
# Loop 3 times
for attempt in range(3):
    ...
```

Also comment:
- Workarounds for known bugs (link to the bug if possible)
- Algorithm choices ("we use merge sort here because the input is nearly sorted")
- Constraints from external systems ("this field is limited to 64 chars by the upstream API")
- "Obvious" optimizations that were tried and removed

### Docstrings

**Python (Google style)**
```python
def retry(func, max_attempts=3, backoff=1.0):
    """Retry a function with exponential backoff.

    Args:
        func: Callable to retry. Must be idempotent.
        max_attempts: Maximum number of attempts before raising. Defaults to 3.
        backoff: Initial wait in seconds between attempts. Doubles each retry.

    Returns:
        The return value of func on success.

    Raises:
        RetryExhausted: If all attempts fail. The original exception is chained.

    Example:
        result = retry(lambda: requests.get(url), max_attempts=5)
    """
```

**TypeScript / JSDoc**
```typescript
/**
 * Retry a function with exponential backoff.
 *
 * @param fn - Async function to retry. Must be idempotent.
 * @param maxAttempts - Maximum number of attempts. Defaults to 3.
 * @param backoffMs - Initial wait in milliseconds. Doubles each retry.
 * @returns Promise resolving to fn's return value.
 * @throws {RetryExhausted} If all attempts fail.
 *
 * @example
 * const data = await retry(() => fetch(url).then(r => r.json()));
 */
```

**Go**
```go
// Retry calls fn up to maxAttempts times with exponential backoff.
// It returns the first successful result or the last error encountered.
// fn must be idempotent — it may be called multiple times.
func Retry(fn func() error, maxAttempts int, backoff time.Duration) error {
```

### Docstring checklist
- [ ] What does it do? (first line, imperative: "Retry a function", not "Retries a function")
- [ ] What are the parameters and their types?
- [ ] What does it return?
- [ ] What errors/exceptions can it raise?
- [ ] At least one usage example for non-trivial functions
- [ ] Any side effects or state mutations
- [ ] Any important constraints (idempotency, thread safety, max input size)

---

## API Documentation

### REST APIs

For each endpoint, document:

```markdown
### POST /v1/charges

Create a new charge.

**Request**

| Field | Type | Required | Description |
|---|---|---|---|
| amount | integer | Yes | Amount in smallest currency unit (e.g., cents) |
| currency | string | Yes | ISO 4217 currency code (e.g., "usd") |
| source | string | Yes | Payment source token from the client |
| description | string | No | Human-readable description shown to the customer |

**Response** `200 OK`

```json
{
  "id": "ch_1234",
  "amount": 2000,
  "currency": "usd",
  "status": "succeeded",
  "created": 1718000000
}
```

**Errors**

| Code | Meaning |
|---|---|
| 400 | Missing required field or invalid value |
| 402 | Payment declined |
| 429 | Rate limit exceeded |
```

### SDK / Library APIs

Document at three levels:
1. **Module/package overview** — what does this module do and when to use it?
2. **Class/type docs** — what is this object? what does it represent?
3. **Method/function docs** — per the docstring guidelines above

For SDK docs, include a full working example per major use case — not just per function.

---

## Architecture Decision Records (ADRs)

ADRs capture *why* a significant technical decision was made. They are worth writing when:
- The decision will be hard to reverse
- Future developers will wonder why this approach was chosen
- You're choosing between multiple reasonable options
- You're departing from a common pattern

### Format

```markdown
# ADR-042: Use PostgreSQL for session storage

**Date:** 2024-06-01
**Status:** Accepted
**Deciders:** @alice, @bob

## Context

We need to store user sessions across multiple API servers. The session store
must support expiry, be readable from all servers, and handle ~10k concurrent
sessions. We evaluated Redis, PostgreSQL, and in-memory approaches.

## Decision

We will use PostgreSQL, reusing the existing database cluster.

## Rationale

- Redis would require a new managed service (~$80/mo) for a non-critical workload
- In-memory sessions don't work across multiple servers
- PostgreSQL supports expiry via a background job and handles our session volume
  with negligible overhead on the existing cluster
- Simpler operational footprint: one fewer service to monitor and back up

## Consequences

- Session reads add ~1ms DB round-trip (acceptable for our SLA)
- We must run the session cleanup job (see `scripts/cleanup_sessions.sh`)
- If session load grows 10x we should revisit Redis

## Alternatives Considered

- **Redis**: Rejected due to cost and operational overhead at our scale
- **JWT (stateless)**: Rejected because we need server-side session revocation
```

---

## Runbooks

A runbook tells an on-call engineer what to do when something goes wrong. It should be usable at 3am by someone who didn't write the code.

### Structure

```markdown
# Runbook: [Alert / Incident name]

## Symptoms

[What does the user / monitoring see? What alert fired?]

## Impact

[Who is affected? Is this customer-facing? What breaks?]

## Quick Diagnosis

[The 2–3 commands or checks to run first to understand the situation]

```bash
# Check error rate
kubectl logs -l app=api --tail=100 | grep ERROR

# Check queue depth
redis-cli llen failed_jobs
```

## Common Causes and Fixes

### Cause 1: Database connection pool exhausted

Signs: `connection pool exhausted` in logs, DB connections at max in Grafana.

Fix:
1. Identify the source: `SELECT client_addr, count(*) FROM pg_stat_activity GROUP BY 1;`
2. If a specific service is the culprit, restart it: `kubectl rollout restart deploy/worker`
3. If it's widespread, reduce concurrency in the config and redeploy

### Cause 2: ...

## Escalation

If the above doesn't resolve in 15 minutes, escalate to @oncall-backend in Slack.

## Post-Incident

- File an incident report in [link]
- Check if a monitoring alert needs tuning
```

---

## CONTRIBUTING Guide

A CONTRIBUTING.md helps new contributors get started without hand-holding.

### Structure

```markdown
# Contributing to [Project]

Thanks for your interest! Here's how to get set up and what to expect.

## Development Setup

[Step-by-step from a clean machine to running tests]

## Project Structure

[Brief tour of the key directories and what they contain]

## How to Make a Change

1. Fork and create a branch: `git checkout -b feat/my-change`
2. Make your change and add tests
3. Run the test suite: `make test`
4. Submit a pull request

## Code Conventions

- [Language/framework style guide]
- [Commit message format — link to or summarize conventions]
- [Test coverage expectations]

## PR Process

- PRs require one approval before merge
- CI must pass
- Squash merge is preferred

## Getting Help

[Slack channel, GitHub Discussions, or other forum]
```

---

## Documentation Review

When reviewing existing documentation, check:

### Coverage
- [ ] Is there a README with quick start?
- [ ] Are all public APIs documented?
- [ ] Are there examples for the most common use cases?
- [ ] Are error messages explained?
- [ ] Is there a CHANGELOG or release notes?

### Accuracy
- [ ] Do the code examples actually run?
- [ ] Are version numbers and config keys up to date?
- [ ] Do links resolve?
- [ ] Is the described behavior consistent with the actual behavior?

### Clarity
- [ ] Is the target audience clear and consistent?
- [ ] Are concepts introduced before they're used?
- [ ] Is jargon defined or avoided?
- [ ] Are steps numbered and in the right order?

### Maintainability
- [ ] Are docs co-located with the code they describe?
- [ ] Is there auto-generated API reference (openapi, docgen)?
- [ ] Is there a process for updating docs alongside code changes?

---

## Language and Style

- **Active voice**: "The function returns a list" not "A list is returned by the function"
- **Present tense**: "The cache stores results" not "The cache will store results"
- **Second person for instructions**: "Run `make test`" not "One should run `make test`"
- **Imperative for steps**: "Install dependencies" not "Installing dependencies"
- **Concrete over abstract**: "retries up to 3 times" not "retries a configurable number of times"
- **Short sentences**: split anything over two clauses
- **One idea per paragraph**
- **Headers over prose** for anything a reader might scan for