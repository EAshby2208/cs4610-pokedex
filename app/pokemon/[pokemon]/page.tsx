// app/pokemon/[pokemon]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchPokemonDetails } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";

type Props = {
  params: Promise< {pokemon: string}>;
}

export default async function PokemonPage(props: Props) {

  const {pokemon} = await props.params;
  const data = await fetchPokemonDetails(pokemon);
  // fetch encounter data (location areas) from data.location_area_encounters
  const encounters = await fetch(data.location_area_encounters).then(res => res.json());
  // convert encounters (location-areas) to locations (location names)
  const locations = await Promise.all(
    encounters.map(async (enc: any) => {
      const res = await fetch(enc.location_area.url);
      const area = await res.json();
      return area.location;
    })
  );
  
  const formatStatName = (name: string) => {
    if (name === "hp") return "HP";
    if (name === "special-attack") return "Special Attack";
    if (name === "special-defense") return "Special Defense";
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  const formatLocationName = (name: string) => {
    return name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <BackButton />
        <h1 className="text-3xl font-bold mb-6 capitalize text-purple-900 dark:text-purple-100">
          {data.name}
        </h1>
        <div className="flex gap-8 items-center my-6">
          {data.sprites.front_default && (
            <Image
            className="rounded-xl bg-white p-2 shadow"
            src={data.sprites.front_default}
            alt={data.name}
            width={200}
            height={200}
            />
          )}
          {data.sprites.front_shiny && (
            <Image
            className="rounded-xl bg-white p-2 shadow"
            src={data.sprites.front_shiny}
            alt={data.name}
            width={200}
            height={200}
            />
          )}
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Stats</h2>
        <ul className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {data.stats.map((stat) => (
            <li key={stat.stat.name} className="rounded-lg bg-purple-100 dark:bg-purple-800 p-3 text-center">
              <strong className="capitalize">{formatStatName(stat.stat.name)}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Locations</h2>
        {/* if no known locations, show message */}
        {/* else, list locations and if a location is selected, go to the page related to that location */}
        {locations.length === 0 ? (
          <p className="text-purple-600 dark:text-purple-400 italic">No known locations</p>
        ) : (
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {locations.map((loc) => (
              <li key={loc.name} className="rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-900 p-4 text-center shadow-sm hover:shadow-md transition">
                <Link href={`/locations/${loc.name}`} className="capitalize font-medium text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100">
                  {formatLocationName(loc.name)}
                </Link>
              </li>
            ))}
          </ul>
        )}
        <h2 className="text-2xl font-semibold mt-6 mb-4">Moves</h2>
        {/* list moves and if select move, redirect to moves/{move} page */}
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.moves.map((m) => (
            <li key={m.move.name} className="rounded-xl border border-purple-300 bg-white dark:bg-purple-900 p-4 text-center shadow-sm hover:shadow-md transition">
              <Link href={`/moves/${m.move.name}`} className="capitalize font-medium text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100">
                {m.move.name.replace('-', ' ')}
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
}