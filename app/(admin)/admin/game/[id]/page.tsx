import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import DeleteGame from "./DeleteGame";

export default async function Page({ params }: { params: { id: number } }) {
  const supabase = createClient();

  const { data: game, error: gameError } = await supabase
    .from("games")
    .select("*")
    .eq("id", params.id)
    .single();

  if (gameError) {
    console.error("Error fetching game:", gameError);
    return redirect('/error');
  }

  if (!game) {
    return (
      <div>
        <h1 className="font-bold self-start">Game not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="font-bold mb-4">Game Details</h1>
      <div className="mb-2">
        <span className="font-semibold">Date:</span> {game.date}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Participants:</span> {game.participants.join(', ')}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Second:</span> {game.second}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Second Score:</span> {game.second_score}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Third:</span> {game.third}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Third Score:</span> {game.third_score}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Winner:</span> {game.winner}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Winner Score:</span> {game.winner_score}
      </div>
      <div className="mb-2">
        <span className="font-semibold">ID:</span> {game.id}
      </div>
      <div className="mb-2">
        <Link href={`/admin/game/${game.id}/update`}><Button variant={"link"} className="bg-neutral-100 text-neutral-800">Update Game</Button></Link>
      </div>
      <div className="mb-2">
        <DeleteGame gameId={game.id} />
      </div>
    </div>
  );
}
