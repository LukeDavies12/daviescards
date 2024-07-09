'use client'

import { Button } from "@/components/ui/button";
import { DeleteGameAction } from "./DeleteGameAction";

export default function DeleteGame({ gameId }: { gameId: number }) {
  function handleDelete() {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (confirmDelete) {
      console.log("Deleting game with ID:", gameId);
      DeleteGameAction(gameId)
    }
  }

  return (
    <Button variant={"ghost"} className="text-red-500 bg-red-100 hover:text-red-900 hover:bg-red-100" onClick={handleDelete}>Delete</Button>
  );
}