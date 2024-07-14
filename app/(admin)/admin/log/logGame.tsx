'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRef, useState } from "react"
import { useFormState, useFormStatus } from 'react-dom'
import DatePicker from "./DatePicker"
import { logGameAction } from "./logGameAction"

export default function LogGame() {
  const [date, setDate] = useState<Date | undefined>()
  const [state, formAction] = useFormState(logGameAction, null)
  const ref = useRef<HTMLFormElement>(null);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
  }

  function OnCreate(formData: FormData) {
    (async () => {
      const res = await formAction(formData)
      ref.current?.reset()
    })()
  }

  return (
    <form action={OnCreate} ref={ref} className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 md:w-1/2">
        <div className="flex flex-col gap-1">
          <Label htmlFor="date">Date</Label>
          <DatePicker name="date" onDateChange={handleDateChange} required />
          {state?.errors?.date && <p className="text-red-500">{state.errors.date}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="participants">Players</Label>
          <Textarea name="participants" placeholder="Jake, Claire, Trent, Lynn, Sophia, Luke" id="participants" required />
          {state?.errors?.participants && <p className="text-red-500">{state.errors.participants}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="winner">Winner</Label>
          <Input name="winner" placeholder="Billy" id="winner" required />
          {state?.errors?.winner && <p className="text-red-500">{state.errors.winner}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="winner_score">Winner Score</Label>
          <Input name="winner_score" placeholder="Score" type="number" id="winner_score" required />
          {state?.errors?.winner_score && <p className="text-red-500">{state.errors.winner_score}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="second">Second Place</Label>
          <Input name="second" placeholder="Bob" id="second" required />
          {state?.errors?.second && <p className="text-red-500">{state.errors.second}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="second_score">Second Place Score</Label>
          <Input name="second_score" placeholder="Score" type="number" id="second_score" required />
          {state?.errors?.second_score && <p className="text-red-500">{state.errors.second_score}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="third">Third Place</Label>
          <Input name="third" placeholder="Joe" id="third" required />
          {state?.errors?.third && <p className="text-red-500">{state.errors.third}</p>}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="third_score">Third Place Score</Label>
          <Input name="third_score" placeholder="Score" type="number" id="third_score" required />
          {state?.errors?.third_score && <p className="text-red-500">{state.errors.third_score}</p>}
        </div>
        {state?.errors?.general && <p className="text-red-500">{state.errors.general}</p>}
        <SubmitButton />
      </div>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant={"default"} className="w-full mt-4" disabled={pending}>{pending ? 'Logging' : 'Log'} New Game</Button>
  )
}