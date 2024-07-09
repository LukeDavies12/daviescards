import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AdminGamesColumns } from "./adminGamesColumns";
import { AdminGamesTable } from "./adminGamesTable";

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

  const transformedGames = games.map((game: Tables<'games'>) => ({
    ...game,
    dateString: game.date,
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
      <AdminGamesTable columns={AdminGamesColumns} data={games} />
    </>
  );
}
