import { createClient } from "@/utils/supabase/server";
import LogGame from "./logGame";
 
async function getData() {
  const players = await createClient().from("players").select("*");
}

export default function Page() {
  const data = getData();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold self-start">Log Game</h1>
      <div className="flex flex-col gap-3">
        <LogGame />
      </div>
    </div>
  )
}