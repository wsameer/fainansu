import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </div>
      }
    >
      {children}
      {/*<ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <TooltipProvider>
            <AuthProvider>
              <ConfirmDialogProvider>
                <Toaster />
                {children}
              </ConfirmDialogProvider>
            </AuthProvider>
          </TooltipProvider>
        </HelmetProvider>
      </ErrorBoundary>*/}
    </React.Suspense>
  );
};

export default AppProvider;
