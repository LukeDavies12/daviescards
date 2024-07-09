"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DeleteGameAction(gameId: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from("games")
    .delete()
    .eq("id", gameId)
    .select();

  if (error) {
    console.log(error);
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/season");
}