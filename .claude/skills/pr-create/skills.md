---
name: pr-create
description: >
  Use this skill whenever the user wants to create a pull request, create a new branch from
  an existing branch, or set up a feature branch tied to a ticket or issue number. Triggers
  include: "create a PR", "open a PR", "make a pull request", "create a branch for this ticket",
  "create a branch from main", "branch off of X and make a PR", "set up a branch for JIRA-123",
  "create a PR for my changes", "push my branch and open a PR", or any time the user mentions
  a ticket number (JIRA, Linear, GitHub issue, etc.) alongside branching or PR creation.
  Also trigger when the user asks how to name a branch, what base branch to use, or how to
  structure the PR creation workflow end-to-end.
  Use this skill proactively when the user has described finished work and hasn't yet pushed
  or opened a PR.
  Do NOT use for reviewing an existing PR (use pr-review), writing commit messages
  (use pr-commit-msg), or general git help unrelated to branch/PR creation.
---

# PR Creation — Branch from Branch with Ticket Number

End-to-end workflow: identify your source branch, create a ticket-named branch, push it, and open a PR.

## Quick Reference

| Task | Jump to |
|---|---|
| Full workflow from scratch | Step-by-step below |
| Branch naming conventions | Branch Naming section |
| Pre-flight checks before branching | Pre-flight Checklist |
| Push and open PR via CLI | Opening the PR section |
| GitHub CLI vs manual URL | Opening the PR section |
| Troubleshooting | Troubleshooting section |

---

## Step 1 — Identify the Source Branch

Before creating anything, confirm which branch to branch *from*.

```bash
# See your current branch
git branch --show-current

# See all local branches
git branch

# See all branches including remote
git branch -a

# See recent branches (useful when you have many)
git branch --sort=-committerdate | head -10
```

**Which branch to use as source:**

| Situation | Branch from |
|---|---|
| Standard feature work | `main` or `develop` (check your team's convention) |
| Building on another feature branch | That feature branch directly |
| Hotfix | The release branch or `main` |
| Sub-task of a larger ticket | The parent ticket's branch |

If unsure, ask: *"Should this work be mergeable independently, or does it depend on another in-progress branch?"* If it depends on another branch, branch from that one.

---

## Step 2 — Sync the Source Branch

Always pull before branching to avoid diverging immediately.

```bash
# Switch to the source branch and pull latest
git checkout main          # or develop, or the feature branch
git pull origin main       # pull latest from remote

# If you have local uncommitted work on another branch, stash first
git stash
git checkout main
git pull origin main
```

If the source branch has conflicts with remote, resolve them before branching — otherwise your new branch inherits the divergence.

---

## Step 3 — Create the Ticket Branch

### Branch Naming

Standard format:

```
<type>/<ticket-id>-<short-description>
```

Examples:

```
feat/PROJ-123-add-oauth-login
fix/PROJ-456-null-pointer-on-logout
chore/PROJ-789-upgrade-react-18
refactor/PROJ-321-extract-auth-middleware
```

**Rules:**
- All lowercase
- Hyphens only — no spaces, underscores are acceptable but hyphens preferred
- Ticket ID first after the type prefix — makes branch lists scannable
- Short description: 3–5 words, imperative ("add-oauth" not "adding-oauth")
- No trailing hyphens or slashes

**Type prefixes** (match your commit message types):

| Prefix | When to use |
|---|---|
| `feat/` | New feature or capability |
| `fix/` | Bug fix |
| `chore/` | Maintenance, deps, config |
| `refactor/` | Restructuring without behavior change |
| `docs/` | Documentation only |
| `test/` | Tests only |
| `hotfix/` | Urgent production fix |

### Create and Switch

```bash
# Create branch from current HEAD and switch to it
git checkout -b feat/PROJ-123-add-oauth-login

# Or explicitly from a specific source branch (safer — avoids surprises)
git checkout -b feat/PROJ-123-add-oauth-login origin/main

# Git 2.23+ alternative
git switch -c feat/PROJ-123-add-oauth-login origin/main
```

Confirm you're on the right branch and at the right commit:

```bash
git branch --show-current
git log --oneline -5     # should show the tip of your source branch
```

---

## Step 4 — Do Your Work and Commit

Make your changes, stage, and commit. Follow commit message conventions (see pr-commit-msg skill if needed).

```bash
# Stage changes
git add .                          # all changes
git add src/auth/oauth.py          # specific file

# Commit
git commit -m "feat(auth): add OAuth2 login with Google"

# Check status at any point
git status
git log --oneline -5
```

---

## Step 5 — Push the Branch

```bash
# Push and set upstream tracking in one command
git push -u origin feat/PROJ-123-add-oauth-login

# After the first push, subsequent pushes are just:
git push
```

If the branch already exists on remote and you need to force-push (e.g. after a rebase):

```bash
git push --force-with-lease    # safer than --force: fails if remote has commits you don't have
```

---

## Step 6 — Open the PR

### GitHub CLI (recommended)

```bash
# Install if needed: https://cli.github.com
gh pr create \
  --base main \
  --head feat/PROJ-123-add-oauth-login \
  --title "feat(auth): add OAuth2 login with Google" \
  --body "## What
Adds Google OAuth2 as a login option.

## Why
Closes PROJ-123. Users requested SSO via Google.

## Testing
- Tested locally with a Google dev app
- Unit tests added for token validation
"
```

Useful `gh pr` flags:

| Flag | Purpose |
|---|---|
| `--draft` | Open as draft PR (not ready for review) |
| `--reviewer alice,bob` | Request reviewers immediately |
| `--label "needs-review"` | Add a label |
| `--assignee @me` | Assign to yourself |
| `--web` | Open the PR form in browser instead |

### Manual (browser)

After pushing, GitHub shows a banner: *"Your recently pushed branch — Compare & pull request"*. Click it.

Or navigate directly:

```
https://github.com/<org>/<repo>/compare/main...feat/PROJ-123-add-oauth-login
```

### GitLab

```bash
# Push with MR creation flag
git push origin feat/PROJ-123-add-oauth-login \
  -o merge_request.create \
  -o merge_request.target=main \
  -o merge_request.title="feat(auth): add OAuth2 login with Google" \
  -o merge_request.draft
```

---

## Pre-flight Checklist

Run through this before pushing and opening the PR.

- [ ] Branch name includes the ticket ID
- [ ] Branched from the correct source (not a stale local copy)
- [ ] All intended commits are on this branch: `git log origin/main..HEAD --oneline`
- [ ] No unintended files staged: `git diff origin/main --name-only`
- [ ] No debug code, console logs, or `.only` in tests
- [ ] Tests pass locally: run your test command
- [ ] PR title follows commit message conventions
- [ ] PR description explains *what* and *why* (not just *what*)
- [ ] Base branch is correct (not accidentally targeting a feature branch)

---

## PR Description Template

```markdown
## What

[1–3 sentences: what does this PR do?]

## Why

Closes PROJ-123.
[Why is this needed? What problem does it solve?]

## How

[Optional — only for non-obvious implementation choices or tradeoffs]

## Testing

[How was this tested? Steps to verify manually if needed]

## Screenshots

[For UI changes — before/after]

## Checklist

- [ ] Tests added or updated
- [ ] No debug code left in
- [ ] Documentation updated if needed
```

---

## Keeping Your Branch Up to Date

If `main` moves forward while you're working on your branch:

```bash
# Option 1: Rebase (cleaner history, preferred for feature branches)
git fetch origin
git rebase origin/main

# Option 2: Merge (preserves exact history)
git fetch origin
git merge origin/main
```

After rebasing, force-push is required:

```bash
git push --force-with-lease
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `fatal: A branch named X already exists` | Branch already created locally | `git checkout X` to switch to it |
| `rejected — non-fast-forward` on push | Remote branch has commits you don't have | `git pull --rebase` then push again |
| PR base branch is wrong | Branched from a feature branch accidentally | Change base in GitHub UI, or `git rebase --onto main <old-base>` |
| Commits from source branch appearing in PR | Branched from a non-updated local copy | Rebase onto `origin/main` |
| `--force-with-lease` rejected | Someone else pushed to your branch | `git fetch` and inspect before forcing |
| Accidentally committed to `main` | Forgot to create branch first | `git branch feat/PROJ-123 && git reset --hard origin/main` |

---

## Special Cases

### Branching from another feature branch

When your work depends on `feat/PROJ-100`:

```bash
git checkout -b feat/PROJ-123-add-oauth-login origin/feat/PROJ-100
```

Set the PR base to `feat/PROJ-100`, not `main`. When `feat/PROJ-100` merges, update your PR base to `main`. GitHub does this automatically if `feat/PROJ-100` is merged before your PR.

### Multiple commits to squash before PR

```bash
# Interactive rebase to clean up last N commits
git rebase -i HEAD~4
# Mark all but the first as 'squash' or 'fixup'
```

### Draft PR for early feedback

Open with `--draft` flag or mark as draft in GitHub UI. Signals: *"I want eyes on the approach, not a merge-ready review."* Convert to ready when done.

### Hotfix straight to production branch

```bash
git checkout -b hotfix/PROJ-999-fix-payment-crash origin/release/v2.3
# fix, commit, push
git push -u origin hotfix/PROJ-999-fix-payment-crash
# Open PR targeting the release branch, not main
```