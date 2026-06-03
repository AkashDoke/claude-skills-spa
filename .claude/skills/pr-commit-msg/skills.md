---
name: pr-commit-msg
description: >
  Use this skill whenever the user wants help writing, formatting, or checking git commit
  messages or pull request titles/descriptions. Triggers include: "write a commit message",
  "format my commit", "help me write a PR description", "is this commit message good",
  "conventional commits", "what should I call this commit", "squash message", "write my PR
  title", or when the user pastes a diff and implicitly needs a commit message for it.
  Also trigger when a user asks about commit message conventions, best practices, or wants
  to set up commit linting. Use this skill proactively when the user has just described or
  shown code changes and might benefit from a commit message.
  Do NOT use for general git workflow help unrelated to message formatting.
---

# PR & Commit Message Formatting

Craft clear, consistent commit messages and PR descriptions that make history readable and reviews faster.

## Quick Reference

| Task | Jump to |
|---|---|
| Write a commit message from a diff | Step-by-step below |
| Check if a message follows conventions | Validation checklist |
| Write a PR title + description | PR Description Format section |
| Set up commit conventions for a team | Team Conventions section |

---

## The Conventional Commits Standard

This skill defaults to [Conventional Commits](https://www.conventionalcommits.org/) — the most widely adopted standard. If the user's repo uses a different convention, adapt accordingly.

### Format

```
<type>(<scope>): <short summary>

[optional body]

[optional footer(s)]
```

### Types

| Type | When to use |
|---|---|
| `feat` | A new feature visible to users or consumers of the API |
| `fix` | A bug fix |
| `docs` | Documentation only — no code change |
| `style` | Formatting, whitespace, missing semicolons — no logic change |
| `refactor` | Code restructuring with no behavior change |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `build` | Build system, CI, or dependency changes |
| `chore` | Housekeeping — version bumps, file renames, config tweaks |
| `revert` | Reverting a previous commit |

### Scope (optional)

A noun describing the part of the codebase affected: `auth`, `api`, `ui`, `db`, `cli`, `parser`. Keep it lowercase, one word if possible. Omit if the change is truly global.

### Breaking changes

Add `!` after type/scope and a `BREAKING CHANGE:` footer:

```
feat(api)!: remove deprecated v1 endpoints

BREAKING CHANGE: /v1/users and /v1/posts are removed. Use /v2/ equivalents.
```

---

## Step-by-Step: Writing a Commit Message

### 1. Identify the type

Ask: what is the primary effect of this change?
- Something new users can do → `feat`
- Something broken that now works → `fix`
- Everything else maps to the type table above

When in doubt between `refactor` and `feat`: if a user would notice the change, it's `feat`. If only a developer would notice, it's `refactor`.

### 2. Write the summary line

Rules:
- **50 characters or fewer** (hard limit: 72)
- **Imperative mood** — "add", "fix", "remove", not "added", "fixes", "removed"
- **No period** at the end
- **Lowercase** after the colon
- Complete the sentence: *"If applied, this commit will ___"*

```
✅  feat(auth): add OAuth2 login with Google
✅  fix(cart): prevent duplicate items on rapid click
✅  refactor(api): extract validation into middleware

❌  feat(auth): Added google oauth
❌  fix: Fixed the bug
❌  update stuff
```

### 3. Decide if a body is needed

Skip the body for simple, self-evident changes. Add a body when:
- The **why** isn't obvious from the summary
- There's important context for future readers
- The approach has tradeoffs worth documenting
- It's a revert (explain what broke and why)

Body rules:
- Separate from summary with a **blank line**
- Wrap at **72 characters**
- Explain *why*, not *what* (the diff already shows what)
- Use bullet points for multiple points

```
fix(payments): retry failed charges on network timeout

Previously a network timeout would silently drop the charge attempt.
This caused customer reports of successful orders with no payment.

Now retries up to 3 times with exponential backoff (1s, 2s, 4s).
If all retries fail, the error is surfaced to the user immediately.
```

### 4. Add footers if needed

Common footers:

```
Closes #123
Fixes #456, #789
Related to #321
Co-authored-by: Name <email@example.com>
BREAKING CHANGE: description of the break
Reviewed-by: Name
```

---

## Validation Checklist

Run through this before finalizing:

- [ ] Summary is 72 characters or fewer
- [ ] Summary uses imperative mood ("add" not "added")
- [ ] Type is one of the standard types
- [ ] No trailing period on summary
- [ ] Body (if present) is separated from summary by a blank line
- [ ] Body lines wrap at 72 characters
- [ ] Breaking changes are marked with `!` and have a `BREAKING CHANGE:` footer
- [ ] Issue references are in footers, not the summary
- [ ] No "WIP", "TODO", or debugging language left in

---

## PR Title and Description

### PR Title

The PR title becomes the squash-merge commit message. Write it exactly like a commit summary:

```
feat(checkout): add Apple Pay as payment option
fix(api): handle null user in session refresh
chore(deps): upgrade react to 18.3.1
```

### PR Description Template

```markdown
## What

[1–3 sentences: what does this PR do? What's the user-visible or developer-visible change?]

## Why

[Why is this change needed? What problem does it solve? Link to the issue, ticket, or discussion.]

## How

[Optional — only if the approach is non-obvious or involves tradeoffs worth explaining.]

## Testing

[How was this tested? Unit tests, manual steps, what scenarios were covered?]

## Screenshots / Demo

[Optional — for UI changes, before/after screenshots or a GIF are very helpful for reviewers.]

## Checklist

- [ ] Tests added or updated
- [ ] Documentation updated
- [ ] No debug code or console logs left in
- [ ] Breaking changes documented
```

Adapt the template — not every section applies to every PR. A one-line chore commit doesn't need a "How" section.

---

## Squash Commit Messages

When squashing a multi-commit PR into one commit, write the message fresh — don't concatenate the individual commit messages. The squash message should:

1. Summarize the overall change as if it were written all at once
2. Include the most important context from the PR description body
3. Reference the PR number: `(#123)` at the end of the summary or as a footer

```
feat(notifications): add real-time push notifications (#412)

Uses WebSockets via Socket.io. Falls back to polling every 30s
if WebSocket connection fails. Notification preferences are stored
per-user in the existing user_settings table.

Closes #388
```

---

## Generating a Message from a Diff

When given a diff:

1. **Scan all changed files** — identify the logical units of change
2. **If there's one logical change** → write one commit message
3. **If there are multiple unrelated logical changes** → suggest splitting, then write one message per change
4. **Identify the type** from the nature of the changes
5. **Write the summary** — what capability / fix does this add?
6. **Check: is there a non-obvious "why"?** If yes, write a body

### Detecting multiple logical changes in a diff

Red flags that a diff contains multiple unrelated changes:
- Different files with unrelated purposes both modified
- A bug fix AND a new feature in the same diff
- Refactoring mixed with new behavior
- Config changes mixed with application logic

When you see this, suggest: *"This diff seems to contain two separate changes: X and Y. Consider splitting into two commits. Here's a message for each..."*

---

## Team Conventions Setup

If the user wants to establish commit conventions for a team, suggest:

### Tooling
- **commitlint** + **husky** — lint commit messages on commit (Node projects)
- **commitizen** — interactive commit message builder (`git cz`)
- **conventional-changelog** — auto-generate CHANGELOG from commit history
- **semantic-release** — auto-version and release based on commit types

### `.commitlintrc.json` (minimal)
```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "subject-max-length": [2, "always", 72],
    "body-max-line-length": [2, "always", 72]
  }
}
```

### Documenting conventions
Commit conventions belong in `CONTRIBUTING.md`. Recommend including:
- The type list (with any custom types)
- Scope list (if scopes are restricted to a known set)
- An example of a good message
- A link to the full Conventional Commits spec