import { useLayoutConfig } from "@/components/layout/layout-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transactions")({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Transactions",
  });
  return <div>Hello "/transactions"!</div>;
}
