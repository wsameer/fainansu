import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { SettingsModal, SettingsNavigation } from "@/features/settings";
import { useIsMobile } from "@/hooks/use-mobile";
import { PROFILE_SETTINGS_ROUTE } from "@/constants";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/settings" || location.pathname === "/settings/") {
      throw redirect({ to: PROFILE_SETTINGS_ROUTE });
    }
  },
});

function RouteComponent() {
  const isMobile = useIsMobile();

  return (
    <SettingsModal>
      {/* On mobile, show navigation at the top */}
      {isMobile && (
        <div className="mb-6">
          <SettingsNavigation />
        </div>
      )}
      <Outlet />
    </SettingsModal>
  );
}
