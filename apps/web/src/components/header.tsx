import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { useLayout } from "./layout-provider";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";

export function Header() {
  const { headerTitle, headerActions } = useLayout();

  const renderDefaultHeaderActions = () => (
    <>
      <Button variant="ghost" size="icon">
        <BellIcon className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <SettingsIcon className="h-5 w-5" />
      </Button>
    </>
  );

  return (
    <header className="col-span-full border-b bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4 max-w-screen-2xl mx-auto">
        {/* Logo/Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">{headerTitle}</h1>
        </div>

        {/* Search - hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-xs mx-8">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expenses..."
              className="pl-10 bg-muted/50 border-0"
            />
          </div>
        </div>

        {/* Actions - custom or default */}
        <div className="flex items-center gap-2">
          {headerActions || renderDefaultHeaderActions()}
        </div>
      </div>
    </header>
  );
}
