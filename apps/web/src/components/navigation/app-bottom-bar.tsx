import React, { useRef } from "react";
import {
  linkOptions,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  HouseIcon,
  FileTextIcon,
  CreditCardIcon,
  Settings2,
} from "lucide-react";

import type { SideNavigationItem } from "./types";
import { NavItem } from "./nav-item";
import {
  ACCOUNTS_ROUTE,
  DASHBOARD_ROUTE,
  SETTINGS_ROUTE,
  TRANSACTIONS_ROUTE,
} from "@/constants";

const PRIMARY_NAV = [
  { icon: HouseIcon, label: "Home", path: DASHBOARD_ROUTE },
  {
    icon: FileTextIcon,
    label: "Transactions",
    path: TRANSACTIONS_ROUTE,
  },
  { icon: CreditCardIcon, label: "Accounts", path: ACCOUNTS_ROUTE },
  { icon: Settings2, label: "Settings", path: SETTINGS_ROUTE },
].filter(Boolean) as SideNavigationItem[];

export function AppBottomBar() {
  const router = useRouterState();
  const navigate = useNavigate();
  const currentPath = router.location.pathname;
  const lastNavItem = PRIMARY_NAV[PRIMARY_NAV.length - 1];
  const navRef = useRef(null);

  return (
    <div
      ref={navRef}
      className="sm:hidden fixed bottom-8 left-1/2 w-3/4 -translate-x-1/2 z-50 transition-transform duration-200 ease-in-out"
      id="app-bottom-bar"
    >
      <nav className="flex items-center justify-between rounded-full bg-zinc-800 dark:bg-zinc-200 p-2 shadow-lg">
        {PRIMARY_NAV.slice(0, -1).map((item) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.path}>
              <NavItem
                icon={<Icon />}
                isActive={currentPath === item.path}
                label={item.label}
                onClick={() =>
                  navigate(
                    linkOptions({
                      to: item.path,
                    })
                  )
                }
              />
              {/*{index === 1 && <AddTransaction />}*/}
            </React.Fragment>
          );
        })}

        {lastNavItem && (
          <NavItem
            icon={<Settings2 />}
            isActive={location.pathname.includes(lastNavItem.path)}
            label={lastNavItem.label}
            onClick={() => navigate(linkOptions({ to: lastNavItem.path }))}
          />
        )}
      </nav>
    </div>
  );
}
