// app/generations/page.tsx
import Link from "next/link";
import { fetchGenerationList } from "@/utils/pokeapi";

export default async function Generations() {
  const generations = await fetchGenerationList();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
        <section className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">All Generations</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {generations.results.map((gen: any) => (
              <li key={gen.name} className="border-2 border-yellow-300 dark:border-yellow-500 bg-yellow-100 dark:bg-yellow-800 rounded-lg p-4 flex flex-col items-center hover:shadow-lg hover:bg-yellow-200 dark:hover:bg-yellow-700 transition-all">
                <Link href={`/generations/${gen.name}`} className="flex flex-col items-center text-black dark:text-black">
                {gen.name.charAt(0).toUpperCase() + gen.name.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}