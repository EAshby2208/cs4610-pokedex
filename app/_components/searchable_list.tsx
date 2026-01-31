// app/_components/searchable_list.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { NamedAPIResource} from "@/utils/pokeapi";

type SearchableListProps = {
    items: NamedAPIResource[];
    basePath: string;
};

export default function SearchableList({ items, basePath }: SearchableListProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredItems = items.filter((i) =>
        i.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                className="mb-4 w-1/2 rounded-lg border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {filteredItems.map((i) => (
                    <li
                        key={i.name}
                        className="rounded-lg border-2 border-purple-300 bg-purple-100 p-4 text-center text-gray-900 dark:border-purple-500 dark:bg-purple-800 dark:text-white hover:shadow-lg hover:bg-purple-200 dark:hover:bg-purple-700 transition-all">
                        <Link href={`${basePath}/${i.name}`} className="hover:underline">
                            {i.name.charAt(0).toUpperCase() + i.name.slice(1)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}