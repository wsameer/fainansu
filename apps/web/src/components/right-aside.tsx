import { Card } from "@workspace/ui/components/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { DollarSignIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useLayout } from "./layout/layout-provider";

export function RightAside() {
  const { showRightAside } = useLayout();

  if (!showRightAside) return null;

  return (
    <aside className="hidden lg:block border-l bg-background sticky top-16 h-[calc(100vh-4rem)] row-start-2 row-span-1 overflow-y-auto">
      <div className="p-6 w-80 space-y-6">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Sam Test</span>
              <span className="text-muted-foreground text-xs">
                sam@example.com
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">This Month</span>
              <span className="font-semibold">$2,450.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Budget Left</span>
              <span className="font-semibold text-green-600">$1,550.00</span>
            </div>
          </div>
        </Card>

        <div>
          <h3 className="text-sm font-semibold mb-4">Top Categories</h3>
          <div className="space-y-3">
            {[
              {
                name: "Food & Dining",
                amount: "$850.00",
                trend: "up",
                color: "bg-blue-500",
              },
              {
                name: "Transportation",
                amount: "$420.00",
                trend: "down",
                color: "bg-green-500",
              },
              {
                name: "Shopping",
                amount: "$380.00",
                trend: "up",
                color: "bg-purple-500",
              },
              {
                name: "Utilities",
                amount: "$280.00",
                trend: "down",
                color: "bg-orange-500",
              },
            ].map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${category.color}`} />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{category.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {category.amount}
                    </span>
                  </div>
                </div>
                {category.trend === "up" ? (
                  <TrendingUpIcon className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDownIcon className="h-4 w-4 text-green-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              {
                action: "Added expense",
                detail: "Grocery shopping",
                time: "2h ago",
              },
              {
                action: "Budget updated",
                detail: "Food category",
                time: "5h ago",
              },
              {
                action: "Added expense",
                detail: "Gas station",
                time: "1d ago",
              },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <DollarSignIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{activity.action}</span>
                  <span className="text-xs text-muted-foreground">
                    {activity.detail}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
