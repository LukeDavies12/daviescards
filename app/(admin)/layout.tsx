import { createClient } from '@/utils/supabase/server';
import LoginPage from './loginPage';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    return (
      <LoginPage />
    )
  }

  return (
    <>
      {children}
    </>
  );
}
