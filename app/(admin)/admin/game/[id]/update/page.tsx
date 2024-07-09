import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UpdateGame from "./UpdateGame";

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
    <div className="p-6 lg:w-1/2">
      <h1 className="font-bold mb-4">Game Details</h1>
      <UpdateGame game={game} />
    </div>
  );
}
