import Image from "next/image";
import Link from "next/link";
import { fetchPokemonDetails } from "@/utils/pokeapi";

type Props = {
  params: Promise< {pokemon: string}>;
}

export default async function PokemonPage(props: Props) {

  const {pokemon} = await props.params;
  const data = await fetchPokemonDetails(pokemon);

  return (
    <div>
        <h1 className="text-3xl font-bold mb-4">
            {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
        </ul>
    </div>
  );
}