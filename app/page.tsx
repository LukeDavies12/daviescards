import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OHellColumns } from "./ohellColumns";
import { OHellTable } from "./ohellTable";

async function getData() {
  const supabase = createClient();
  const { data: players, error: playersError } = await supabase
    .from("players")
    .select("*");
  if (playersError) {
    console.error("Error fetching players:", playersError);
    return redirect('/error');
  }
  const { data: games, error: gamesError } = await supabase
    .from("games")
    .select("*")
    .order("date", { ascending: false });
  if (gamesError) {
    console.error("Error fetching games:", gamesError);
    return redirect('/error');
  }

  // Calculate player stats from games data
  const playersWithStats = players.map(player => {
    // Provide a default value for name if it's null
    const playerName = player.name || "Unknown";
  
    const playerGames = games.filter(game => game.participants.includes(playerName));
    const stats = playerGames.reduce((acc, game) => {
      if (game.winner === playerName) {
        acc.wins += 1;
      } else if (game.second === playerName) {
        acc.secondPlace += 1;
      } else if (game.third === playerName) {
        acc.thirdPlace += 1;
      }
      return acc;
    }, { wins: 0, secondPlace: 0, thirdPlace: 0, score: 0 });
  
    const gamesPlayed = playerGames.length;
    const percentageWon = gamesPlayed > 0 ? (stats.wins / gamesPlayed) * 100 : 0;
    const percentageWonString = `${percentageWon.toFixed(2)}%`;
    const normedPoints = (gamesPlayed > 0
      ? parseFloat(((stats.wins * 5 + stats.secondPlace * 3 + stats.thirdPlace) / gamesPlayed).toFixed(1))
      : 0) * 10;
  
    return {
      id: player.id,
      name: playerName, // Use the default value or non-null name
      gamesPlayed: gamesPlayed,
      gamesWon: stats.wins,
      gamesSecondPlace: stats.secondPlace,
      gamesThirdPlace: stats.thirdPlace,
      percentageWon,
      percentageWonString,
      normedPoints
    };
  });

  // Sort players by percentageWon in descending order
  playersWithStats.sort((a, b) => b.percentageWon - a.percentageWon);

  return playersWithStats;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <nav className="flex justify-between items-center py-2 container mx-auto rounded-lg mt-2 px-4 bg-white">
        <div>
          <Link href="/" className="flex items-center gap-2 text-red-700 font-medium">
            <Image src="/davies-cards-logo.png" alt="Logo" width={50} height={50} />
            Davies Cards
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="underline">Leaderboard</Link>
          <Link href="/games" className="underline">Game Log</Link>
          <Link href="/admin" className="text-muted-foreground">Admin</Link>
        </div>
      </nav>
      <main className="flex flex-col gap-2 bg-white py-6 my-4 rounded-lg container mx-auto px-4">
        <h1 className="font-bold self-start">O-Hell Leaderboard</h1>
        <OHellTable columns={OHellColumns} data={data} />
      </main>
    </>
  );
}
