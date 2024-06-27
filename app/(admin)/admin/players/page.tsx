import { createClient } from '@/utils/supabase/server';
import NewPlayer from './newPlayer';

export default async function Page() {
  const supabase = createClient()

  let { data: players, error } = await supabase
    .from('players')
    .select('*')

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold self-start">Players</h1>
      <ul className=' list-disc list-inside'>
        {players?.map((player: any) => (
          <li key={player.id}>
            {player.name}
          </li>
        ))}
      </ul> 
      <NewPlayer />
    </div>
  )
}