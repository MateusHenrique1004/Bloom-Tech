"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  umidade: {
    label: "Umidade",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface ChartLineProps {
  data?: {
    month: string;
    umidade: number; // leitura real do DHT11
    ideal: number; // valor ideal para comparação
  }[];
}

export function ChartLine({ data }: ChartLineProps) {
  const defaultData = [
    { month: "Maio", umidade: 21, ideal: 18 },
    { month: "Junho", umidade: 17, ideal: 18 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Umidade do Ar</CardTitle>
        <CardDescription>Leituras do sensor DHT11</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {/* Linha de umidade real */}
            <Line
              dataKey="umidade"
              type="monotone"
              stroke="var(--color-umidade)"
              strokeWidth={2}
              dot={false}
            />

            {/* Linha de umidade ideal */}
            <Line
              dataKey="ideal"
              type="monotone"
              stroke="#999"
              strokeDasharray="4 4"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm">
          <span className="text-muted-foreground">
            DHT11 • Umidade relativa do ar
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
