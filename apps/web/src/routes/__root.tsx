import { createRootRouteWithContext, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar";

import { Header, SidebarLeft, SidebarRight } from "@/features/layout";
import { AppBottomBar } from "@/features/navigation";
import { RouteErrorBoundary } from "@/components/ErrorBoundary";
import { useHotkey } from "@/hooks/use-hotkey";
import { NotFoundComponent } from "./404";
import { PROFILE_SETTINGS_ROUTE } from "@/constants";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: NotFoundComponent,
});

// This is the layout component
function RootComponent() {
  const navigate = useNavigate();

  // Open settings with Cmd+, (Mac) or Ctrl+, (Windows/Linux)
  useHotkey({
    key: ",",
    modifiers: ["meta"],
    callback: () => {
      // Store current path to return to after closing settings
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/settings")) {
        sessionStorage.setItem("settings-return-path", currentPath);
      }
      navigate({ to: PROFILE_SETTINGS_ROUTE });
    },
  });

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <SidebarLeft />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
      <AppBottomBar />
      <SidebarRight />
      {import.meta.env.DEV && (
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </SidebarProvider>
  );
}
