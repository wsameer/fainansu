import type { FileRoutesByPath } from "@tanstack/react-router";

const ROOT_ROUTE = "/";

export const DASHBOARD_ROUTE = ROOT_ROUTE as keyof FileRoutesByPath;

export const TRANSACTIONS_ROUTE = "/transactions" as keyof FileRoutesByPath;

export const ACCOUNTS_ROUTE = "/accounts" as keyof FileRoutesByPath;

export const SETTINGS_ROUTE = "/settings" as keyof FileRoutesByPath;

export const EXPENSE_CATEGORY_SETTINGS_ROUTE = (SETTINGS_ROUTE + "/expense-categories") as keyof FileRoutesByPath;

export const INCOME_CATEGORY_SETTINGS_ROUTE = (SETTINGS_ROUTE + "/income-categories") as keyof FileRoutesByPath;

export const PROFILE_SETTINGS_ROUTE = (SETTINGS_ROUTE + "/profile") as keyof FileRoutesByPath;

export const APPEARANCE_SETTINGS_ROUTE = (SETTINGS_ROUTE + "/appearance") as keyof FileRoutesByPath;

export const DATA_SETTINGS_ROUTE = (SETTINGS_ROUTE + "/data") as keyof FileRoutesByPath;

export const ACCOUNT_SETTINGS_ROUTE = (SETTINGS_ROUTE + "/accounts") as keyof FileRoutesByPath;

export const USER_PROFILE_ROUTE = (SETTINGS_ROUTE + "/users/me") as keyof FileRoutesByPath;

export const BUDGET_ROUTE = "/budget" as keyof FileRoutesByPath;
