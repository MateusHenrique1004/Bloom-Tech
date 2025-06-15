// ChartBar.tsx
"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const defaultData = [
  { month: "Maio", ideal: 600, medida: 670 },
  { month: "Junho", ideal: 600, medida: 600 },
];

const chartConfig = {
  ideal: {
    label: "Ideal",
    color: "var(--chart-1)",
  },
  medida: {
    label: "Medida",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ChartBarProps {
  data?: {
    month: string;
    ideal: number;
    medida: number;
  }[];
}

export function ChartBar({ data }: ChartBarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Umidade do Solo</CardTitle>
        <CardDescription>Leitura do sensor FC-28</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data?.length ? data : defaultData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="ideal"
              stackId="a"
              fill="var(--color-ideal)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="medida"
              stackId="a"
              fill="var(--color-medida)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <span className="text-sm text-muted-foreground">
          FC-28 • Umidade do solo (sensor analógico)
        </span>
      </CardFooter>
    </Card>
  );
}
