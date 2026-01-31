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
  const locations: string[] = Array.from(
    new Set(
      encounters.map((e:any) => e.location_area.name.split('-').slice(0, -1).join('-'))
    )
  );
  

  return (
    <div className="p-8">
      <BackButton />
        <h1 className="text-3xl font-bold mb-4 capitalize">
          {data.name}
        </h1>
        <div>
          <Image
          src={data.sprites.front_default}
          alt={data.name}
          width={200}
          height={200}
          />
          <Image
          src={data.sprites.front_shiny}
          alt={data.name}
          width={200}
          height={200}
          />
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Stats</h2>
        <ul className="mt-2">
          {data.stats.map((stat) => (
            <li key={stat.stat.name} className="mb-2">
              <strong className="capitalize">{stat.stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Moves</h2>
        {/* list moves and if select move, redirect to moves/{move} page */}
        <ul className="mt-2">
          {data.moves.map((m) => (
            <li key={m.move.name} className="mb-2">
              <Link href={`/moves/${m.move.name}`} className="text-blue-600 hover:underline capitalize">
                {m.move.name.replace('-', ' ')}
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Locations</h2>
        {/* if no known locations, show message */}
        {/* else, list locations and if a location is selected, go to the page related to that location */}
        {locations.length === 0 ? (
          <p className="text-gray-500 italic">No known locations</p>
        ) : (
          <ul className="mt-2">
            {locations.map((loc: string) => (
              <li key={loc} className="mb-2 capitalize">
                <Link href={`/locations/${loc}`} className="text-blue-600 hover:underline">
                  {loc.replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}