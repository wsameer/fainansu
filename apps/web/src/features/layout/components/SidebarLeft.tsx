import { useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { LifeBuoyIcon, MessageCircleQuestionIcon, Wallet2Icon } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar";
import { Button } from "@workspace/ui/components/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@workspace/ui/components/tooltip";

import { useLayoutStore } from "@/stores";
import { PRIMARY_NAV_OPTIONS } from "@/features/navigation/constants";

export const SidebarLeft = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const leftSidebarContent = useLayoutStore((state) => state.leftSidebarContent);
  const showLeftSidebar = useLayoutStore((state) => state.showLeftSidebar);
  const { setOpenMobile, isMobile } = useSidebar();
  const router = useRouterState();
  const navRef = useRef(null);

  const currentPath = router.location.pathname;

  const handleNavClick = (path: string) => {
    // Store return path when navigating to settings
    if (path.startsWith("/settings") && !currentPath.startsWith("/settings")) {
      sessionStorage.setItem("settings-return-path", currentPath);
    }

    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const renderPrimaryNavigation = () => (
    <>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="md:h-8 md:p-0" render={<a href="#" />}>
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Wallet2Icon className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Fainansu</span>
                <span className="truncate text-xs">Free forever!</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {PRIMARY_NAV_OPTIONS.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    tooltip={{
                      children: item.title,
                      hidden: false,
                    }}
                    isActive={currentPath === item.path}
                    className="px-2.5 md:px-2"
                    render={<Link to={item.path} onClick={() => handleNavClick(item.path)} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Support" />}>
            <MessageCircleQuestionIcon />
          </TooltipTrigger>
          <TooltipContent side="right">Feedback</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="ghost" size="icon" aria-label="Support" />}>
            <LifeBuoyIcon />
          </TooltipTrigger>
          <TooltipContent side="right">Support</TooltipContent>
        </Tooltip>
      </SidebarFooter>
    </>
  );

  return (
    <Sidebar
      side="left"
      collapsible="icon"
      ref={navRef}
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar collapsible="none" className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r">
        {renderPrimaryNavigation()}
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      {showLeftSidebar && (
        <Sidebar collapsible="none" className="hidden flex-1 md:flex">
          <SidebarHeader className="gap-3.5 border-b p-4">
            <div className="flex w-full items-center justify-between">
              <div className="text-foreground text-base font-medium">Fainansu</div>
            </div>
            <SidebarInput placeholder="Type to search..." />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="p-4">
              <SidebarGroupContent>
                {leftSidebarContent || <DefaultLeftSidebarContent />}
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </Sidebar>
  );
};

function DefaultLeftSidebarContent() {
  return <div>Hello world!</div>;
}
