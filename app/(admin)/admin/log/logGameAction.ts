'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function logGameAction(formData: FormData) {
  const date = formData.get('date') as string;
  const players = formData.getAll('players') as string[];
  const winner = formData.get('winner') as string;
  const winnerScore = formData.get('winnerScore') as string;
  const second = formData.get('second') as string;
  const secondScore = formData.get('secondScore') as string;
  const third = formData.get('third') as string;
  const thirdScore = formData.get('thirdScore') as string;

  const { data, error } = await createClient().from("games").insert();

  if (error) {
    console.error(error);
    return redirect('/admin/log');
  }

  revalidatePath('/admin/log');
}