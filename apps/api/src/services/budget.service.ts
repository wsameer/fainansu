import { db } from "../lib/db.js";
import { budgets, eq, and, desc } from "@workspace/db";
import type { InsertBudget, UpdateBudget, BudgetQuery } from "@workspace/types";
import { AppError } from "../lib/errors.js";

/**
 * Budgets Service
 * Handles all business logic for budget operations
 */

export class BudgetsService {
  /**
   * Get all budgets with optional filtering
   */
  async getAll(filters?: BudgetQuery) {
    const conditions = [];

    if (filters?.categoryId) {
      conditions.push(eq(budgets.categoryId, filters.categoryId));
    }

    if (filters?.period) {
      conditions.push(eq(budgets.period, filters.period));
    }

    if (filters?.isActive !== undefined) {
      conditions.push(eq(budgets.isActive, filters.isActive));
    }

    const result = await db
      .select()
      .from(budgets)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(budgets.createdAt));

    return result;
  }

  /**
   * Get a single budget by ID
   */
  async getById(id: string) {
    const [budget] = await db.select().from(budgets).where(eq(budgets.id, id)).limit(1);

    if (!budget) {
      throw new AppError(404, "Budget not found", "BUDGET_NOT_FOUND");
    }

    return budget;
  }

  /**
   * Create a new budget
   */
  async create(data: InsertBudget) {
    const [newBudget] = await db
      .insert(budgets)
      .values({
        ...data,
        // Convert amount to string if provided (database uses numeric/string)
        amount: String(data.amount),
        updatedAt: new Date(),
      })
      .returning();

    return newBudget;
  }

  /**
   * Update an existing budget
   */
  async update(id: string, data: UpdateBudget) {
    // Check if budget exists
    await this.getById(id);

    const [updatedBudget] = await db
      .update(budgets)
      .set({
        ...data,
        // Convert amount to string if provided (database uses numeric/string)
        amount: data.amount !== undefined ? String(data.amount) : undefined,
        updatedAt: new Date(),
      })
      .where(eq(budgets.id, id))
      .returning();

    return updatedBudget;
  }

  /**
   * Delete a budget (soft delete by setting isActive = false)
   */
  async delete(id: string) {
    // Check if budget exists
    await this.getById(id);

    // Soft delete
    const [deletedBudget] = await db
      .update(budgets)
      .set({
        isActive: false,
        updatedAt: new Date(),
      })
      .where(eq(budgets.id, id))
      .returning();

    return deletedBudget;
  }
}

// Export singleton instance
export const budgetsService = new BudgetsService();
