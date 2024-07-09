"use server"

import { GameSchema } from "@/app/(admin)/admin/log/gameSchema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function UpdateGameAction(
  formData: FormData
): Promise<{ errors?: { [key: string]: string } } | null> {
  const supabase = createClient();

  const id = formData.get("id") as string;
  const date = new Date(formData.get("date") as string);
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
      errors[err.path[0] as string] = err.message;
    });
    console.error("Validation Errors:", errors);
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
    console.error("Player Fetch Error:", playerError.message);
    return {
      errors: { general: playerError.message },
    };
  }

  const missingPlayers = playerNames.filter(
    (playerName) =>
      !players.some((player: { name: string }) => player.name === playerName)
  );

  if (missingPlayers.length > 0) {
    console.error("Missing Players:", missingPlayers);
    return {
      errors: {
        general: `These players are not registered: ${missingPlayers.join(", ")}`,
      },
    };
  }

  const data = {
    date: validation.data.date,
    participants: participantNames,
    second: validation.data.second,
    second_score: validation.data.second_score,
    third: validation.data.third,
    third_score: validation.data.third_score,
    winner: validation.data.winner,
    winner_score: validation.data.winner_score,
  };

  const idAsNumber = parseInt(id);

  const { data: returnGame, error } = await supabase.from("games").update(data).eq("id", idAsNumber).select();

  if (error) {
    console.error("Game Update Error:", error.message);
    return {
      errors: { general: error.message },
    };
  }

  revalidatePath("/");
  revalidatePath("/layout");
  revalidatePath(`/admin/game/${id}/update`);
  redirect(`/admin/game/${id}/update`);
}
