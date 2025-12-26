import * as React from "react";
import {
  DollarSignIcon,
  Plus,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";

import { Calendar } from "@workspace/ui/components/calendar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { Card } from "@workspace/ui/components/card";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex w-64"
      {...props}
    >
      <SidebarHeader className="gap-3.5 p-3">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">This Month</span>
              <span className="font-mono">$2,450.00</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Budget Left</span>
              <span className="text-green-600 font-mono">$1,550.00</span>
            </div>
          </div>
        </Card>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex items-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border shadow-sm"
            captionLayout="dropdown"
            showWeekNumber
          />
          {/*<Card className="w-full max-w-sm">
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
                      <div
                        className={`w-2 h-2 rounded-full ${category.color}`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {category.name}
                        </span>
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
            </Card>

            <Card className="w-full max-w-sm">
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
                      <span className="text-sm font-medium">
                        {activity.action}
                      </span>
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
            </Card>*/}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
