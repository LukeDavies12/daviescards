import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { OHellColumns } from "./ohellColumns";
import { OHellTable } from "./ohellTable";

async function getData() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("datet", { ascending: false });

}


export default async function Home() {
  const data = await getData();

  return (
    <>
      <nav className="flex justify-between items-center py-2 container mx-auto bg- rounded-lg mt-2 px-4 bg-white">
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
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <OHellTable columns={OHellColumns} data={data} />
      </main>
    </>
  );
}
