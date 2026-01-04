import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@workspace/ui/components/sonner";

import { queryClient } from "../lib/query-client";
import { router } from "../lib/router";
import { ThemeProvider } from "../features/theme/theme-provider";
import { GlobalErrorBoundary } from "@/components/ErrorBoundary";
import { AppLoader } from "./app-loader";

// infrastructure component
export function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="fainansu-ui-theme">
          <React.Suspense fallback={<AppLoader />}>
            <RouterProvider router={router} />
            <Toaster />
          </React.Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}
