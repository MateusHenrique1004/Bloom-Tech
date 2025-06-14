"use client";

import { TrendingUp } from "lucide-react";
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

export const description = "A stacked bar chart with a legend";

const chartData = [
  { month: "Maio", ideal: 650, medida: 620 },
  { month: "Junho", ideal: 650, medida: 600 },
];

const chartConfig = {
  ideal: {
    label: "Ideal",
    color: "var(--chart-1)", // Cor da linha Ideal
  },
  medida: {
    label: "Medida",
    color: "var(--chart-2)", // Cor da linha Medida
  },
} satisfies ChartConfig;

export function ChartBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Umidade do Solo</CardTitle>
        <CardDescription>Maio - Junho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Como está a umidade do solo nos meses?
        </div>
        <div className="text-muted-foreground leading-none"></div>
      </CardFooter>
    </Card>
  );
}
