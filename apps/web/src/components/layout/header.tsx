import { BellIcon, SettingsIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";

import { useLayout } from "./layout-provider";

export function Header() {
  const { headerTitle } = useLayout();

  return (
    <header className="bg-background sticky top-0 hidden sm:flex shrink-0 h-14 items-center gap-2 border-b p-4">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <p className="text-xs font-medium">{headerTitle}</p>
      </div>
      <>
        <Button variant="ghost" size="icon">
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </>
    </header>
  );
}
