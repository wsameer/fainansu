import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";

import { AppBottomBar } from "@/components/navigation/app-bottom-bar";
import { SidebarLeft } from "@/components/layout/sidebar-left";

import { RouteErrorBoundary } from "../components/error-boundary";
import { NotFoundComponent } from "./404";
import { SidebarRight } from "@/components/layout/sidebar-right";
import { Header } from "@/components/layout/header";
import { LayoutProvider } from "@/components/layout/layout-provider";

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
  return (
    <>
      <LayoutProvider>
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
        </SidebarProvider>
        {import.meta.env.DEV && (
          <TanStackRouterDevtools
            initialIsOpen={false}
            position="bottom-right"
          />
        )}
      </LayoutProvider>
    </>
  );
}
