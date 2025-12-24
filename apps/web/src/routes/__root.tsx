import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";

import { RouteErrorBoundary } from "../components/error-boundary";
import { NotFoundComponent } from "./404";
import { LayoutProvider } from "@/components/layout-provider";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { RightAside } from "@/components/right-aside";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <LayoutProvider>
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] grid-rows-[auto_1fr_auto]">
          {/* Header - spans all columns */}
          <Header />

          {/* Left Sidebar - hidden on mobile */}
          <Sidebar />

          {/* Main Content - always visible, children render here */}
          <main className="row-start-2 col-start-1 md:col-start-2 lg:col-start-2 overflow-y-auto">
            <Outlet />
          </main>

          {/* Right Aside - hidden on mobile and tablet */}
          <RightAside />
        </div>
      </LayoutProvider>
      {import.meta.env.DEV && (
        <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
      )}
    </>
  );
}
