import { PROFILE_SETTINGS_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(PROFILE_SETTINGS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/settings/profile"!</div>;
}
