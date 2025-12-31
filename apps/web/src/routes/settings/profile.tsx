import { PROFILE_SETTINGS_ROUTE } from "@/constants";
import { SettingsTitle } from "@/features/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(PROFILE_SETTINGS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-6">
      <SettingsTitle
        title="Profile Settings"
        description="Manage your profile information and preferences."
      />
      {/* Add your profile settings content here */}
    </div>
  );
}
