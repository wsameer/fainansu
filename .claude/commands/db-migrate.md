---
description: Database schema change workflow
argument-hint: <change-description>
allowed-tools: Read, Write, Edit, Bash, Glob
---

Guide through database schema change: "$ARGUMENTS"

## Workflow

1. **Edit schema** - Modify `packages/db/src/schema.ts`:
   - New table: Use pgTable with uuid PK, isActive, timestamps
   - New column: Add to existing table definition
   - New enum: Use pgEnum
   - Add relations if needed
   - Export types: `type X = typeof x.$inferSelect`

2. **Push to database**:
```bash
pnpm db:push
```

3. **Update seed** (if needed) - Edit `packages/db/src/seed.ts`:
```bash
pnpm db:seed
```

4. **Verify** - Open Drizzle Studio:
```bash
pnpm db:studio
```

5. **Update types** - Add Zod schemas to `packages/types/src/db.ts`

6. **Type check**:
```bash
pnpm check-types
```

## Conventions
- Primary keys: `uuid("id").defaultRandom().primaryKey()`
- Money: `numeric("amount", { precision: 15, scale: 2 })`
- Soft delete: `isActive: boolean("is_active").notNull().default(true)`
- Timestamps: `createdAt`, `updatedAt`
- Column names: snake_case
