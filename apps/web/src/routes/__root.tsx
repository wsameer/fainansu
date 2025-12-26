import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";

import { AppBottomBar } from "@/components/navigation/app-bottom-bar";
import { SidebarLeft } from "@/components/layout/sidebar-left";

import { RouteErrorBoundary } from "../components/error-boundary";
import { NotFoundComponent } from "./404";
import { SidebarRight } from "@/components/layout/sidebar-right";

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
      <SidebarProvider
        style={
          {
            "--sidebar-width": "350px",
          } as React.CSSProperties
        }
      >
        <SidebarLeft />
        <SidebarInset>
          <header className="bg-background sticky top-0 hidden sm:flex shrink-0 h-14 items-center gap-2 border-b p-4">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
        <AppBottomBar />
        <SidebarRight />
      </SidebarProvider>
      {import.meta.env.DEV && (
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </>
  );
}
