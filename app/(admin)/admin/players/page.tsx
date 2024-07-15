import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Page() {
  const supabase = createClient()

  let { data: players, error } = await supabase
    .from('players')
    .select('*')

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold self-start">Players</h1>
      <ol className=' list-disc list-inside'>
        {players?.map((player: any) => (
          <li key={player.id}>
            {player.name}
          </li>
        ))}
      </ol> 
      <Link href={"/admin/players/new"}><Button variant={"link"}>Add New Player</Button></Link>
    </div>
  )
}