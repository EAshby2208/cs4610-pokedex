// app/location/[name]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchLocationDetails } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";

type Props = {
  params: Promise< {name: string}>;
};

export default async function LocationPage(props: Props) {
  const { name } = await props.params;
  const data = await fetchLocationDetails(name);

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
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.areas.map((area) => (
                  <li key={area.name} className="rounded-xl bg-purple-100 dark:bg-purple-800 p-4 text-center shadow-sm hover:shadow-md transition">
                      <Link href={`/locations/areas/${area.name}`} className="capitalize font-medium text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100">
                          {area.name.replaceAll('-', ' ')}
                      </Link>
                  </li>
              ))}
          </ul>
      </div>
    </div>
  );
}