import { APPEARANCE_SETTINGS_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(APPEARANCE_SETTINGS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/settings/appearance"!</div>;
}
