// app/_components/searchable_list.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { NamedAPIResource} from "@/utils/pokeapi";

type SearchableListProps = {
    items: NamedAPIResource[];
    basePath: string;
};

function formatName(name: string) {
    return name.split("-").map(word =>
        word === "mt" ? "Mt." : word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
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
                className="mb-6 w-full rounded-xl border border-purple-300 bg-white p-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 dark:bg-purple-900 dark:border-purple-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-fr">
                {filteredItems.map((i) => (
                    <li
                        key={i.name}
                        className="flex items-center justify-center rounded-2xl border border-purple-300 bg-white dark:bg-purple-900 p-6 text-center font-medium shadow-sm hover:shadow-md hover:border-purple-400 transition-all">
                        <Link href={`${basePath}/${i.name}`} className="hover:underline">
                            {formatName(i.name)}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}