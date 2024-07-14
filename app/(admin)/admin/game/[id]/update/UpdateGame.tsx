'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import DatePicker from "./UpdateDatePicker";
import { UpdateGameAction } from "./UpdateGameAction";

interface GameData {
  id: number;
  date: string;
  participants: string;
  winner: string;
  winner_score: number;
  second: string;
  second_score: number;
  third: string;
  third_score: number;
}

export default function UpdateGame({ game }: { game: GameData }) {
  const [date, setDate] = useState<Date | undefined>(new Date(game.date));
  const [formState, setFormState] = useState(game);
  const [formActionState, formAction] = useFormState(
    async (state: any, payload: FormData) => {
      try {
        await UpdateGameAction(payload as FormData);
        ref.current?.reset();
        return null;
      } catch (error) {
        console.error("Failed to update game:", error);
        return { errors: { form: "Failed to update game" } };
      }
    },
    null
  ); const ref = useRef<HTMLFormElement>(null);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setFormState((prevState) => ({
      ...prevState,
      date: selectedDate?.toISOString() || '',
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const UpdateGame = async (formData: FormData) => {
    try {
      await UpdateGameAction(formData);
      ref.current?.reset();
    } catch (error) {
      console.error("Failed to update game:", error);
    }
  };

  useEffect(() => {
    setDate(new Date(game.date));
  }, [game.date]);

  return (
    <form action={UpdateGame} className="flex flex-col gap-3" ref={ref}>
      <input type="hidden" name="id" value={game.id} />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="date">Date</Label>
          <DatePicker name="date" onDateChange={handleDateChange} initialDate={date} required />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="participants">Players</Label>
          <Textarea name="participants" defaultValue={game.participants} placeholder="Jake, Claire, Trent, Lynn, Sophia, Luke" id="participants" required onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="winner">Winner</Label>
          <Input name="winner" defaultValue={game.winner} placeholder="Billy" id="winner" required onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="winner_score">Winner Score</Label>
          <Input name="winner_score" defaultValue={game.winner_score.toString()} placeholder="Score" type="number" id="winner_score" required onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="second">Second Place</Label>
          <Input name="second" defaultValue={game.second} placeholder="Bob" id="second" required onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="second_score">Second Place Score</Label>
          <Input name="second_score" defaultValue={game.second_score.toString()} placeholder="Score" type="number" id="second_score" required onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="third">Third Place</Label>
          <Input name="third" defaultValue={game.third} placeholder="Joe" id="third" required onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="third_score">Third Place Score</Label>
          <Input name="third_score" defaultValue={game.third_score.toString()} placeholder="Score" type="number" id="third_score" required onChange={handleInputChange} />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full mt-4" type="submit" disabled={pending}>
      {pending ? 'Updating' : 'Update'} Game
    </Button>
  );
};
