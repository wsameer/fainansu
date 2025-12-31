import { createFileRoute } from "@tanstack/react-router";
import { useLayoutConfig } from "@/features/layout";
import { StatCard } from "@/components/StatCard";
import { DASHBOARD_ROUTE } from "@/constants";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemTitle,
} from "@workspace/ui/components/item";
import { Button } from "@workspace/ui/components/button";

export const Route = createFileRoute(DASHBOARD_ROUTE)({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Dashboard",
  });

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 xl:grid-cols-12">
        {/* 40% column (2 out of 12 columns) */}
        <div className="xl:col-span-3">
          <Item variant="muted">
            <ItemContent>
              <ItemTitle className="text-muted-foreground font-light">Total Balance</ItemTitle>
              <ItemDescription>
                <span className="text-xl text-foreground font-medium">$20,670</span> <sup>CAD</sup>
              </ItemDescription>
            </ItemContent>
            <ItemFooter>
              <div className="flex w-full justify-between">
                <Button variant="default" size="lg">
                  Deposit
                </Button>
                <Button variant="secondary" size="lg">
                  Expense
                </Button>
              </div>
            </ItemFooter>
          </Item>
        </div>

        {/* 60% column (10 out of 12 columns) with 3 equal cards */}
        <div className="xl:col-span-9 flex flex-col rounded-md bg-muted/50 border-transparent gap-2.5 px-3 py-2.5">
          <small className="text-xs leading-none">Your year in a glimse</small>
          <div className="grid grid-cols-3 gap-2.5">
            <StatCard title="Income" value="$5,111,250.00" change={1.74} changeType="increase" />
            <StatCard title="Expense" value="$64,778.00" change={5.31} changeType="decrease" />
            <StatCard title="Savings" value="$37,950.00" change={3.73} changeType="increase" />
          </div>
        </div>
      </div>
    </div>
  );
}
