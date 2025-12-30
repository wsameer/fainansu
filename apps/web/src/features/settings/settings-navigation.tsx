import { Link, useRouterState } from "@tanstack/react-router";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
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
      description: "Personal information",
    },
    {
      id: 2,
      href: "/settings/appearance",
      label: "Appearance",
      icon: PaletteIcon,
      description: "Dark and light mode, font size",
    },
    {
      id: 3,
      href: "/settings/backup",
      label: "Backup",
      icon: DatabaseIcon,
      description: "Import, Export, A complete reset",
    },
  ];

  return (
    <nav>
      {navItems.map((item) => (
        <Item
          variant={pathname === item.href ? "outline" : "default"}
          size="sm"
          key={item.id}
          render={<Link to={item.href} className="mb-2" />}
        >
          <ItemMedia>
            <item.icon className="size-4" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{item.label}</ItemTitle>
            {item.description && (
              <ItemDescription className="w-46 truncate">{item.description}</ItemDescription>
            )}
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </Item>
      ))}
    </nav>
  );
});
