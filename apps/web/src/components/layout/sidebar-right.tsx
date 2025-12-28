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
          <SidebarGroupContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              captionLayout="dropdown"
              showWeekNumber
            />
          </SidebarGroupContent>
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
