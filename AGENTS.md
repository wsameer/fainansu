# AGENTS.md - AI Agent Guide for Fainansu

This document provides AI agents with essential information about the Fainansu financial operating system for effective development, debugging, and enhancement tasks.

## Project Overview

**Fainansu** is a privacy-first, self-hosted financial operating system built as a modern monorepo. It provides personal finance management capabilities with a focus on data privacy and local hosting.

### Core Architecture

- **Monorepo**: Turborepo + pnpm workspaces for efficient development
- **Frontend**: React 19 + Vite + TypeScript + PWA (mobile-installable)
- **Backend**: Hono.js (ultra-lightweight, edge-ready) + Node.js
- **Database**: PostgreSQL 16 + Drizzle ORM (type-safe)
- **UI Framework**: Shadcn/ui + Tailwind CSS v4 + Radix UI
- **State Management**: TanStack Router + TanStack Query
- **Validation**: Zod (runtime type safety)
- **Deployment**: Docker + Docker Compose (single container)

### Key Design Principles

✅ **Type-Safe**: End-to-end TypeScript with shared types  
✅ **Privacy-First**: Self-hosted, no data sharing with third parties  
✅ **PWA-Ready**: Installable on iOS/Android as native app  
✅ **Lightweight**: Minimal dependencies, fast startup  
✅ **Production-Ready**: Docker, health checks, structured logging

---

## Monorepo Structure

```
fainansu/
├── apps/
│   ├── api/                 # Hono.js backend (port 3001)
│   │   ├── src/
│   │   │   ├── lib/         # Utilities (logger, env, db)
│   │   │   ├── middleware/  # Request middleware
│   │   │   ├── routes/      # API routes (/api/*)
│   │   │   └── index.ts     # Entry point + static file serving
│   │   └── package.json
│   └── web/                 # React PWA frontend (dev: 5173)
│       ├── src/
│       │   ├── app/         # App setup
│       │   ├── components/  # React components
│       │   ├── features/    # Feature modules
│       │   ├── hooks/       # Custom hooks
│       │   ├── lib/         # Utilities (query client, router)
│       │   └── routes/      # TanStack Router pages
│       ├── vite.config.ts   # PWA + Tailwind config
│       └── package.json
├── packages/
│   ├── db/                  # Drizzle ORM + schemas
│   │   ├── src/
│   │   │   ├── schema.ts    # Database tables + relations
│   │   │   └── seed.ts      # Sample data generation
│   │   └── drizzle.config.ts
│   ├── types/               # Shared TypeScript + Zod schemas
│   │   └── src/
│   │       ├── api.ts       # API request/response types
│   │       ├── db.ts        # Database validation schemas
│   │       └── env.ts       # Environment variable validation
│   ├── ui/                  # Shared React components (Shadcn/ui)
│   │   └── src/
│   │       ├── components/  # UI components (button, card, etc.)
│   │       ├── hooks/       # React hooks
│   │       ├── lib/         # Utilities (cn, utils)
│   │       └── styles/      # Global CSS + Tailwind
│   ├── eslint-config/       # Shared ESLint configs
│   └── typescript-config/   # Shared TS configs
├── docs/                    # Documentation
├── .env.example             # Environment template
├── compose.yaml             # Docker Compose configuration
├── Dockerfile               # Multi-stage production build
└── turbo.json              # Turborepo tasks
```

---

## Technology Stack Deep Dive

### Frontend (apps/web)

**Core Technologies:**

- **React 19**: Latest with concurrent features
- **Vite 7**: Ultra-fast build tool + HMR
- **TypeScript 5.9**: Strict type checking
- **Tailwind CSS v4**: Utility-first styling with Vite plugin
- **PWA**: Service worker + manifest for mobile installation

**Key Libraries:**

- **TanStack Router v1.132**: File-based routing with type safety
- **TanStack Query v5.90**: Server state management + caching
- **Shadcn/ui**: Component library built on Radix UI
- **Lucide React**: Icon library
- **React Helmet Async**: Head management for SEO

**Development Tools:**

- **ESLint 9**: Code linting with React plugin
- **TypeScript ESLint**: Type-aware linting
- **Vite PWA Plugin**: PWA configuration + asset generation

### Backend (apps/api)

**Core Technologies:**

- **Hono.js v4.11**: Ultra-lightweight web framework
- **Node.js 24**: Runtime environment
- **TypeScript**: Compiled with tsx for development

**Key Libraries:**

- **@hono/node-server**: Node.js adapter for Hono
- **Drizzle ORM**: Type-safe database operations
- **Zod**: Runtime validation + type inference
- **Pino**: Structured JSON logging
- **CORS**: Cross-origin resource sharing

**Architecture:**

- Serves static files in production (single container)
- API routes under `/api/*` prefix
- Health check endpoint at `/api/health`
- Structured middleware (logging, error handling, validation)

### Database (packages/db)

**Core Technologies:**

- **PostgreSQL 16**: Primary database
- **Drizzle ORM v0.45**: Type-safe ORM with excellent TypeScript support
- **Drizzle Kit**: Migration generation + management

**Schema Design:**

```typescript
// Core tables with UUID primary keys
- categories: Hierarchical income/expense categories
- accounts: Financial accounts (checking, savings, credit cards)
- transactions: All financial transactions + transfers

// Key features
- UUID primary keys (security + distributed compatibility)
- Soft deletes (isActive flag) for data preservation
- Hierarchical categories (parent-child relationships)
- Precision decimal handling (numeric(15,2))
- Array support for tags
- Full audit trails (createdAt, updatedAt)
```

### UI Components (packages/ui)

**Design System:**

- **Shadcn/ui**: Modern component library
- **Radix UI**: Accessible primitive components
- **Tailwind CSS**: Utility-first styling
- **Class Variance Authority (CVA)**: Variant management
- **Lucide React**: Consistent iconography

**Component Structure:**

- 30+ pre-built components (button, card, dialog, etc.)
- Consistent API with `className` prop support
- Dark/light theme support via CSS variables
- Full TypeScript support with proper generics

---

## Development Workflow

### Environment Setup

**Prerequisites:**

- Node.js >= 20
- pnpm >= 10.4.1
- Docker & Docker Compose (for database)

**Quick Start:**

```bash
# Clone and install dependencies
git clone <repo>
cd fainansu
pnpm install

# Set up environment
cp .env.example .env

# Start database + seed data
docker compose up -d db
pnpm db:push
pnpm db:seed

# Start development servers
pnpm dev  # Runs both API (3001) and Web (5173)
```

### Available Scripts

**Development:**

```bash
pnpm dev              # Start all apps with hot reload
pnpm dev:api          # API only (port 3001)
pnpm dev:web          # Web only (port 5173)
```

**Building:**

```bash
pnpm build            # Build all apps
pnpm build:api        # Build API only
pnpm build:web        # Build Web only
```

**Database:**

```bash
pnpm db:generate      # Generate migrations from schema
pnpm db:push          # Push schema to database (dev)
pnpm db:studio        # Open Drizzle Studio (localhost:4983)
pnpm db:seed          # Seed with sample data
```

**Code Quality:**

```bash
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Format with Prettier
pnpm check-types      # TypeScript type checking
```

**Docker (Production):**

```bash
pnpm docker:build     # Build Docker image
pnpm docker:up        # Start all services (app + db)
pnpm docker:down      # Stop services
pnpm docker:logs      # View logs
pnpm docker:clean     # Remove containers + volumes
```

### Turborepo Configuration

**Task Dependencies:**

- `build` tasks depend on `^build` (build packages first)
- `lint` tasks depend on `^build` (ensure built)
- `dev` tasks have no cache (persistent)
- Database tasks have no cache (stateful)

**Environment Variables:**

- `NODE_ENV`, `DATABASE_URL`, `DIRECT_URL` for build tasks
- `PORT`, `DATABASE_URL` for dev tasks

---

## Database Schema & Patterns

### Core Tables

**Categories:**

```typescript
{
  id: uuid,              // Primary key
  name: string(100),      // Category name
  type: 'INCOME'|'EXPENSE', // Category type
  color?: string(7),      // Hex color for UI
  icon?: string(50),      // Icon name/emoji
  parentId?: uuid,        // Self-referencing for hierarchy
  sortOrder: integer,     // UI ordering
  isActive: boolean,      // Soft delete
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Accounts:**

```typescript
{
  id: uuid,
  name: string(100),
  type: 'CHECKING'|'SAVINGS'|'CREDIT_CARD'|'INVESTMENT'|'CASH'|'LOAN'|'OTHER',
  balance: numeric(15,2), // Precision decimal
  currency: string(3),     // ISO currency code
  color?: string(7),
  icon?: string(50),
  isActive: boolean,
  notes?: text,
  sortOrder: integer,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Transactions:**

```typescript
{
  id: uuid,
  accountId: uuid,        // Foreign key (required)
  categoryId?: uuid,      // Foreign key (optional)
  type: 'INCOME'|'EXPENSE'|'TRANSFER',
  amount: numeric(15,2),
  description: string(200),
  notes?: text,
  date: timestamp,        // Transaction date
  toAccountId?: uuid,     // For transfers
  tags: text[],           // Array of strings
  receiptUrl?: text,      // Receipt attachment
  isReconciled: boolean,  // Bank reconciliation
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Type Safety Patterns

**Schema Types (Drizzle):**

```typescript
// In packages/db/src/schema.ts
export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;
```

**Validation Types (Zod):**

```typescript
// In packages/types/src/db.ts
export const CategorySchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(["INCOME", "EXPENSE"]),
  // ... validation rules
});
export type CategoryType = z.infer<typeof CategorySchema>;
```

**API Integration:**

```typescript
// In API routes
import { InsertCategorySchema } from "@workspace/types";
const data = InsertCategorySchema.parse(req.body);
const [category] = await db.insert(categories).values(data).returning();
```

### Database Patterns

**Soft Deletes:**

- Use `isActive: boolean` instead of hard deletes
- Preserves historical data and audit trails
- Filter queries with `eq(categories.isActive, true)`

**Hierarchical Data:**

- Categories support parent-child relationships
- Use self-referencing foreign keys
- Query with recursive CTEs for full trees

**Precision Decimals:**

- Always use `numeric(15,2)` for financial amounts
- Never use floating point for money
- Handle currency conversion at application layer

**UUID Primary Keys:**

- Security (no sequential ID guessing)
- Distributed system compatibility
- Easy data migration between environments

---

## API Architecture & Patterns

### Route Structure

**Base URL:** `http://localhost:3001/api`

**Current Endpoints:**

```
GET  /api/health           # Health check
GET  /api                  # API info
GET  /api/categories       # List categories
POST /api/categories       # Create category
PUT  /api/categories/:id   # Update category
DEL  /api/categories/:id   # Delete category (soft)
GET  /api/accounts         # List accounts
POST /api/accounts         # Create account
PUT  /api/accounts/:id     # Update account
DEL  /api/accounts/:id     # Delete account (soft)
```

### Middleware Stack

**Request Pipeline:**

1. **Request Logger**: Structured logging with Pino
2. **CORS**: Cross-origin handling (configurable origins)
3. **Route Handler**: Business logic
4. **Error Handler**: Standardized error responses

**Error Response Format:**

```typescript
{
  success: false,
  error: {
    message: string,
    code: string,
    details?: any  // Validation errors
  }
}
```

### Validation Patterns

**Request Validation:**

```typescript
// In route handlers
import { InsertAccountSchema } from "@workspace/types";
const data = InsertAccountSchema.parse(await req.json());
```

**Response Validation:**

```typescript
// Type-safe responses
import { AccountSchema } from "@workspace/types";
const accounts = await db.select().from(accountsTable);
return c.json({ data: AccountSchema.array().parse(accounts) });
```

### Database Operations

**Connection Management:**

```typescript
// In apps/api/src/lib/db.ts
export { db } from "@workspace/db";
// Single connection pool, auto-managed
```

**Query Patterns:**

```typescript
// Type-safe queries with Drizzle
import { accounts, eq } from "@workspace/db";
const result = await db.select().from(accounts).where(eq(accounts.id, id));
```

**Transaction Support:**

```typescript
await db.transaction(async (tx) => {
  await tx.insert(transactions).values(transaction);
  await tx.update(accounts).set({
    balance: sql`${accounts.balance} - ${transaction.amount}`,
  });
});
```

---

## Frontend Architecture & Patterns

### Routing (TanStack Router)

**File-Based Routing:**

```
src/routes/
├── __root.tsx          # Root layout + context
├── index.tsx           # Home page
├── accounts.tsx        # Accounts page
├── categories.tsx      # Categories page
├── transactions.tsx    # Transactions page
├── settings.tsx        # Settings page
└── 404.tsx            # Not found page
```

**Route Context:**

```typescript
interface RouterContext {
  queryClient: QueryClient; // TanStack Query instance
}
```

**Navigation Patterns:**

```typescript
// Type-safe navigation
import { Link } from '@tanstack/react-router';
<Link to="/accounts" params={{ id: '123' }}>
  Account Details
</Link>
```

### State Management (TanStack Query)

**Query Keys:**

```typescript
// Standardized query keys
export const queryKeys = {
  accounts: ["accounts"] as const,
  categories: ["categories"] as const,
  transactions: ["transactions"] as const,
  account: (id: string) => ["accounts", id] as const,
} as const;
```

**Query Patterns:**

```typescript
// Data fetching
const { data: accounts, isLoading } = useQuery({
  queryKey: queryKeys.accounts,
  queryFn: () => api.get("/api/accounts"),
});

// Mutations
const createAccount = useMutation({
  mutationFn: (data) => api.post("/api/accounts", data),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.accounts });
  },
});
```

### Component Architecture

**Layout Structure:**

```typescript
// In __root.tsx
<LayoutProvider>
  <SidebarProvider>
    <SidebarLeft />        // Navigation sidebar
    <SidebarInset>
      <Header />           // Top header
      <Outlet />           // Page content
    </SidebarInset>
    <AppBottomBar />       // Mobile navigation
    <SidebarRight />       // Utility sidebar
  </SidebarProvider>
</LayoutProvider>
```

**Component Patterns:**

- **Shared Components**: In `packages/ui`
- **Feature Components**: In `apps/web/src/components`
- **Layout Components**: In `apps/web/src/components/layout`
- **Page Components**: In route files

### Styling (Tailwind CSS v4)

**Configuration:**

```typescript
// In vite.config.ts
tailwindcss(),  // Vite plugin integration
```

**Theme System:**

- CSS variables for colors/shadows
- Dark/light theme support
- Consistent spacing scale
- Responsive breakpoints

**Component Styling:**

```typescript
// Using cn() utility for conditional classes
import { cn } from "@workspace/ui/lib/utils";
const className = cn("base-styles", isActive && "active-styles", className);
```

---

## UI Components (Shadcn/ui)

### Component Library

**Available Components:**

- **Form**: input, textarea, select, checkbox, radio
- **Layout**: card, sheet, sidebar, separator
- **Feedback**: alert, dialog, toast (sonner), skeleton
- **Navigation**: breadcrumb, tabs, dropdown-menu
- **Display**: avatar, badge, calendar, empty
- **Interactive**: button, switch, toggle, tooltip

### Usage Patterns

**Component Import:**

```typescript
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
```

**Consistent API:**

```typescript
<Button
  variant="default"
  size="sm"
  className="additional-classes"
>
  Click me
</Button>
```

**Variant System:**

```typescript
// Using Class Variance Authority (CVA)
const buttonVariants = cva(baseStyles, {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { sm: "...", md: "...", lg: "..." },
  },
});
```

### Customization

**Theme Customization:**

- Edit CSS variables in `packages/ui/src/styles/globals.css`
- Modify component variants directly
- Extend with new components following same patterns

**Component Extension:**

```typescript
// Compose components for complex UI
import { Card, CardHeader, CardContent } from "@workspace/ui/components/card";
```

---

## Development Patterns & Best Practices

### Code Organization

**File Naming:**

- **Components**: PascalCase (e.g., `StatCard.tsx`)
- **Utilities**: camelCase (e.g., `apiClient.ts`)
- **Types**: camelCase with suffix (e.g., `accountTypes.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

**Import Organization:**

```typescript
// 1. External libraries
import { useState } from "react";
import { Hono } from "hono";

// 2. Workspace packages
import { Button } from "@workspace/ui/components/button";
import { Account } from "@workspace/types";

// 3. Local imports
import { apiClient } from "@/lib/api";
import { Header } from "@/components/layout";
```

### Type Safety

**Shared Types:**

- Database types in `packages/types/src/db.ts`
- API types in `packages/types/src/api.ts`
- Environment types in `packages/types/src/env.ts`

**Runtime Validation:**

- Zod schemas for all external data
- API request/response validation
- Environment variable validation

**Generic Patterns:**

```typescript
// API client with generics
const api = {
  get: <T>(url: string) => fetch<T>(url),
  post: <T>(url: string, data: unknown) => fetch<T>(url, data),
};
```

### Error Handling

**Backend Errors:**

```typescript
// Standardized error responses
app.onError((err, c) => {
  logger.error({ err }, "Request failed");
  return c.json(
    {
      success: false,
      error: {
        message: err.message,
        code: "INTERNAL_ERROR",
      },
    },
    500
  );
});
```

**Frontend Errors:**

```typescript
// Error boundaries for React components
// Toast notifications for API errors
// Query error handling in TanStack Query
```

### Performance Patterns

**Database Optimization:**

- Proper indexes on foreign keys
- Selective column queries
- Connection pooling

**Frontend Optimization:**

- Code splitting with TanStack Router
- Image optimization with PWA assets
- Lazy loading for heavy components

**Build Optimization:**

- Turborepo caching for faster builds
- Docker multi-stage builds
- Tree shaking for minimal bundles

---

## Testing Strategy

### Current State

**Testing Framework**: Not yet implemented
**Planned Testing**:

- Unit tests with Vitest
- Integration tests for API
- E2E tests with Playwright
- Component testing with React Testing Library

### Testing Patterns (When Implemented)

**Database Tests:**

```typescript
// Test with transaction rollback
await db.transaction(async (tx) => {
  // Test operations
  await tx.insert(accounts).values(testData);
  // Auto-rollback on test completion
});
```

**API Tests:**

```typescript
// Integration tests with Hono test client
app.test("POST /api/accounts", async (assert) => {
  const res = await app.request("/api/accounts", {
    method: "POST",
    body: JSON.stringify(testData),
  });
  assert.equal(res.status, 201);
});
```

**Component Tests:**

```typescript
// React Testing Library
import { render, screen } from '@testing-library/react';
import { Button } from '@workspace/ui/components/button';

test('button renders correctly', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

---

## Deployment & Production

### Docker Architecture

**Multi-Stage Build:**

1. **Base**: Node.js + pnpm setup
2. **Pruner**: Extract workspace files with Turbo
3. **Installer**: Dependencies + build
4. **Runner**: Production runtime (minimal)

**Single Container Pattern:**

- API serves static files in production
- No reverse proxy needed
- Health checks built-in
- Graceful shutdown support

### Environment Configuration

**Development:**

```bash
# .env.example
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/fainansu
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**Production:**

```bash
# .env.production
DATABASE_URL=postgresql://user:pass@db:5432/fainansu
NODE_ENV=production
LOG_LEVEL=info
```

### Production Deployment

**Docker Compose:**

```bash
# Full stack deployment
pnpm docker:up        # Starts app + database
pnpm docker:logs      # View logs
pnpm docker:down      # Stop services
```

**Database Setup:**

```bash
# First-time setup
docker exec -it fainansu-app sh
pnpm db:push
pnpm db:seed
exit
```

### PWA Deployment

**Mobile Installation:**

- Build: `pnpm docker:up`
- Access: `http://your-server:3001`
- Install: Share → Add to Home Screen (iOS)
- Works offline with service worker

**PWA Features:**

- Installable on iOS/Android
- Offline support
- App-like experience
- Background sync (Android)

---

## Security Considerations

### Current Security Measures

**Database Security:**

- UUID primary keys (prevent enumeration)
- Input validation with Zod
- SQL injection prevention via Drizzle ORM

**API Security:**

- CORS configuration
- Request validation
- Error information sanitization

**Deployment Security:**

- Non-root user in Docker
- Environment variable separation
- Health checks for monitoring

### Recommended Enhancements

**Authentication:**

- JWT-based auth system
- Session management
- Password hashing with bcrypt

**API Security:**

- Rate limiting
- Request size limits
- HTTPS enforcement

**Data Protection:**

- Database encryption
- Backup encryption
- Audit logging

---

## Performance Optimization

### Database Performance

**Indexing Strategy:**

- Primary keys on UUID columns
- Foreign key indexes
- Composite indexes for common queries

**Query Optimization:**

- Selective column queries
- Proper join patterns
- Connection pooling

### Frontend Performance

**Bundle Optimization:**

- Code splitting by routes
- Dynamic imports for heavy components
- Tree shaking for unused code

**Runtime Performance:**

- React.memo for expensive components
- TanStack Query caching
- Virtual scrolling for long lists

### Deployment Performance

**Docker Optimization:**

- Multi-stage builds
- Layer caching
- Minimal production image

**CDN Considerations:**

- Static asset optimization
- PWA asset generation
- Service worker caching

---

## Troubleshooting Guide

### Common Issues

**Database Connection:**

```bash
# Check PostgreSQL status
docker compose ps db
docker compose logs db

# Reset database (development)
docker compose down -v
docker compose up -d db
pnpm db:push
```

**Build Failures:**

```bash
# Clear Turborepo cache
pnpm clean
pnpm install
pnpm build
```

**PWA Installation Issues:**

- Ensure HTTPS in production
- Check PWA manifest loading
- Verify service worker registration

### Debugging Tools

**Development:**

- React DevTools
- TanStack Router DevTools
- TanStack Query DevTools
- Drizzle Studio (database)

**Production:**

- Docker logs: `pnpm docker:logs`
- Health checks: `/api/health`
- Database monitoring

### Performance Debugging

**Database:**

- Query analysis with EXPLAIN
- Connection pool monitoring
- Index usage analysis

**Frontend:**

- Bundle analysis with Vite
- React Profiler
- Network tab for API calls

---

## Contributing Guidelines

### Code Standards

**TypeScript:**

- Strict mode enabled
- No implicit any
- Proper type exports
- Generic patterns for reusability

**ESLint:**

- Follow workspace config
- Max warnings: 0
- Auto-fix on save

**Prettier:**

- Consistent formatting
- 2-space indentation
- Trailing commas

### Git Workflow

**Branch Naming:**

- `feature/description`
- `fix/description`
- `chore/description`

**Commit Messages:**

- Conventional Commits format
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`

### Pull Request Process

**Requirements:**

- All tests passing
- Type checking successful
- Linting clean
- Documentation updated

**Review Checklist:**

- Type safety maintained
- Performance considered
- Security implications
- Documentation accuracy

---

## Future Roadmap

### Planned Features

**Core Functionality:**

- [ ] Transaction CRUD operations
- [ ] Account management UI
- [ ] Category management
- [ ] Transfer operations
- [ ] Balance calculations

**Advanced Features:**

- [ ] Budget tracking
- [ ] Financial reports
- [ ] Data import/export
- [ ] Reconciliation tools
- [ ] Multi-currency support

**Technical Enhancements:**

- [ ] Authentication system
- [ ] API rate limiting
- [ ] Background jobs
- [ ] Data backup automation
- [ ] Performance monitoring

### Technology Upgrades

**Potential Upgrades:**

- React Server Components (when stable)
- Next.js App Router (if needed)
- Advanced PWA features
- Real-time updates with WebSockets

**Infrastructure:**

- CI/CD pipeline
- Automated testing
- Performance monitoring
- Security scanning

---

## Quick Reference

### Essential Commands

```bash
# Development
pnpm dev              # Start all services
pnpm db:studio        # Database GUI
pnpm docker:up        # Production deployment

# Code Quality
pnpm lint             # Check code quality
pnpm format           # Fix formatting
pnpm check-types      # Type checking

# Database
pnpm db:push          # Apply schema changes
pnpm db:seed          # Add sample data
pnpm db:generate      # Create migrations
```

### Key Files

**Configuration:**

- `turbo.json` - Build tasks
- `package.json` - Dependencies
- `compose.yaml` - Docker services
- `vite.config.ts` - Frontend build

**Database:**

- `packages/db/src/schema.ts` - Database schema
- `packages/db/src/seed.ts` - Sample data
- `packages/types/src/db.ts` - Validation schemas

**API:**

- `apps/api/src/index.ts` - Server setup
- `apps/api/src/routes/` - API endpoints
- `apps/api/src/middleware/` - Request processing

**Frontend:**

- `apps/web/src/routes/__root.tsx` - App layout
- `apps/web/src/lib/router.tsx` - Router config
- `packages/ui/src/components/` - UI components

### Environment Variables

**Required:**

- `DATABASE_URL` - PostgreSQL connection
- `NODE_ENV` - Environment (development/production)
- `PORT` - API server port

**Optional:**

- `LOG_LEVEL` - Logging verbosity
- `CORS_ORIGIN` - Allowed origins

### Default Ports

- **API**: 3001
- **Web (dev)**: 5173
- **Database**: 5433 (host) → 5432 (container)
- **Drizzle Studio**: 4983

---

## AI Agent Skills

### Recommended Skills for This Project

**Database Management:**

- Drizzle ORM operations
- PostgreSQL query optimization
- Database schema design
- Migration management

**API Development:**

- Hono.js route handling
- TypeScript API design
- Zod validation patterns
- REST API best practices

**Frontend Development:**

- React 19 patterns
- TanStack Router configuration
- TanStack Query state management
- Shadcn/ui component usage

**DevOps & Deployment:**

- Docker multi-stage builds
- Turborepo optimization
- PWA configuration
- Production debugging

**Code Quality:**

- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Testing strategies

### When to Use This Guide

**Before Starting:**

- Review architecture decisions
- Understand naming conventions
- Check existing patterns

**During Development:**

- Follow established patterns
- Use shared utilities
- Maintain type safety

**Before Committing:**

- Run quality checks (`pnpm lint`, `pnpm check-types`)
- Test database operations
- Verify PWA functionality

**When Debugging:**

- Check logs in Docker
- Verify database connections
- Test API endpoints directly
- Validate environment configuration

---

## Conclusion

This guide provides AI agents with the essential context needed for effective development on the Fainansu financial operating system. The project emphasizes type safety, performance, and maintainability while following modern web development best practices.

**Key Success Factors:**

1. **Maintain Type Safety**: Use TypeScript and Zod consistently
2. **Follow Established Patterns**: Don't reinvent existing solutions
3. **Test Thoroughly**: Database operations and API endpoints
4. **Document Changes**: Keep this guide updated with architectural decisions
5. **Consider Security**: Validate inputs and protect user data

For questions or issues not covered in this guide, refer to the project documentation or existing code patterns for guidance.
