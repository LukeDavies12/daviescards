'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { AddPlayerSchema } from './playerSchema'

export async function NewPlayerAct(state: { errors?: { message: string } } | null, formData: FormData): Promise<{ errors?: { message: string } } | null> {
  const supabase = createClient();

  const name = formData.get('name') as string;
  const validation = AddPlayerSchema.safeParse({ name });

  if (!validation.success) {
    return {
      errors: { message: validation.error.errors[0].message }
    };
  }

  const data = {
    name: validation.data.name,
  };

  const { error } = await supabase.from('players').insert(data);

  if (error) {
    return {
      errors: { message: error.message }
    };
  }

  revalidatePath('/', 'layout');
  redirect('/admin/players');

  return null;
}
