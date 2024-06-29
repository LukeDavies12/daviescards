import NewPlayer from './newPlayer';

export default async function Page() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold self-start">Add New Players</h1>
      <NewPlayer />
    </div>
  )
}