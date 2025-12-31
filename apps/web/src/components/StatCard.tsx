import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
}

export const StatCard = ({ title, value, change, changeType }: StatCardProps) => {
  const changeIcon = changeType === "increase" ? "+" : "-";

  return (
    <Item variant="outline">
      <ItemHeader className="flex flex-wrap">
        <small className="text-muted-foreground text-xs truncate w-[90%]">{title}</small>
        <Badge
          className={cn("h-5 font-xs @[200px]/card:h-5", {
            "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300":
              changeType === "increase",
            "bg-red-50  text-red-700 dark:bg-red-950 dark:text-red-300": changeType === "decrease",
          })}
        >
          <TrendingUpIcon className="w-3 h-3 @[200px]/card:w-4 @[200px]/card:h-4" />
          {changeIcon}${change}
        </Badge>
      </ItemHeader>

      <ItemContent>
        <ItemTitle className="text-sm">{value}</ItemTitle>
      </ItemContent>
      <ItemActions></ItemActions>
    </Item>
  );
};
