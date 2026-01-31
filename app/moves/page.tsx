// app/moves/page.tsx
import Image from "next/image";
import Link from "next/link";
import { fetchMoveList } from "@/utils/pokeapi";
import SearchableList from "@/app/_components/searchable_list";

export default async function Moves() {
  const moves = await fetchMoveList();

  return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
        <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
          <section className="w-full max-w-2xl">
            <section className="mt-10 w-full">
              <h2 className="text-2xl font-semibold mb-4">All Moves</h2>
              <SearchableList items={moves.results} basePath="/moves"/>
            </section>
          </section>
        </main>
      </div>
    );
}