"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, FilterFnOption } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type PlayerWithStats =  {
  name: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesSecondPlace: number;
  gamesThirdPlace: number;
  percentageWon: number;
  percentageWonString: string;
  normedPoints: number;
};

export const OHellColumns: ColumnDef<PlayerWithStats>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "percentageWon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
          className="font-medium italic"
        >
          Win %
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => info.row.original.percentageWonString,
  },
  {
    accessorKey: "normedPoints",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Normalized Points
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gamesWon",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Games Won
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gamesSecondPlace",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Games 2nd Place
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gamesThirdPlace",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Games 3rd Place
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gamesPlayed",
    filterFn: "greaterThan" as FilterFnOption<PlayerWithStats>,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Games Played
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];