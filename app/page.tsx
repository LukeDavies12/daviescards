import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { OHellColumns, ParticipantWithStats } from "./ohellColumns";
import { OHellTable } from "./ohellTable";

async function getData() {
  const supabase = createClient();
  const { data: playersData, error: playersError } = await supabase
    .from('players')
    .select('game_id, name, score');

  if (playersError) {
    console.error(playersError);
    return [];
  }

  const { data: gamesData, error: gamesError } = await supabase
    .from('games')
    .select('id, participants');

  if (gamesError) {
    console.error(gamesError);
    return [];
  }

  const playerStats: { [key: string]: ParticipantWithStats } = {};

  gamesData.forEach(game => {
    const gamePlayers = playersData.filter(player => player.game_id === game.id);
    const sortedPlayers = gamePlayers.sort((a, b) => b.score - a.score);

    sortedPlayers.forEach((player, index) => {
      if (!playerStats[player.name]) {
        playerStats[player.name] = {
          name: player.name,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesSecondPlace: 0,
          gamesThirdPlace: 0,
          percentageWon: 0,
          percentageWonString: '0%',
          totalPoints: 0,
        };
      }

      playerStats[player.name].gamesPlayed += 1;
      playerStats[player.name].totalPoints += player.score;

      if (index === 0) {
        playerStats[player.name].gamesWon += 1;
      } else if (index === 1) {
        playerStats[player.name].gamesSecondPlace += 1;
      } else if (index === 2) {
        playerStats[player.name].gamesThirdPlace += 1;
      }
    });
  });

  Object.values(playerStats).forEach(stat => {
    stat.percentageWon = (stat.gamesWon / stat.gamesPlayed) * 100;
    stat.percentageWonString = `${stat.percentageWon.toFixed(2)}%`;
  });

  return Object.values(playerStats).sort((a, b) => b.gamesWon - a.gamesWon);
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <nav className="flex justify-between items-center py-2 container mx-auto bg- rounded-lg mt-2 px-4 bg-white">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/davies-cards-logo.png" alt="Logo" width={50} height={50} />
            Davies Cards
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/games" className="underline">Game Log</Link>
          <Link href="/admin" className="text-muted-foreground">Admin</Link>
        </div>
      </nav>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <OHellTable columns={OHellColumns} data={data} />
      </main>
    </>
  );
}
