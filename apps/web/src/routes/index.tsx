import { createFileRoute } from "@tanstack/react-router";
import { DASHBOARD_ROUTE } from "@/constants";
import { useLayoutConfig } from "@/features/layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";

export const Route = createFileRoute(DASHBOARD_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Dashboard",
  });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-row">
        <div className="basis-1/4 md:basis-1/3 mr-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-l tabular-nums font-light @[250px]/card:text-l">
                $1,250.00
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="basis-1/4 md:basis-1/3 mr-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-l tabular-nums font-light @[250px]/card:text-l">
                $1,250.00
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        <div className="basis-1/2 md:basis-1/3">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-l tabular-nums font-light @[250px]/card:text-l">
                $1,250.00
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
      <div className="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
