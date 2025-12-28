import { useLayoutConfig } from "@/components/layout/layout-provider";
import { DASHBOARD_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";

export const Route = createFileRoute("/404")({
  component: NotFoundComponent,
});

export function NotFoundComponent() {
  useLayoutConfig({
    title: "404 Not Found",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-8xl md:text-9xl font-bold">404</h1>
      <div className="h-1 w-16 rounded my-5 md:my-7"></div>
      <p className="text-xl md:text-3xl font-semibold text-gray-800">Page Not Found</p>
      <p className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center px-4">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex items-center gap-4 mt-6">
        <Button type="button" variant={"secondary"} onClick={() => (window.location.href = DASHBOARD_ROUTE)}>
          Go back home
        </Button>
      </div>
    </div>
  );
}
