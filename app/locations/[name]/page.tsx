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
      <BackButton />
        <h1 className="text-3xl font-bold mb-4 capitalize">
            {data.name.replace('-', ' ')}
        </h1>
        <p><strong>Region:</strong> {data.region?.name ?? 'Unknown'}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Areas</h2>
        <ul className="mt-2">
            {data.areas.map((area) => (
                <li key={area.name} className="capitalize">
                    <Link href={`/locations/areas/${area.name}`} className="text-blue-600 hover:underline">
                        {area.name.replace('-', ' ')}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  );
}