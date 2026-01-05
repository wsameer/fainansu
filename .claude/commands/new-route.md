---
description: Create new API route with service and types
argument-hint: <resource-name>
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

Create a new API route for resource "$ARGUMENTS" in this Hono.js monorepo.

## Steps

1. **Types** - Create Zod schemas in `packages/types/src/db.ts`:
   - `${Resource}QuerySchema` for GET filters
   - `Insert${Resource}Schema` for POST
   - `Update${Resource}Schema` for PUT (partial)
   - Export from `packages/types/src/index.ts`

2. **Service** - Create `apps/api/src/services/${resource}.service.ts`:
   - Class with getAll, getById, create, update, delete methods
   - Export singleton instance
   - Use soft delete pattern (isActive flag)
   - Throw NotFoundError for missing resources

3. **Route** - Create `apps/api/src/routes/${resource}.ts`:
   - GET / - list with query validation
   - GET /:id - single item
   - POST / - create with json validation
   - PUT /:id - update with param + json validation
   - DELETE /:id - soft delete
   - Return ApiResponse<T> wrapper

4. **Register** - Add to `apps/api/src/index.ts`:
   - Import the route
   - Register with `app.route("/api/${resource}", ${resource})`

5. **Verify** - Run `pnpm check-types`

Follow patterns in existing `accounts.ts` and `categories.ts` files.
