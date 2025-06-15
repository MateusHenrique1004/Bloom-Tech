"use client";

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

const defaultData = [
  { month: "Maio", ideal: 25, medida: 27 },
  { month: "Junho", ideal: 25, medida: 26 },
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

interface ChartAreaProps {
  data?: {
    month: string;
    ideal: number;
    medida: number;
  }[];
}

export function ChartArea({ data }: ChartAreaProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperatura</CardTitle>
        <CardDescription>Leitura do sensor DHT11</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={data?.length ? data : defaultData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="medida"
              type="natural"
              fill="#FF5733"
              fillOpacity={0.4}
              stroke="#FF5733"
              stackId="a"
            />
            <Area
              dataKey="ideal"
              type="natural"
              fill="#3498db"
              fillOpacity={0.4}
              stroke="#3498db"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <span className="text-sm text-muted-foreground">
          Temperatura do ar (°C)
        </span>
      </CardFooter>
    </Card>
  );
}
