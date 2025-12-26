import {
  CreditCardIcon,
  FileTextIcon,
  HouseIcon,
  Settings2Icon,
} from "lucide-react";
import {
  ACCOUNTS_ROUTE,
  DASHBOARD_ROUTE,
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
  { icon: CreditCardIcon, title: "Accounts", path: ACCOUNTS_ROUTE },
  { icon: Settings2Icon, title: "Settings", path: SETTINGS_ROUTE },
].filter(Boolean) as SideNavigationItem[];
