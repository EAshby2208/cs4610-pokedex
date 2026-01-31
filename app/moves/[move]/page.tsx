// app/moves/[move]/page.tsx
import Link from "next/link";
import { fetchMoveDetails } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";
import SearchableList from "@/app/_components/searchable_list";

type Props = {
  params: Promise< {move: string}>;
};

export default async function MovePage(props: Props) {
  const { move } = await props.params;
  const data = await fetchMoveDetails(move);
  const formatName = (name: string) => {
    return name.split("-").map(word =>
        word === "mt" ? "Mt." : word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
          <h1 className="text-3xl font-bold mb-6 capitalize text-purple-900 dark:text-purple-100">
              {formatName(data.name)}
          </h1>
          {/* Move Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
              <div className="rounded-xl bg-purple-100 dark:bg-purple-800 p-4 text-center shadow">
                  <p className="text-sm text-purple-600 dark:text-purple-300">Power</p>
                  <p className="text-xl font-bold">{data.power ?? "-"}</p>
              </div>
              <div className="rounded-xl bg-purple-100 dark:bg-purple-800 p-4 text-center shadow">
                  <p className="text-sm text-purple-600 dark:text-purple-300">Accuracy</p>
                  <p className="text-xl font-bold">{data.accuracy ?? "-"}</p>
              </div>
              <div className="rounded-xl bg-purple-100 dark:bg-purple-800 p-4 text-center shadow">
                  <p className="text-sm text-purple-600 dark:text-purple-300">PP</p>
                  <p className="text-xl font-bold">{data.pp ?? "-"}</p>
              </div >
          </div>
          {/* Flavor Text */}
          <h2 className="text-2xl font-semibold mt-6 mb-4">Flavor Text</h2>
          <ul className="mt-2">
              {/* list flavor text entries */}
              {data.flavor_text_entries
                .filter((entry) => entry.language.name === 'en')
                .map((entry, index) => (
                  <li key={index} className="rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-900 p-4 mb-4 shadow-sm">
                    <p className="font-semibold capitalize text-gray-700 mb-1">
                      {entry.version_group.name.replaceAll('-', ' ')}
                    </p>
                    <p className="italic">
                      {entry.flavor_text.replace(/\n|\f/g, ' ')}
                    </p>
                  </li>
                ))}
                {/* (above code block) replace newlines and form feeds with space */}
          </ul>
          {/* Learned By Pokemon */}
          <h2 className="text-2xl font-semibold mt-6 mb-4 text-purple-900 dark:text-purple-100">Learned By Pokémon</h2>
          <SearchableList items={data.learned_by_pokemon} basePath="/pokemon"/>
      </div>
    </div>
  );
}