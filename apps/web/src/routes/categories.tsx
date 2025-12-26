import { useLayoutConfig } from "@/components/layout/layout-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/categories")({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Categories",
  });
  return <div>Hello "/categories"!</div>;
}
