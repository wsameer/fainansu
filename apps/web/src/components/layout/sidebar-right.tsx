import * as React from "react";
import { Plus } from "lucide-react";

import { Calendar } from "@workspace/ui/components/calendar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex w-65"
      {...props}
    >
      <SidebarHeader className="gap-3.5 p-3">
        <div>
          <p className="scroll-m-20 font-semibold tracking-tight">Title</p>
        </div>
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
