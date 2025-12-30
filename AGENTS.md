# AGENTS.md - AI Agent Guide for Fainansu

This document provides AI agents with essential information about the Fainansu financial operating system for effective development, debugging, and enhancement tasks.

## Project Overview

**Fainansu** is a privacy-first, self-hosted financial operating system built as a modern monorepo. It provides personal finance management capabilities with a focus on data privacy and local hosting.

**Core Architecture:**

- **Monorepo**: Turborepo + pnpm workspaces for efficient development
- **Frontend**: React 19 + Vite + TypeScript + PWA (mobile-installable)
- **Backend**: Hono.js (ultra-lightweight, edge-ready) + Node.js
- **Database**: PostgreSQL 16 + Drizzle ORM (type-safe)
- **UI Framework**: Shadcn/ui + Tailwind CSS v4 + Radix UI
- **State Management**: TanStack Router + TanStack Query

## Development Commands

### Build & Lint

```bash
pnpm build              # Build all apps
pnpm build:api          # Build API only
pnpm build:web          # Build web only
pnpm lint               # Run ESLint across all packages
pnpm lint:fix           # Auto-fix linting issues
pnpm format             # Format code with Prettier
pnpm format:check       # Check formatting without changes
pnpm check-types        # TypeScript type checking
```

### Development Servers

```bash
pnpm dev                # Start all apps (API:3001, Web:5173)
pnpm dev:api            # API server only (port 3001)
pnpm dev:web            # Web server only (port 5173)
```

### Database

```bash
pnpm db:push            # Push schema changes to database
pnpm db:generate        # Generate database migrations
pnpm db:studio          # Open Drizzle Studio (localhost:4983)
pnpm db:seed            # Seed database with sample data
```

### Testing

**Note**: Testing framework not yet implemented. When added, expect:

- Unit tests with Vitest
- Integration tests for API endpoints
- Component tests with React Testing Library
- Run single test: `pnpm test -- [test-file-pattern]`

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled for all packages
- **Module resolution**: NodeNext with ES modules
- **Target**: ES2022
- **No unchecked indexed access**: Enabled for safety
- **Verbatim module syntax**: Required for consistency

### ESLint Rules

- **TypeScript**: Recommended rules + strict type checking
- **React**: Recommended rules + hooks validation
- **Prettier integration**: ESLint config compatible with Prettier
- **Turbo**: Warn on undeclared environment variables
- **Warnings only**: All errors converted to warnings for development

### Prettier Formatting

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 120,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true
}
```

### Import Organization

```typescript
// 1. External libraries (React, Hono, etc.)
import { Hono } from "hono";

// 2. Workspace packages
import { Button } from "@workspace/ui/components/button";
import { Account } from "@workspace/types";

// 3. Local imports (relative paths)
import { apiClient } from "@/lib/api";
import { Header } from "@/components/layout";
```

### Naming Conventions

- **Components**: PascalCase (`StatCard.tsx`)
- **Utilities/Functions**: camelCase (`apiClient.ts`)
- **Types/Interfaces**: PascalCase (`AccountType`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS`)
- **Files**: kebab-case for routes (`accounts.tsx`), camelCase for utilities
- **Database**: snake_case for columns, PascalCase for tables

### Error Handling

**Backend (API):**

```typescript
// Custom AppError class with standardized responses
throw new AppError(404, "Account not found", "ACCOUNT_NOT_FOUND");

// Standardized API responses
return c.json<ApiResponse<T>>({
  success: true,
  data: result,
});

// Error responses
return c.json(
  {
    success: false,
    error: {
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      details: validationErrors,
    },
  },
  400
);
```

**Frontend:**

- TanStack Query handles API errors automatically
- Error boundaries for React components
- Toast notifications for user-facing errors

### Validation Patterns

**Zod Schemas for Type Safety:**

```typescript
// Request validation
const InsertAccountSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["CHECKING", "SAVINGS"]),
  balance: z.number().optional(),
});

// API route validation
app.post("/", validate("json", InsertAccountSchema), async (c) => {
  const data = c.req.valid("json"); // Type-safe!
  // ...
});
```

### Database Patterns

**Soft Deletes:**

```typescript
// Never hard delete - use isActive flag
await db.update(accounts)
  .set({ isActive: false, updatedAt: new Date() })
  .where(eq(accounts.id, id));

// Always filter inactive records in queries
.where(eq(accounts.isActive, true))
```

**UUID Primary Keys:**

- All tables use UUID v4 primary keys
- Prevents enumeration attacks
- Distributed system compatible

**Financial Precision:**

- Use `numeric(15,2)` for monetary values
- Never use floating point for money
- Convert to/from strings as needed

### API Architecture

**Route Structure:**

```
GET  /api/accounts       # List accounts
POST /api/accounts       # Create account
GET  /api/accounts/:id   # Get single account
PUT  /api/accounts/:id   # Update account
DEL  /api/accounts/:id   # Soft delete account
```

**Service Layer Pattern:**

```typescript
// Business logic in service classes
export class AccountsService {
  async getById(id: string) {
    const [account] = await db.select().from(accounts).where(eq(accounts.id, id)).limit(1);

    if (!account) {
      throw new AppError(404, "Account not found", "ACCOUNT_NOT_FOUND");
    }

    return account;
  }
}

export const accountsService = new AccountsService();
```

### React Component Patterns

**Shadcn/ui Components:**

```typescript
import { Button } from "@workspace/ui/components/button";

<Button
  variant="default"      // default, outline, ghost, etc.
  size="sm"              // sm, md, lg
  className="additional-styles"
>
  Click me
</Button>
```

**TanStack Query for Data Fetching:**

```typescript
const {
  data: accounts,
  isLoading,
  error,
} = useQuery({
  queryKey: ["accounts"],
  queryFn: () => api.get("/api/accounts"),
});

// Mutations with optimistic updates
const createAccount = useMutation({
  mutationFn: (data) => api.post("/api/accounts", data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  },
});
```

### File Structure Conventions

**API (`apps/api/`):**

```
src/
├── lib/          # Database, logger, errors
├── middleware/   # Request middleware (validation, CORS)
├── routes/       # API route handlers
├── services/     # Business logic layer
└── index.ts      # Server entry point
```

**Web (`apps/web/`):**

```
src/
├── app/          # App setup, loaders
├── components/   # React components
├── features/     # Feature-specific code
├── hooks/        # Custom React hooks
├── lib/          # Utilities, router config
├── routes/       # TanStack Router pages
└── constants/    # App constants
```

**Packages:**

- `packages/db/` - Drizzle ORM schemas and migrations
- `packages/types/` - Shared TypeScript types and Zod schemas
- `packages/ui/` - Shadcn/ui components and styling

## Essential Development Workflow

### Before Committing

```bash
pnpm lint              # Ensure no linting errors
pnpm check-types       # Verify TypeScript compilation
pnpm format:check      # Check code formatting
pnpm build             # Ensure production build works
```

### Database Changes

```bash
# After schema changes in packages/db/src/schema.ts
pnpm db:generate       # Generate migration files
pnpm db:push           # Apply to development database
pnpm db:seed           # Add sample data if needed
```

### Adding New Features

1. **API**: Create route → service → update types
2. **UI**: Create component → add to route → update queries
3. **Database**: Update schema → generate migration → push changes
4. **Types**: Update Zod schemas → ensure type safety

## Security Best Practices

- **Input Validation**: All external data validated with Zod
- **SQL Injection**: Prevented by Drizzle ORM parameterized queries
- **XSS Protection**: React's automatic escaping + Content Security Policy
- **Secrets**: Never commit environment variables or API keys
- **CORS**: Configured appropriately for production

## Performance Guidelines

- **Bundle Splitting**: Automatic with TanStack Router
- **Database Queries**: Use selective column selection
- **React**: Memoize expensive components with `React.memo`
- **Images**: Optimize with PWA asset generation
- **Caching**: TanStack Query for client-side caching

---

This guide should be updated when new patterns emerge or testing frameworks are added. For questions about specific implementations, refer to existing code in the respective directories.</content>
<parameter name="filePath">/Users/wsameer/Work/fainansu/AGENTS.md
