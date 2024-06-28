"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { GameSchema } from "./gameSchema";

export async function logGameAction(
  state: { errors?: { [key: string]: string } } | null,
  formData: FormData
): Promise<{ errors?: { [key: string]: string } } | null> {
  const supabase = createClient();

  const date = formData.get("date") as string;
  const participants = formData.get("participants") as string;
  const winner = formData.get("winner") as string;
  const winnerScore = parseInt(formData.get("winner_score") as string);
  const second = formData.get("second") as string;
  const secondScore = parseInt(formData.get("second_score") as string);
  const third = formData.get("third") as string;
  const thirdScore = parseInt(formData.get("third_score") as string);

  const validation = GameSchema.safeParse({
    date,
    participants,
    second,
    second_score: secondScore,
    third,
    third_score: thirdScore,
    winner,
    winner_score: winnerScore,
  });

  if (!validation.success) {
    const errors: { [key: string]: string } = {};
    validation.error.errors.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    return { errors };
  }

  const participantNames = participants.split(",").map((name) => name.trim());
  const playerNames = [
    ...new Set([winner, second, third, ...participantNames]),
  ];

  const { data: players, error: playerError } = await supabase
    .from("players")
    .select("name")
    .in("name", playerNames);

  if (playerError) {
    return {
      errors: { general: playerError.message },
    };
  }

  const missingPlayers = playerNames.filter(
    (playerName) =>
      !players.some((player: { name: string }) => player.name === playerName)
  );
  if (missingPlayers.length > 0) {
    return {
      errors: {
        general: `These players are not registered: ${missingPlayers.join(", ")}`,
      },
    };
  }

  const data = {
    date: validation.data.date,
    participants: validation.data.participants,
    second: validation.data.second,
    second_score: validation.data.second_score,
    third: validation.data.third,
    third_score: validation.data.third_score,
    winner: validation.data.winner,
    winner_score: validation.data.winner_score,
  };

  const { error } = await supabase.from("games").insert(data);

  if (error) {
    return {
      errors: { general: error.message },
    };
  }

  revalidatePath("/admin/log");
  redirect("/admin/log");

  return null;
}
