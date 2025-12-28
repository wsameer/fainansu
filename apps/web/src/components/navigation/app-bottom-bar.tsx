import React, { useRef } from "react";
import { linkOptions, useNavigate, useRouterState } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";

import { NavItem } from "./nav-item";

import { PRIMARY_NAV_OPTIONS } from "./constants";

export function AppBottomBar() {
  const router = useRouterState();
  const navigate = useNavigate();
  const currentPath = router.location.pathname;
  const lastNavItem = PRIMARY_NAV_OPTIONS[PRIMARY_NAV_OPTIONS.length - 1];
  const navRef = useRef(null);

  return (
    <div
      ref={navRef}
      className="sm:hidden fixed bottom-8 left-1/2 w-3/4 -translate-x-1/2 z-50 transition-transform duration-200 ease-in-out"
      id="app-bottom-bar"
    >
      <nav className="flex items-center justify-between rounded-full bg-zinc-800 dark:bg-zinc-200 p-2 shadow-lg">
        {PRIMARY_NAV_OPTIONS.slice(0, -1).map((item) => {
          const Icon = item.icon;
          return (
            <React.Fragment key={item.path}>
              <NavItem
                icon={<Icon />}
                isActive={currentPath === item.path}
                label={item.title}
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
            label={lastNavItem.title}
            onClick={() => navigate(linkOptions({ to: lastNavItem.path }))}
          />
        )}
      </nav>
    </div>
  );
}
