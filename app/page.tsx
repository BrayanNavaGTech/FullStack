import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { getSettings } from "@/sanity/lib/queries";

export default async function HomePage() {
  const settings = await getSettings();

  const content = {
    heroTitle: settings?.heroTitle || "To Do",
    heroDescription: settings?.heroDescription || "Organiza tu vida de forma sencilla y rápida.",
    ctaText: settings?.ctaText || "Iniciar Sesión",
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col p-6">
      <header className="w-full flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          <Link href="/">{content.heroTitle}</Link>
        </h1>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <p className="text-gray-400 max-w-md text-lg">
          {content.heroDescription}
        </p>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors">
              {content.ctaText}
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors text-center">
              Ir a mis tareas
            </Link>
            <Link href="/admin" className="bg-gray-800 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-700 transition-colors text-center">
              Panel de Admin
            </Link>
            <Link href="/studio" className="bg-red-800 text-white px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors text-center">
              Panel de Sanity
            </Link>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}