// app/moves/[move]/page.tsx
import Link from "next/link";
import { fetchMoveDetails } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";

type Props = {
  params: Promise< {move: string}>;
};

export default async function MovePage(props: Props) {
  const { move } = await props.params;
  const data = await fetchMoveDetails(move);

  return (
    <div className="p-8">
      <BackButton />
        <h1 className="text-3xl font-bold mb-4 capitalize">
            {data.name.replace('-', ' ')}
        </h1>
        <ul className="space-y-2">
            <li><strong>Power:</strong> {data.power ?? '-'}</li>
            <li><strong>Accuracy:</strong> {data.accuracy ?? '-'}</li>
            <li><strong>PP:</strong> {data.pp ?? '-'}</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Flavor Text</h2>
        <ul className="mt-2">
            {/* list flavor text entries */}
            
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Learned By Pokemon</h2>
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.learned_by_pokemon.map((p) => (
                <li key={p.name} className="capitalize">
                    <Link href={`/pokemon/${p.name}`} className="text-blue-600 hover:underline">
                        {p.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  );
}