import { useLayoutConfig } from "@/features/layout";
import { ACCOUNTS_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(ACCOUNTS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Accounts",
  });

  return <div>Hello "/accounts"!</div>;
}
