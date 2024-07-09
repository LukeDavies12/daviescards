"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type AdminGamesWithParticipants = {
  id: number;
  dateString: string;
  participants: string;
  winner: string;
  winnerScore: number;
  secondPlace: string;
  secondPlaceScore: number;
  thirdPlace: string;
  thirdPlaceScore: number;
}

export const AdminGamesColumns: ColumnDef<AdminGamesWithParticipants>[] = [
  {
    accessorKey: "dateString",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "participants",
    header: "Participants",
  },
  {
    accessorKey: "winner",
    header: "Winner",
  },
  {
    accessorKey: "winnerScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          Winning Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "secondPlace",
    header: "2nd Place",
  },
  {
    accessorKey: "secondPlaceScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          2nd Place Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "thirdPlace",
    header: "3rd Place",
  },
  {
    accessorKey: "thirdPlaceScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() !== "desc")}
        >
          3rd Place Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  }
]