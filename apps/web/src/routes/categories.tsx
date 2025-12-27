import { useLayoutConfig } from "@/components/layout/layout-provider";
import { EXPENSE_CATEGORY_SETTINGS_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

// Expense category is the default path
export const Route = createFileRoute(EXPENSE_CATEGORY_SETTINGS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Categories",
  });
  return <div>Hello "/categories"!</div>;
}
