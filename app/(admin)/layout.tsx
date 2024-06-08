import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Link from 'next/link';
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
      <>
        <nav className="flex justify-between items-center py-2 container mx-auto rounded-lg mt-2 px-4 bg-white">
          <div>
            <Link href="/" className="flex items-center gap-2 text-red-700 font-medium">
              <Image src="/davies-cards-logo.png" alt="Logo" width={50} height={50} />
              Davies Cards
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="underline">Leaderboard</Link>
            <Link href="/games" className="underline">Game Log</Link>
            <Link href="/admin" className="text-muted-foreground">Admin</Link>
          </div>
        </nav>
        <LoginPage />
      </>
    )
  }

  return (
    <>
      {children}
    </>
  );
}
