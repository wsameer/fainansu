import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group";
import { Field, FieldContent, FieldLabel } from "@workspace/ui/components/field";
import { useTheme, type Theme } from "@/features/theme/theme-provider";
import { SettingsTitle } from "@/features/settings";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item";
import { Separator } from "@workspace/ui/components/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Button } from "@workspace/ui/components/button";

export const Route = createFileRoute("/settings/appearance")({
  component: RouteComponent,
});

function RouteComponent() {
  const { theme, setTheme } = useTheme();

  const languages = [
    { label: "Select a language", value: null },
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "Spanish", value: "es" },
    { label: "Japanese", value: "jp" },
  ];

  const fonts = [
    { label: "Select font", value: null },
    { label: "Sans-serif", value: "sans" },
    { label: "Serif", value: "serif" },
    { label: "Monospace", value: "mono" },
    { label: "Cursive", value: "cursive" },
  ];

  return (
    <div className="space-y-4 w-2/3">
      <SettingsTitle
        title="Appearance Settings"
        description="Customize the look and feel of your application."
      />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Language</ItemTitle>
          <ItemDescription>Select the language of the platform</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Select items={languages}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languages.map((language) => (
                  <SelectItem key={language.value} value={language.value}>
                    {language.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </ItemActions>
      </Item>

      <Separator />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Interface theme</ItemTitle>
          <ItemDescription>Customize your application theme.</ItemDescription>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as Theme)}
            className="grid auto-rows-min gap-4 md:grid-cols-3 pt-2"
          >
            <FieldLabel
              htmlFor="light"
              className="h-16 bg-white text-black has-data-checked:bg-white dark:has-data-checked:bg-white"
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <div className="font-medium">Light</div>
                </FieldContent>
                <RadioGroupItem value="light" id="light" />
              </Field>
            </FieldLabel>
            <FieldLabel
              htmlFor="dark"
              className="h-16 bg-gray-800 text-white has-data-checked:bg-gray-800 dark:has-data-checked:bg-gray-800"
            >
              <Field orientation="horizontal">
                <FieldContent>
                  <div className="font-medium">Dark</div>
                </FieldContent>
                <RadioGroupItem value="dark" id="dark" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="system" className="h-16">
              <Field orientation="horizontal">
                <FieldContent>
                  <div className="font-medium">System</div>
                </FieldContent>
                <RadioGroupItem value="system" id="system" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </ItemContent>
      </Item>

      <Separator />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Font Family</ItemTitle>
          <ItemDescription>Pick a font style for the application</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Select items={fonts}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fonts.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </ItemActions>
      </Item>

      <Separator />

      <Item className="p-0">
        <ItemContent>
          <ItemTitle>Reset appearance</ItemTitle>
          <ItemDescription>
            This action resets all appearance settings to default and is irreversible
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="destructive">
            Reset <RotateCcw />
          </Button>
        </ItemActions>
      </Item>

      <Separator />
    </div>
  );
}
