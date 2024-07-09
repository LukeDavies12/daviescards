import LogGame from "./logGame";
 
export default function Page() {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold self-start">Log Game</h1>
      <div className="flex flex-col gap-3">
        <LogGame />
      </div>
    </div>
  )
}