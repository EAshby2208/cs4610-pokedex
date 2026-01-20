import Image from "next/image";
import Link from "next/link";
import { fetchPokemonList } from "@/utils/pokeapi";
import SearchablePokemonList from "@/app/_components/searchable_pokemon_list";

export default async function Pokemon() {

  const pokemon = await fetchPokemonList();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
        <section className="w-full max-w-2xl">
          <section className="mt-10 w-full">
            <h2 className="text-2xl font-semibold mb-4">All Pokémon</h2>
            <SearchablePokemonList pokemon={pokemon}/>
          </section>
          {/* <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {pokemon.results.map((poke) => (
              <li key={poke.name} className="border-2 border-purple-300 dark:border-purple-500 bg-purple-100 dark:bg-purple-800 rounded-lg p-4 flex flex-col items-center hover:shadow-lg hover:bg-purple-200 dark:hover:bg-purple-700 transition-all">
                <Link href={`/pokemon/${poke.name}`} className="flex flex-col items-center text-black dark:text-black">
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

// flex justify-between items-center mb-6