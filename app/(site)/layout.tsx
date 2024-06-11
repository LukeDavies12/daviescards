import Image from "next/image";
import Link from "next/link";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Link href="/games" className="underline">Games Log</Link>
          <Link href="/admin" className="text-muted-foreground">Admin</Link>
        </div>
      </nav>
      <main className="flex flex-col gap-2 bg-white py-6 my-4 rounded-lg container mx-auto px-4">
        {children}
      </main>
    </>
  );
}