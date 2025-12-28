import { useLayoutConfig } from "@/components/layout/layout-provider";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { cn } from "@workspace/ui/lib/utils";
import { Bell, LayoutGrid, Settings, User } from "lucide-react";
import { memo } from "react";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  useLayoutConfig({
    title: "Settings",
    showLeftSidebar: false, // Disable the left sidebar for settings
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SettingsNavigation />
        </div>

        <div className="md:col-span-3">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList>
              <TabsTrigger value="profile" asChild>
                <Link to="/settings/profile">Profile</Link>
              </TabsTrigger>
              <TabsTrigger value="appearance" asChild>
                <Link to="/settings/appearance">Appearance</Link>
              </TabsTrigger>
            </TabsList>

            <div className="mt-6">
              {/* This will be replaced by the actual route content */}
              <div className="text-muted-foreground">Select a settings category from the tabs above.</div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const SettingsNavigation = memo(function SettingsNavigation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { href: "/settings", label: "Overview", icon: LayoutGrid },
    { href: "/settings/profile", label: "Profile", icon: User },
    { href: "/settings/account", label: "Account", icon: Settings },
    { href: "/settings/notifications", label: "Notifications", icon: Bell },
  ];

  return (
    <nav className="space-y-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            pathname === item.href ? "bg-secondary text-secondary-foreground" : "hover:bg-secondary/50"
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
});
