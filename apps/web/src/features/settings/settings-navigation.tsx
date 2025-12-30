import { Link, useRouterState } from "@tanstack/react-router";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item";
import { ChevronRightIcon, DatabaseIcon, PaletteIcon, UserIcon } from "lucide-react";
import { memo } from "react";

export const SettingsNavigation = memo(function SettingsNavigation() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    {
      id: 1,
      href: "/settings/profile",
      label: "Profile",
      icon: UserIcon,
    },
    {
      id: 2,
      href: "/settings/appearance",
      label: "Appearance",
      icon: PaletteIcon,
    },
    {
      id: 3,
      href: "/settings/backup",
      label: "Backup",
      icon: DatabaseIcon,
    },
  ];

  return (
    <nav>
      {navItems.map((item) => (
        <Item
          variant={pathname === item.href ? "muted" : "default"}
          size="sm"
          key={item.id}
          render={<Link to={item.href} className="mb-0.5" />}
        >
          <ItemMedia>
            <item.icon className="size-4" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.label}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </Item>
      ))}
    </nav>
  );
});
