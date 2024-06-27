'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from 'react-dom'
import { NewPlayerAct } from "./newPlayterAct"


export default function NewPlayer() {
  const [state, formAction, isPending] = useFormState(NewPlayerAct, null);

  return (
    <Dialog>
      <DialogTrigger asChild><Button variant={"default"} className="w-52">New Player</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form action={formAction}>
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input name="name" placeholder="Player Name" id="name" required />
              {state?.errors?.message && <p className="text-red-500">{state.errors.message}</p>}
            </div>
            <Button variant={"default"} className="w-full mt-4" disabled={isPending}>{isPending ? 'Creating' : 'Create'} Player</Button>
          </form>
        </DialogDescription>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="w-full -mt-2">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}