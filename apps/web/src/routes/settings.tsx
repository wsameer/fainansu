import { useLayoutConfig } from "@/components/layout/layout-provider";
import { SETTINGS_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(SETTINGS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Settings",
  });
  return <div>Hello "/settings"!</div>;
}
