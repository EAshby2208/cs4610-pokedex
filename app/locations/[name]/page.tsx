// app/location/[name]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchLocationDetails, fetchLocationAreas } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";

type Props = {
  params: Promise< {name: string}>;
};

export default async function LocationPage(props: Props) {
  const { name } = await props.params;
  const normalizedName = decodeURIComponent(name).replaceAll(' ', '-').toLowerCase();
  const data = await fetchLocationDetails(normalizedName);

  const areaDetails = await Promise.all(
    data.areas.map((area) => fetchLocationAreas(area.url))
  );

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
          <h1 className="text-3xl font-bold mb-2 capitalize text-purple-900 dark:text-purple-100">
              {data.name.replace('-', ' ')}
          </h1>
          {/* Regions */}
          <div className="mb-8 mt-4 rounded-xl bg-purple-100 dark:bg-purple-800 p-4 shadow">
            <p className="text-lg">
              <span className="font-semibold text-purple-700 dark:text-purple-300">Region:</span>{" "}
              <span className="capitalize">{data.region?.name ?? 'Unknown'}</span>
            </p>
          </div>
          {/* Areas */}
          <h2 className="text-2xl font-semibold mb-4 text-purple-900 dark:text-purple-100">Areas</h2>
          <div className="space-y-6">
            {areaDetails.map((area) => (
              <div key={area.name} className="rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-900 p-4 shadow-sm hover:shadow-md transition">
                {/* Area Name */}
                <h3 className="text-xl font-semibold mb-2 capitalize text-purple-800 dark:text-purple-200">{area.name.replaceAll('-', ' ')}</h3>
                {/* Pokemon List */}
                {area.pokemon_encounters.length === 0 ? (
                  <p className="text-purple-600 dark:text-purple-400 italic">No known Pokemon encounters</p>
                ) : (
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {area.pokemon_encounters.map((e) => (
                      <li key={e.pokemon.name} className="text-purple-700 dark:text-purple-300">
                        <Link href={`/pokemon/${e.pokemon.name}`} className="capitalize rounded-xl border border-purple-300 bg-white dark:bg-purple-800 p-4 block text-center shadow-sm hover:shadow-md transition font-medium hover:text-purple-900 dark:hover:text-purple-100">
                          {e.pokemon.name.replaceAll('-', ' ')}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            </div>
      </div>
    </div>
  );
}