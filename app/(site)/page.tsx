import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NormPointsChartDataItem, PageCharts, WinPercChartDataItem } from "./charts";
import { OHellColumns, PlayerWithStats } from "./ohellColumns";
import { OHellTable } from "./ohellTable";

interface DataResult {
  chartData: WinPercChartDataItem[];
  ptsData: NormPointsChartDataItem[];
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
  const playersWithStats = players.map((player: PlayerWithStats) => {
    const playerName = player.name || "Unknown";

    const playerGames = games.filter((game: Tables<'games'>) => game.participants.includes(playerName));
    const stats = playerGames.reduce((acc: any, game: Tables<'games'>) => {
      if (game.winner.includes(playerName)) {
        acc.wins += 1;
      }
      if (game.second.includes(playerName)) {
        acc.secondPlace += 1;
      }
      if (game.third.includes(playerName)) {
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
      name: playerName,
      gamesPlayed: gamesPlayed,
      gamesWon: stats.wins,
      gamesSecondPlace: stats.secondPlace,
      gamesThirdPlace: stats.thirdPlace,
      percentageWon,
      percentageWonString,
      normedPoints
    };
  });

  // Filter players who have played 5 or more games
  const filteredPlayersWithStats = playersWithStats.filter((player: PlayerWithStats) => player.gamesPlayed >= 5);

  // Create chartData from filteredPlayersWithStats
  const chartData = filteredPlayersWithStats.map((player: PlayerWithStats) => ({
    Player: player.name,
    "Win %": parseFloat(player.percentageWon.toFixed(2))
  }));

  const ptsData = filteredPlayersWithStats.map((player: PlayerWithStats) => ({
    Player: player.name,
    "Normalized Points": player.normedPoints
  }));

  chartData.sort((a: any, b: any) => b["Win %"] - a["Win %"]);
  ptsData.sort((a: any, b: any) => b["Normalized Points"] - a["Normalized Points"]);
  filteredPlayersWithStats.sort((a: any, b: any) => b.percentageWon - a.percentageWon);

  return {
    chartData,
    ptsData,
    tableData: filteredPlayersWithStats
  };
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <h1 className="font-bold self-start">O-Hell Leaderboard</h1>
      <PageCharts ptsData={data.ptsData} winData={data.chartData} />
      <OHellTable columns={OHellColumns} data={data.tableData} />
    </>
  );
}
