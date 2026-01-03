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
import { Cashflow } from "@/features/cashflow";

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
        <div className="xl:col-span-4">
          <Item variant="muted">
            <ItemContent className="gap-2.5">
              <ItemTitle className="text-muted-foreground text-sm font-light">
                Total Balance
              </ItemTitle>
              <ItemDescription className="items-center flex gap-0.5">
                <span className="text-4xl text-foreground">$20,670</span> <sup>CAD</sup>
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
        <div className="xl:col-span-8 flex flex-col rounded-md bg-muted/50 border-transparent gap-2.5 px-3 py-2.5">
          <p className="text-xs">Your year in a glimse</p>
          <div className="grid grid-cols-3 gap-2.5">
            <StatCard title="Income" value="$5,111,250.00" sentiment="Trending up by 5.2%" />
            <StatCard title="Expense" value="$64,778.00" sentiment="Trending down by 1.2%" />
            <StatCard title="Savings" value="$37,950.00" sentiment="Trending up by 15.2%" />
          </div>
        </div>

        <div className="xl:col-span-8">
          <Cashflow />
        </div>
      </div>
    </div>
  );
}
