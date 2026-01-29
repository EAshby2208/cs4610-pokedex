// app/moves/page.tsx
import Image from "next/image";
import Link from "next/link";

export default async function Moves() {

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
        <section className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">All Moves</h2>
          {/* <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pokemon.results.map((poke) => (
              <li key={poke.name} className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
                <Link href={`/pokemon/${poke.name}`} className="flex flex-col items-center">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul> */}
        </section>
      </main>
    </div>
  );
}