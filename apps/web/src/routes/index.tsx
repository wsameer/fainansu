import { useLayoutConfig } from "@/components/layout-provider";
import { DASHBOARD_ROUTE } from "@/constants";
import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ActivityIcon,
  CreditCardIcon,
  DollarSignIcon,
  TrendingUpIcon,
} from "lucide-react";

export const Route = createFileRoute(DASHBOARD_ROUTE)({
  component: DashboardPage,
});

function DashboardPage() {
  useLayoutConfig({
    title: "Fainansu",
  });
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,450.00</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,000.00</div>
            <p className="text-xs text-muted-foreground">38% remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+19 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Daily</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$81.67</div>
            <p className="text-xs text-muted-foreground">Based on 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                date: "Dec 24, 2025",
                merchant: "Whole Foods Market",
                category: "Food & Dining",
                amount: "$87.50",
              },
              {
                date: "Dec 23, 2025",
                merchant: "Shell Gas Station",
                category: "Transportation",
                amount: "$45.00",
              },
              {
                date: "Dec 23, 2025",
                merchant: "Amazon",
                category: "Shopping",
                amount: "$129.99",
              },
              {
                date: "Dec 22, 2025",
                merchant: "Netflix",
                category: "Entertainment",
                amount: "$15.99",
              },
              {
                date: "Dec 22, 2025",
                merchant: "Starbucks",
                category: "Food & Dining",
                amount: "$6.75",
              },
            ].map((expense, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{expense.merchant}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{expense.date}</span>
                    <span>•</span>
                    <span>{expense.category}</span>
                  </div>
                </div>
                <span className="font-semibold">{expense.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
