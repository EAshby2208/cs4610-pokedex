// app/pokemon/[pokemon]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchPokemonDetails, NamedAPIList, NamedAPIResource } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";
import SearchableList from "@/app/_components/searchable_list";

type LocationAreaEncounter = {
  location_area: NamedAPIResource;
}
type Props = {
  params: Promise< {pokemon: string}>;
}

export default async function PokemonPage(props: Props) {

  const {pokemon} = await props.params;
  const data = await fetchPokemonDetails(pokemon);
  // fetch encounter data (location areas) from data.location_area_encounters
  const encounters = await fetch(data.location_area_encounters).then(res => res.json()) as LocationAreaEncounter[];
  // convert encounters (location-areas) to locations (location names)
  const locations = await Promise.all(
    encounters.map(async (enc) => {
      const res = await fetch(enc.location_area.url);
      const area = await res.json() as { location: NamedAPIResource };
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
        <h2 className="text-2xl font-semibold mt-6 mb-4">Encounter Locations</h2>
        {/* if no known locations, show message */}
        {/* else, list locations and if a location is selected, go to the page related to that location */}
        {locations.length === 0 ? (
          <p className="text-purple-600 dark:text-purple-400 italic">No known locations</p>
        ) : (
          <SearchableList items={locations.map((loc) => ({ name: formatLocationName(loc.name), url: loc.url }))} basePath="/locations"/>
        )}
        <h2 className="text-2xl font-semibold mt-6 mb-4">Moves</h2>
        {/* list moves and if select move, redirect to moves/{move} page */}
        <SearchableList items={data.moves.map((move) => ({ name: move.move.name, url: move.move.url }))} basePath="/moves"/>
    </div>
  );
}