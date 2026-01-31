// app/generations/[name]/page.tsx
import Link from "next/link";
import { fetchGenerationDetails } from "@/utils/pokeapi";
import BackButton from "@/app/_components/back_button";
import SearchableList from "@/app/_components/searchable_list";

type Props = {
  params: Promise< {name: string}>;
};

export default async function GenerationPage(props: Props) {
  const { name } = await props.params;
  const data = await fetchGenerationDetails(name);

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <BackButton />
        {/* Generation */}
        <h1 className="text-3xl font-bold mb-6 text-purple-900 dark:text-purple-100">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h1>
        {/* Primary Region */}
        <p className="mb-8 rounded-xl border border-purple-300 bg-purple-50 dark:bg-purple-900 p-4 text-center shadow-sm hover:shadow-md transition">
          <span className="font-semibold">Primary Region:</span>{" "}
          {data.main_region.name.charAt(0).toUpperCase() + data.main_region.name.slice(1)}
        </p>
        {/* Pokemon List */}
        <h2 className="text-2xl font-semibold mt-6 mb-4">Pokémon Species</h2>
        <SearchableList items={data.pokemon_species} basePath="/pokemon"/>
      </div>
    </div>
  );
}