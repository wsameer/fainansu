import type { FileRoutesByPath } from "@tanstack/react-router";

export const BASE_ROUTE = "/";

export const DASHBOARD_ROUTE = BASE_ROUTE as keyof FileRoutesByPath;

export const TRANSACTIONS_ROUTE = (BASE_ROUTE +
  "transactions") as keyof FileRoutesByPath;

export const ACCOUNTS_ROUTE = (BASE_ROUTE +
  "accounts") as keyof FileRoutesByPath;

export const SETTINGS_ROUTE = (BASE_ROUTE +
  "settings") as keyof FileRoutesByPath;

export const EXPENSE_CATEGORY_SETTINGS_ROUTE = (SETTINGS_ROUTE +
  "/expense-categories") as keyof FileRoutesByPath;

export const INCOME_CATEGORY_SETTINGS_ROUTE = (SETTINGS_ROUTE +
  "/income-categories") as keyof FileRoutesByPath;

export const DATA_SETTINGS_ROUTE = (SETTINGS_ROUTE +
  "/data") as keyof FileRoutesByPath;

export const ACCOUNT_SETTINGS_ROUTE = (SETTINGS_ROUTE +
  "/accounts") as keyof FileRoutesByPath;

export const USER_PROFILE_ROUTE = (SETTINGS_ROUTE +
  "/users/me") as keyof FileRoutesByPath;

export const BUDGET_ROUTE = (BASE_ROUTE + "budget") as keyof FileRoutesByPath;
