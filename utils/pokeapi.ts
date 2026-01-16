const BASE_URL = "https://pokeapi.co/api/v2";

export type PokemonList = {
    count: number;
    results: { name: string; url: string }[];
}

export type PokemonDetails = {
    name: string;
    id: number;
    sprites: {
        front_default: string;
        front_shiny: string;
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    moves: {
        move: {
            name: string;
            url: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
    }[];
    location_area_encounters: string;
};

// type LocationList = {
//     results: { name: string; url: string }[];
// };

// type LocationArea = {
//     name: string;
// };

export async function fetchPokemonList(){
    const res = await fetch(`${BASE_URL}/pokemon?limit=100`);
    const pokemon = await res.json() as PokemonList;
    return pokemon;
}

export async function fetchPokemonDetails(name: string) {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`);
    const details = await res.json() as PokemonDetails;
    return details;
}

// export async function fetchLocationList(){
//     const res = await fetch(`${BASE_URL}/location?limit=100`);
//     const locations = await res.json() as LocationList[];
//     return locations.results;
// }