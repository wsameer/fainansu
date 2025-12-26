import { useLayoutConfig } from "@/components/layout/layout-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Settings",
  });
  return <div>Hello "/settings"!</div>;
}
