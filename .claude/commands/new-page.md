---
description: Create new frontend page with TanStack Router
argument-hint: <page-path>
allowed-tools: Read, Write, Edit, Glob
---

Create a new frontend page at path "$ARGUMENTS" using TanStack Router conventions.

## Steps

1. **Route file** - Create in `apps/web/src/routes/`:
   - Simple path like "budgets" → `budgets.tsx`
   - Nested path like "reports/monthly" → `reports/monthly.tsx`

2. **Basic structure**:
```typescript
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$ARGUMENTS")({
  component: PageComponent,
});

function PageComponent() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Page Title</h1>
    </div>
  );
}
```

3. **With data fetching** - Add TanStack Query:
```typescript
const { data, isLoading } = useQuery({
  queryKey: ["resource"],
  queryFn: () => fetch("/api/resource").then(r => r.json()),
});
```

4. **Feature module** (if complex) - Create in `apps/web/src/features/`:
   - Main component, sub-components, hooks
   - Import in route file

TanStack Router auto-generates `routeTree.gen.ts`. Follow patterns in existing routes.
