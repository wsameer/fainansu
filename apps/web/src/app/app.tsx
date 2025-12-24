import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { queryClient } from "../lib/query-client";
import { router } from "../lib/router";
import { ThemeProvider } from "../features/theme/theme-provider";
import { GlobalErrorBoundary } from "../components/error-boundary";

function AppLoader() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-31.25 w-62.5 rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-62.5" />
        <Skeleton className="h-4 w-50" />
      </div>
    </div>
  );
}

export function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <React.Suspense fallback={<AppLoader />}>
            <RouterProvider router={router} />
          </React.Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
