import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { GamesColumns } from "./gamesColumns";
import { GamesTable } from "./gamesTable";

async function getData() {
  const supabase = createClient();
  const { data: games, error: gamesError } = await supabase
    .from("games")
    .select("*")
    .order("date", { ascending: false });

  if (gamesError) {
    console.error("Error fetching games:", gamesError);
    return redirect('/error');
  }

  // Transform data to include necessary fields
  const transformedGames = games.map(game => ({
    ...game,
    dateString: game.date, // Assuming 'date' is in correct format
    participants: game.participants.join(", "),
    winnerScore: game.winner_score,
    secondPlace: game.second,
    secondPlaceScore: game.second_score,
    thirdPlace: game.third,
    thirdPlaceScore: game.third_score
  }));

  return transformedGames;
}

export default async function Page() {
  const games = await getData();
  return (
    <>
      <h1 className="font-bold self-start">Games Log</h1>
      <GamesTable columns={GamesColumns} data={games} />
    </>
  );
}