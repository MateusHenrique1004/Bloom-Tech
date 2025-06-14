"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "An area chart with a legend";

const chartData = [
  { month: "Maio", ideal: 25, medida: 27 },
  { month: "Junho", ideal: 25, medida: 25 },
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

export function ChartArea() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperatura</CardTitle>
        <CardDescription>Maio - Junho 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="medida"
              type="natural"
              fill="#FF5733" // Cor personalizada para "Medida"
              fillOpacity={0.4}
              stroke="#FF5733" // Cor personalizada para "Medida"
              stackId="a"
            />
            <Area
              dataKey="ideal"
              type="natural"
              fill="#3498db" // Cor personalizada para "Ideal"
              fillOpacity={0.4}
              stroke="#3498db" // Cor personalizada para "Ideal"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Temperatura Mensal da sua Hortaliça
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Maio - Junho 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
