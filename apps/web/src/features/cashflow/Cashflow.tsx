import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { useState } from "react";
import { CashflowChart } from "./components/CashflowChart";

export function Cashflow() {
  const [selectedOption, setSelectedOption] = useState("year");

  const items = [
    { label: "1 Year", value: "year" },
    { label: "This month", value: "month" },
    { label: "YTD", value: "ytd" },
    { label: "All time", value: "all" },
  ];

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
        <CardDescription>Transcript from the meeting with the client.</CardDescription>
        <CardAction>
          <Select
            items={items}
            value={selectedOption}
            onValueChange={(value) => {
              if (value) setSelectedOption(value);
            }}
          >
            <SelectTrigger>
              <SelectValue aria-placeholder="Select a timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CashflowChart />
      </CardContent>
    </Card>
  );
}
