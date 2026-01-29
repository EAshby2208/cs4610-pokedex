// app/generations/[name]/page.tsx
import Link from "next/link";
import { fetchGenerationDetails } from "@/utils/pokeapi";

type Props = {
  params: Promise< {name: string}>;
};

export default async function GenerationPage(props: Props) {
  const { name } = await props.params;
  const generation = await fetchGenerationDetails(name);

  return (
    <div className="p-8">
        <button onClick={() => history.back()} className="mb-4 text-blue-500 hover:underline">Go Back</button>
        <h1 className="text-3xl font-bold mb-4">
            {name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {generation.pokemon_species.map((poke: any) => (
                <li key={poke.name} className="border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition-shadow">
                  <Link href={`/pokemon/${poke.name}`} className="flex flex-col items-center">
                  {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                  </Link>
                </li>
            ))}
        </ul>
    </div>
  );
}