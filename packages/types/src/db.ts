import z from "zod";

// ============================================================================
// Enums
// ============================================================================

export const CategoryTypeEnum = z.enum(["INCOME", "EXPENSE"]);
export type CategoryType = z.infer<typeof CategoryTypeEnum>;

export const AccountTypeEnum = z.enum([
  "CHECKING",
  "SAVINGS",
  "CREDIT_CARD",
  "INVESTMENT",
  "CASH",
  "LOAN",
  "OTHER",
]);
export type AccountType = z.infer<typeof AccountTypeEnum>;

export const TransactionTypeEnum = z.enum(["INCOME", "EXPENSE", "TRANSFER"]);
export type TransactionType = z.infer<typeof TransactionTypeEnum>;
