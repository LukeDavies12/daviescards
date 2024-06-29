'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useFormState, useFormStatus } from 'react-dom'
import { NewPlayerAct } from "./newPlayterAct"


export default function NewPlayer() {
  const [state, formAction] = useFormState(NewPlayerAct, null);
  const { pending } = useFormStatus();
  const [open, setOpen] = useState(false);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-1 md:w-1/2">
        <Label htmlFor="name">Name</Label>
        <Input name="name" placeholder="Player Name" id="name" required />
        {state?.errors?.message && <p className="text-red-500">{state.errors.message}</p>}
        <Button variant={"default"} className="w-full mt-4" disabled={pending}>{pending ? 'Adding' : 'Add'} New Player</Button>
      </div>
    </form>
  )
}