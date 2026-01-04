import { Item, ItemContent, ItemHeader, ItemTitle } from "@workspace/ui/components/item";

interface StatCardProps {
  title: string;
  value: string | number;
  sentiment: string;
}

export const StatCard = ({ title, value, sentiment }: StatCardProps) => {
  return (
    <Item variant="outline">
      <ItemHeader className="flex flex-wrap gap-2 items-center">
        <small className="text-muted-foreground text-xs shrink-0">{title}</small>
      </ItemHeader>
      <ItemContent>
        <ItemTitle className="text-sm">{value}</ItemTitle>
        <small>{sentiment}</small>
      </ItemContent>
    </Item>
  );
};
