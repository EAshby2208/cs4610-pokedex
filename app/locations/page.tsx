import Image from "next/image";
import Link from "next/link";
// import { fetchLocationList } from "@/utils/pokeapi";

export default async function Locations() {

  // const locations = await fetchLocationList();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start">
        <section className="w-full max-w-2xl">
          <h2 className="text-2xl font-semibold mb-4">All Locations</h2>
          <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* {locations.results.map((location) => (
              <li key={location.name} className="border-2 border-green-300 dark:border-green-500 bg-green-100 dark:bg-green-800 rounded-lg p-4 flex flex-col items-center hover:shadow-lg hover:bg-green-200 dark:hover:bg-green-700 transition-all">
                <Link href={`/locations/${location.name}`} className="flex flex-col items-center text-black dark:text-black">
                {location.name.charAt(0).toUpperCase() + location.name.slice(1)}
                </Link>
              </li>
            ))} */}
          </ul>
        </section>
      </main>
    </div>
  );
}
