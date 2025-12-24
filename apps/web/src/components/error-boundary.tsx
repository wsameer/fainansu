import { type PropsWithChildren } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button } from "@workspace/ui/components/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <div className="max-w-md w-full space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
          <h2 className="text-xl font-semibold">Something went wrong</h2>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground wrap-break-words">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={resetErrorBoundary} className="w-full">
            Try again
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export function GlobalErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state here if needed
        window.location.href = "/";
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

// Route-specific error boundary for TanStack Router
export function RouteErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="max-w-md w-full space-y-4 text-center">
        <h1 className="text-2xl font-bold text-destructive">Route Error</h1>
        <p className="text-muted-foreground">{error.message}</p>
        <Button onClick={() => window.location.reload()}>Reload page</Button>
      </div>
    </div>
  );
}
