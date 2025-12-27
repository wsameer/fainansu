import {
  FileTextIcon,
  HouseIcon,
  LandmarkIcon,
  ScaleIcon,
  Settings2Icon,
  WalletCardsIcon,
} from "lucide-react";
import {
  ACCOUNTS_ROUTE,
  BUDGET_ROUTE,
  DASHBOARD_ROUTE,
  EXPENSE_CATEGORY_SETTINGS_ROUTE,
  SETTINGS_ROUTE,
  TRANSACTIONS_ROUTE,
} from "../../constants";
import type { SideNavigationItem } from "@/components/navigation/types";

export const PRIMARY_NAV_OPTIONS = [
  { icon: HouseIcon, title: "Home", path: DASHBOARD_ROUTE },
  {
    icon: FileTextIcon,
    title: "Transactions",
    path: TRANSACTIONS_ROUTE,
  },
  { icon: LandmarkIcon, title: "Accounts", path: ACCOUNTS_ROUTE },
  {
    icon: WalletCardsIcon,
    title: "Categories",
    path: EXPENSE_CATEGORY_SETTINGS_ROUTE,
  },
  { icon: ScaleIcon, title: "Budget", path: BUDGET_ROUTE },
  { icon: Settings2Icon, title: "Settings", path: SETTINGS_ROUTE },
].filter(Boolean) as SideNavigationItem[];
