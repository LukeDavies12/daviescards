import Link from "next/link"

export default function Page() {
  return (
    <div>
      <h1 className="font-bold self-start mb-3">Admin</h1>
      <div className="flex flex-col gap-3">
        <Link href="/admin/log" className="underline">Log New Game</Link>
        <Link href="/admin/games" className="underline">View/Update All Games</Link>
        <Link href="/admin/players" className="underline">Update Players</Link>
      </div>
    </div>
  )
}