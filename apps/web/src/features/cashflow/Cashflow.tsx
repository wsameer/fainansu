import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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
import { TrendingUpIcon } from "lucide-react";

export function Cashflow() {
  const [selectedOption, setSelectedOption] = useState("year");

  const items = [
    { label: "This year", value: "year" },
    { label: "This month", value: "month" },
    { label: "YTD", value: "ytd" },
    { label: "All time", value: "all" },
  ];

  return (
    <Card className="mx-auto w-full gap-3">
      <CardHeader>
        <CardTitle>Cashflow</CardTitle>
        <CardDescription>January - December 2025</CardDescription>
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
      <CardFooter>
        <p className="flex gap-1 leading-none items-center-safe not-first:mt-6">
          Trending up by 5.2% this month <TrendingUpIcon size={14} />
        </p>
      </CardFooter>
    </Card>
  );
}
