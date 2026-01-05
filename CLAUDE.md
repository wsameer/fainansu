# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
pnpm dev              # Run all (API:3001, Web:5174)
pnpm dev:api          # API only
pnpm dev:web          # Web only

# Database (requires: docker compose up -d db)
pnpm db:push          # Apply schema changes
pnpm db:seed          # Seed sample data
pnpm db:studio        # Visual browser (:4983)
pnpm db:generate      # Generate migrations

# Quality
pnpm lint             # ESLint
pnpm check-types      # TypeScript
pnpm format           # Prettier

# Build
pnpm build            # All apps
```

## Architecture

**Monorepo**: Turborepo + pnpm workspaces

```
apps/api          → Hono.js backend (serves static frontend in prod)
apps/web          → React 19 + Vite PWA + TanStack Router
packages/db       → Drizzle ORM schema + migrations
packages/types    → Shared Zod schemas + TypeScript types
packages/ui       → Shadcn/ui components (Tailwind v4 + Radix)
```

### Backend (apps/api)

**Flow**: Route → validate() middleware → Service → Database

```
src/routes/       → Thin handlers, call services
src/services/     → Business logic (singleton exports)
src/middleware/   → validator.ts, error-handler.ts, request-logger.ts
src/lib/          → db.ts, env.ts, errors.ts, logger.ts
```

**Error classes** (in `lib/errors.ts`):
```typescript
throw new NotFoundError("Account not found", "ACCOUNT_NOT_FOUND");
throw new BadRequestError("Invalid input", "VALIDATION_ERROR");
throw new ConflictError("Already exists", "DUPLICATE");
// Also: UnauthorizedError, ForbiddenError, InternalServerError
```

**Validation pattern**:
```typescript
app.post("/", validate("json", InsertAccountSchema), async (c) => {
  const data = c.req.valid("json"); // Type-safe
});
```

### Frontend (apps/web)

**Routing**: TanStack Router file-based in `src/routes/` (auto-generates `routeTree.gen.ts` - never edit)

**Organization**:
- `src/features/` - Feature modules (cashflow, layout, settings, theme)
- `src/components/` - Shared components
- `src/hooks/` - Custom hooks (use-mobile, use-hotkey)
- `src/lib/` - router.tsx, query-client.ts

**Aliases**: `@/` → `src/`, `@workspace/ui` → packages/ui

### Types Flow

```
packages/db/schema.ts     → Drizzle tables + inferred types
packages/types/db.ts      → Zod schemas (InsertAccountSchema, etc.)
packages/types/api.ts     → ApiResponse<T> wrapper
```

Pattern: Zod schema first, infer TypeScript type from it.

## Conventions

### Code Style

```json
// Prettier
{ "semi": true, "trailingComma": "es5", "singleQuote": false, "printWidth": 120 }
```

**Imports** (order):
1. External packages
2. `@workspace/*` packages
3. `@/` local imports

**Naming**:
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Routes: `kebab-case.tsx`
- DB columns: `snake_case`

### Database Patterns

**Soft deletes** - Never hard delete, use `isActive` flag:
```typescript
.set({ isActive: false, updatedAt: new Date() })
// Always filter: .where(eq(accounts.isActive, true))
```

**Money** - Use `numeric(15,2)`, never float. Convert to/from string.

**IDs** - UUID v4 for all tables.

### API Responses

Always use standardized wrapper:
```typescript
return c.json<ApiResponse<T>>({
  success: true,
  data: result,
});
```

## Adding Features

1. **New API route**: Create in `routes/`, add service in `services/`, register in `index.ts`
2. **New page**: Create in `apps/web/src/routes/` - auto-discovered
3. **Schema change**: Edit `packages/db/src/schema.ts`, run `pnpm db:push`
4. **Shared type**: Add Zod schema to `packages/types/src/`, export from index

## Design Philosophy

**Self-hosted, privacy-first** - No auth by design. User data stays local. This is a personal finance OS, not a SaaS.
