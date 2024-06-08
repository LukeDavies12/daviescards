import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { OHellColumns, PlayerWithStats } from "./ohellColumns";
import { OHellTable } from "./ohellTable";
import { ChartDataItem, WinPercChart } from "./winPercChart";

interface DataResult {
  chartData: ChartDataItem[];
  tableData: PlayerWithStats[];
}


async function getData(): Promise<DataResult> {
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

  // Create chartData from playersWithStats
  const chartData = playersWithStats.map(player => ({
    Player: player.name,
    "Win %": parseFloat(player.percentageWon.toFixed(2)) // Ensure it's a number, not a string
  }));

  chartData.sort((a, b) => b["Win %"] - a["Win %"]);
  playersWithStats.sort((a, b) => b.percentageWon - a.percentageWon);

  return {
    chartData,
    tableData: playersWithStats
  };
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <h1 className="font-bold self-start">O-Hell Leaderboard</h1>
      <WinPercChart chartData={data.chartData} />
      <OHellTable columns={OHellColumns} data={data.tableData} />
    </>
  );
}
