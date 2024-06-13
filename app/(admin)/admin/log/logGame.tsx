'use client'

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tables } from "@/types/supabase"
import { useState } from "react"
import DatePicker from "./DatePicker"

export default function LogGame({ players }: { players: Tables<"players">[] }) {
  const [winnerId, setWinnderId] = useState("");
  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Label htmlFor="date">Date</Label>
        <DatePicker name="date" />
        <Label htmlFor="players">Players</Label>
        <Textarea name="players" placeholder="Player1, Player2, Player3, Player4" />
        <Label htmlFor="winner">Winner</Label>
        <Select name="qb_id" required value={winnerId} onValueChange={setWinnderId}>
              <SelectTrigger tabIndex={0} id="qb_id">
                <SelectValue placeholder="Choose Winner" />
              </SelectTrigger>
              <SelectContent>
                {players.map((player: Tables<"players">) => (
                  <SelectItem key={player.id} value={player.id.toString()}>
                    {player.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
      </div>
    </form>
  )
}
