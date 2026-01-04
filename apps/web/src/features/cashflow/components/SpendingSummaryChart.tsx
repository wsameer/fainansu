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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { ShoppingCart, Home, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import { Pie, PieChart, Label } from "recharts";

function TopThreeExpenses() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="rounded-full bg-muted mb-2 p-2.25">
          <ShoppingCart size={14} />
        </div>
        <small className="text-muted-foreground">Groceries</small>
        <p className="leading-5">$1,234</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="rounded-full bg-muted mb-2 p-2.25">
          <Home size={14} />
        </div>
        <small className="text-muted-foreground">Mortgage</small>
        <p className="leading-5">$2,500</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="rounded-full bg-muted mb-2 p-2.25">
          <ShoppingBag size={14} />
        </div>
        <small className="text-muted-foreground">Shopping</small>
        <p className="leading-5">$856</p>
      </div>
    </>
  );
}

const pieChartData = [
  { category: "groceries", amount: 1234, fill: "var(--color-groceries)" },
  { category: "mortgage", amount: 2500, fill: "var(--color-mortgage)" },
  { category: "shopping", amount: 856, fill: "var(--color-shopping)" },
];

const pieChartConfig = {
  amount: {
    label: "Amount",
  },
  groceries: {
    label: "Groceries",
    color: "var(--chart-1)",
  },
  mortgage: {
    label: "Mortgage",
    color: "var(--chart-2)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

function TopThreeExpensesPieChart() {
  const totalAmount = useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  return (
    <ChartContainer config={pieChartConfig} className="mx-auto aspect-square">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={pieChartData}
          dataKey="amount"
          nameKey="category"
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalAmount.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

export function SpendingSummaryChart() {
  const [selectedOption, setSelectedOption] = useState("year");

  const items = [
    { label: "This year", value: "year" },
    { label: "This month", value: "month" },
    { label: "YTD", value: "ytd" },
    { label: "All time", value: "all" },
  ];

  return (
    <Card className="w-full gap-2">
      <CardHeader>
        <CardTitle>Spending</CardTitle>
        <CardDescription>Jan - Jun 2025</CardDescription>
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
      <CardContent className="pb-0">
        <TopThreeExpensesPieChart />
      </CardContent>
      <CardFooter className="flex gap-4">
        <TopThreeExpenses />
      </CardFooter>
    </Card>
  );
}
