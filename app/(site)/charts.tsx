"use client";

import { BarChart } from "@/components/tremor/barchart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface NormPointsChartDataItem {
  Player: string;
  "Normalized Points": number;
}

export interface WinPercChartDataItem {
  Player: string;
  "Win %": number;
}

export interface ChartProps {
  ptsData: NormPointsChartDataItem[];
  winData: WinPercChartDataItem[];
}

export const PageCharts = ({ ptsData, winData }: ChartProps) => {
  return (
    <Tabs defaultValue="win-percentage" className="w-full">
      <TabsList>
        <TabsTrigger value="win-percentage">Win %</TabsTrigger>
        <TabsTrigger value="normalized-points">Normalized Points</TabsTrigger>
      </TabsList>
      <TabsContent value="win-percentage">
        <BarChart
          className="h-[40rem]"
          data={winData}
          index="Player"
          categories={["Win %"]}
          yAxisWidth={80}
          layout="vertical"
          colors={["red"]}
        />
      </TabsContent>
      <TabsContent value="normalized-points">
        <BarChart
          className="h-[40rem]"
          data={ptsData}
          index="Player"
          categories={["Normalized Points"]}
          yAxisWidth={80}
          layout="vertical"
          colors={["red"]}
        />
      </TabsContent>
    </Tabs>
  );
}
