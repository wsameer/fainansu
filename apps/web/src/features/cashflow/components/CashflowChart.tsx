import { BarChart, Bar, XAxis, CartesianGrid, YAxis, ReferenceLine } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart";

const barChartData = [
  {
    month: "January",
    expense: -4000,
    income: 8400,
  },
  {
    month: "February",
    expense: -5000,
    income: 11198,
  },
  {
    month: "March",
    expense: -7800,
    income: 14800,
  },
  {
    month: "April",
    expense: -2780,
    income: 12908,
  },
  {
    month: "May",
    expense: -11890,
    income: 7800,
  },
  {
    month: "June",
    expense: -7390,
    income: 12800,
  },
  {
    month: "July",
    expense: -3490,
    income: 8300,
  },
];

const barChartConfig = {
  expense: {
    label: "Expense",
    color: "var(--chart-1)",
  },
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

// Helper function to format currency
const formatCurrency = (value: number) => {
  const absValue = Math.abs(value);

  if (absValue > 999) {
    const formatted = (absValue / 1000).toFixed(1);
    // Remove .0 if it's a whole number
    const clean = formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted;
    return `${value < 0 ? "-" : ""}$${clean}K`;
  }

  return `${value < 0 ? "-" : ""}$${absValue}`;
};

export function CashflowChart() {
  return (
    <ChartContainer config={barChartConfig} className="min-h-50 w-full">
      <BarChart
        accessibilityLayer
        data={barChartData}
        stackOffset="sign"
        margin={{
          top: 25,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" label="month" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        {/*<ReferenceLine y={0} stroke="#000" />*/}
        <Bar dataKey="expense" fill="var(--color-expense)" stackId="stack" />
        <Bar dataKey="income" fill="var(--color-income)" stackId="stack" />
      </BarChart>
    </ChartContainer>
  );
}
