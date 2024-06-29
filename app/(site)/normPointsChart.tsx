"use client"

import { BarChart } from "@/components/tremor/barchart";

export interface ChartDataItem {
  Player: string;
  "Normalized Points": number;
}

interface NormPointsChartProps {
  chartData: ChartDataItem[];
}

export const NormPointsChart = ({ chartData }: NormPointsChartProps) => {
  return (
    <BarChart
      className="h-96"
      data={chartData}
      index="Player"
      categories={["Normalized Points"]}
      yAxisWidth={80}
      layout="vertical"
      colors={["red"]}
    />
  )
}