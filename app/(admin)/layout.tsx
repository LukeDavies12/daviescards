import { Button } from '@/components/ui/button';
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
        <nav className="flex flex-col md:flex-row justify-between items-center py-2 container mx-auto rounded-lg mt-2 px-4 bg-white gap-2">
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
  } else {
    return (
      <>
        <nav className="flex flex-col md:flew-row gap-2 justify-between items-center py-2 container mx-auto rounded-lg mt-2 px-4 bg-white">
          <div>
            <Link href="/" className="flex items-center gap-2 text-red-700 font-medium">
              <Image src="/davies-cards-logo.png" alt="Logo" width={50} height={50} />
              Davies Cards
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div>
              <Link href="/" className="underline">Leaderboard</Link>
            </div>
            <div>
              <Link href="/games" className="underline">Games Log</Link>
            </div>
            <div>
              <Link href="/admin" className="text-muted-foreground">Admin</Link>
            </div>
            <div>
              <form action="/auth/logout" method="post" className="w-full text-left">
                <Button variant={"link"}>Logout</Button>
              </form>
            </div>
          </div>
        </nav>
        <main className="flex flex-col gap-2 bg-white py-6 my-4 rounded-lg container mx-auto px-4">
          {children}
        </main>
      </>
    );
  }
}
