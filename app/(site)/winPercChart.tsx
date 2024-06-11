"use client"

import { BarChart } from "@/components/tremor/barchart";

export interface ChartDataItem {
  Player: string;
  "Win %": number;
}

interface WinPercChartProps {
  chartData: ChartDataItem[];
}

export const WinPercChart = ({ chartData }: WinPercChartProps) => {
  return (
    <BarChart
      className="h-96"
      data={chartData}
      index="Player"
      categories={["Win %"]}
      yAxisWidth={80}
      layout="vertical"
      colors={["red"]}
    />
  )
}