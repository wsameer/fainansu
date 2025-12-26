import {
  useLayout,
  useLayoutConfig,
} from "@/components/layout/layout-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/accounts")({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Accounts",
  });

  return <div>Hello "/accounts"!</div>;
}
