"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PokemonList} from "@/utils/pokeapi";

type SearchablePokemonListProps = {
  pokemon: PokemonList[];
}

export default function SearchablePokemonList({ pokemon }: SearchablePokemonListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredPokemon = pokemon.filter((poke) =>
        poke.results.some((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    return (
        <div>
            <input
                type="text"
                placeholder="Search Pokémon..."
                className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {filteredPokemon.map((poke) =>
                    poke.results.map((p) => (
                        <li
                            key={p.name}
                            className="border-2 border-purple-300 dark:border-purple-500 bg-purple-100 dark:bg-purple-800 rounded-lg p-4 flex flex-col items-center hover:shadow-lg hover:bg-purple-200 dark:hover:bg-purple-700 transition-all"
                        >
                            <Link
                                href={`/pokemon/${p.name}`}
                                className="hover:underline">
                                {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}