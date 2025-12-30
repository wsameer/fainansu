import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "@workspace/ui/components/separator";
import { SettingsTitle } from "@/features/settings";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item";
import { Button } from "@workspace/ui/components/button";
import { TriangleAlertIcon } from "lucide-react";

export const Route = createFileRoute("/settings/backup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-4">
      <SettingsTitle title="Backup Data" description="Placeholder description" />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Language</ItemTitle>
          <ItemDescription>Select the language of the platform</ItemDescription>
        </ItemContent>
      </Item>

      <Separator />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Font Family</ItemTitle>
          <ItemDescription>Pick a font style for the application</ItemDescription>
        </ItemContent>
      </Item>

      <Separator />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Data Reset</ItemTitle>
          <ItemDescription>This action is irreversible and you will lose all data.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="destructive">
            Reset <TriangleAlertIcon />
          </Button>
        </ItemActions>
      </Item>

      <Separator />
    </div>
  );
}
