'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import DatePicker from "./DatePicker"
import { logGameAction } from "./logGameAction"

export default function LogGame() {
  const [state, formAction, isPending] = useFormState(logGameAction, null);
  const [date, setDate] = useState<Date | undefined>();
  const [dateError, setDateError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!date) {
      e.preventDefault();
      setDateError("Date is required");
      return;
    }
    setDateError(null);  // Clear error when date is selected
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setDateError(null);  // Clear error when date is selected
    }
  };

  return (
    <form action={formAction} className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 md:w-1/2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="date">Date</Label>
          <DatePicker name="date" onDateChange={handleDateChange} required />
          {dateError && <p className="text-red-500">{dateError}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="participants">Players</Label>
          <Textarea name="participants" placeholder="Jake, Claire, Trent, Lynn, Sophia, Luke" id="participants" required />
          {state?.errors?.participants && <p className="text-red-500">{state.errors.participants}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="winner">Winner</Label>
          <Input name="winner" placeholder="Winner" id="winner" required />
          {state?.errors?.winner && <p className="text-red-500">{state.errors.winner}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="winner_score">Winner Score</Label>
          <Input name="winner_score" placeholder="Score" type="number" id="winner_score" required />
          {state?.errors?.winner_score && <p className="text-red-500">{state.errors.winner_score}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="second">Second Place</Label>
          <Input name="second" placeholder="Second place name" id="second" required />
          {state?.errors?.second && <p className="text-red-500">{state.errors.second}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="second_score">Second Place Score</Label>
          <Input name="second_score" placeholder="Score" type="number" id="second_score" required />
          {state?.errors?.second_score && <p className="text-red-500">{state.errors.second_score}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="third">Third Place</Label>
          <Input name="third" placeholder="Third place name" id="third" required />
          {state?.errors?.third && <p className="text-red-500">{state.errors.third}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="third_score">Third Place Score</Label>
          <Input name="third_score" placeholder="Score" type="number" id="third_score" required />
          {state?.errors?.third_score && <p className="text-red-500">{state.errors.third_score}</p>}
        </div>

        {state?.errors?.general && <p className="text-red-500">{state.errors.general}</p>}
        <Button variant={"default"} className="w-full mt-4" disabled={isPending}>{isPending ? 'Logging' : 'Log'} Game</Button>
      </div>
    </form>
  )
}
