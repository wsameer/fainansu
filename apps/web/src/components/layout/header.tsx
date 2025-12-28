import { BellIcon, EllipsisVerticalIcon } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { Separator } from "@workspace/ui/components/separator";

import { useLayout } from "./layout-provider";

export function Header() {
  const { headerTitle } = useLayout();

  const renderDesktopHeader = () => (
    <div className="hidden sm:flex">
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
          <EllipsisVerticalIcon className="h-5 w-5" />
        </Button>
      </>
    </div>
  );

  const renderMobileHeader = () => (
    <div className="flex sm:hidden">
      <h4 className="scroll-m-20 text-l tracking-wide">{headerTitle}</h4>
    </div>
  );

  return (
    <header className="bg-background sticky top-0 shrink-0 h-14 items-center gap-2 border-b p-4">
      {renderDesktopHeader()}
      {renderMobileHeader()}
    </header>
  );
}
