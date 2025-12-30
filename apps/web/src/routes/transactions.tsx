import { useLayoutConfig } from "@/features/layout";
import { TRANSACTIONS_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(TRANSACTIONS_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Transactions",
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-muted/50 aspect-video h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}
