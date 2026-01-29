// app/moves/[move]/page.tsx
import Link from "next/link";
import { fetchMoveDetails } from "@/utils/pokeapi";

type Props = {
  params: Promise< {move: string}>;
};

export default async function MovePage(props: Props) {
  const { move } = await props.params;
  const data = await fetchMoveDetails(move);

  return (
    <div className="p-8">
      <button onClick={() => history.back()} className="mb-4 text-blue-500 hover:underline">Go Back</button>
        <h1 className="text-3xl font-bold mb-4">
            {move.charAt(0).toUpperCase() + move.slice(1)}</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
        </ul>
    </div>
  )
}