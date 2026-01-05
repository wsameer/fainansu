---
description: Create conventional commit with proper scope
argument-hint: [message-hint]
allowed-tools: Bash(git *)
---

Create a conventional commit for this monorepo.

## Context

Current status: !`git status --short`
Current branch: !`git branch --show-current`
Staged diff: !`git diff --staged --stat`

## Instructions

1. Determine **scope** from changed files:
   - `apps/api/` → `api`
   - `apps/web/` → `web`
   - `packages/db/` → `db`
   - `packages/types/` → `types`
   - `packages/ui/` → `ui`
   - Multiple packages → `monorepo`

2. Determine **type**:
   - `feat` - new feature
   - `fix` - bug fix
   - `refactor` - code restructure
   - `chore` - maintenance
   - `docs` - documentation

3. **Format**: `type(scope): message`

4. Stage and commit:
```bash
git add <files>
git commit -m "type(scope): message"
```

User hint: $ARGUMENTS

Keep subject under 72 chars. Use imperative mood ("add" not "added").
