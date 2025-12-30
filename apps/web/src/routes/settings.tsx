import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { SettingsModal, SettingsNavigation } from "@/features/settings";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (location.pathname === "/settings" || location.pathname === "/settings/") {
      throw redirect({ to: "/settings/profile" });
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
