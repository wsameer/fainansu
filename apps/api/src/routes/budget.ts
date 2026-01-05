import { Hono } from "hono";
import { budgetsService } from "../services/budget.service.js";
import { validate } from "../middleware/validator.js";
import {
  BudgetQuerySchema,
  InsertBudgetSchema,
  UpdateBudgetSchema,
  type ApiResponse,
} from "@workspace/types";
import z from "zod";

/**
 * Budgets Routes
 * Following Hono best practices: handlers defined directly with routes
 */

const app = new Hono();

// UUID param validator
const uuidParamSchema = z.object({
  id: z.string().uuid(),
});

/**
 * GET /api/budget
 * Get all budgets with optional filtering
 */
app.get("/", validate("query", BudgetQuerySchema), async (c) => {
  const query = c.req.valid("query");
  const budgets = await budgetsService.getAll(query);

  return c.json<ApiResponse<typeof budgets>>({
    success: true,
    data: budgets,
  });
});

/**
 * GET /api/budget/:id
 * Get a single budget by ID
 */
app.get("/:id", validate("param", uuidParamSchema), async (c) => {
  const { id } = c.req.valid("param");
  const budget = await budgetsService.getById(id);

  return c.json<ApiResponse<typeof budget>>({
    success: true,
    data: budget,
  });
});

/**
 * POST /api/budget
 * Create a new budget
 */
app.post("/", validate("json", InsertBudgetSchema), async (c) => {
  const data = c.req.valid("json");
  const newBudget = await budgetsService.create(data);

  return c.json<ApiResponse<typeof newBudget>>(
    {
      success: true,
      data: newBudget,
    },
    201
  );
});

/**
 * PUT /api/budget/:id
 * Update an existing budget
 */
app.put(
  "/:id",
  validate("param", uuidParamSchema),
  validate("json", UpdateBudgetSchema),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");
    const updatedBudget = await budgetsService.update(id, data);

    return c.json<ApiResponse<typeof updatedBudget>>({
      success: true,
      data: updatedBudget,
    });
  }
);

/**
 * DELETE /api/budget/:id
 * Soft delete a budget (sets isActive = false)
 */
app.delete("/:id", validate("param", uuidParamSchema), async (c) => {
  const { id } = c.req.valid("param");
  const deletedBudget = await budgetsService.delete(id);

  return c.json<ApiResponse<typeof deletedBudget>>({
    success: true,
    data: deletedBudget,
  });
});

export default app;
