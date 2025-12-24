import { Link, useRouterState } from "@tanstack/react-router";
import {
  Calendar1Icon,
  HomeIcon,
  ReceiptIcon,
  SettingsIcon,
  TagIcon,
  TrendingUpIcon,
  UsersIcon,
  WalletIcon,
} from "lucide-react";

const navItems = [
  { icon: HomeIcon, label: "Dashboard", href: "/" },
  { icon: ReceiptIcon, label: "Expenses", href: "/expenses" },
  { icon: TrendingUpIcon, label: "Analytics", href: "/analytics" },
  { icon: WalletIcon, label: "Accounts", href: "/accounts" },
  { icon: Calendar1Icon, label: "Budget", href: "/budget" },
  { icon: TagIcon, label: "Categories", href: "/categories" },
  { icon: UsersIcon, label: "Groups", href: "/groups" },
  { icon: SettingsIcon, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:block border-r bg-background sticky top-16 h-[calc(100vh-4rem)] row-start-2 row-span-1">
      <nav className="flex flex-col gap-1 p-4 w-60">
        {navItems.map((item) => (
          <SidebarLink key={item.label} item={item} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarLink({ item }: { item: (typeof navItems)[0] }) {
  const router = useRouterState();
  const pathname = router.location.pathname;
  const isActive = pathname === item.href;

  return (
    <Link
      to={item.href}
      className={`flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      <item.icon className="h-5 w-5" />
      <span className="font-medium">{item.label}</span>
    </Link>
  );
}
