import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@workspace/ui/components/sidebar";
import { Card } from "@workspace/ui/components/card";
import { useLayoutStore } from "@/stores";

export function SidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const rightSidebarContent = useLayoutStore((state) => state.rightSidebarContent);
  const showRightSidebar = useLayoutStore((state) => state.showRightSidebar);

  if (!showRightSidebar) return null;

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
            {rightSidebarContent || <DefaultRightSidebarContent />}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function DefaultRightSidebarContent() {
  return <div>hello right sidebar</div>;
}
