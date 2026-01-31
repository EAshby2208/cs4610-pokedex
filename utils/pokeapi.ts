// utils/pokeapi.ts
const BASE_URL = "https://pokeapi.co/api/v2";


// --- Type Definitions ---
// --- Generic Type Definitions ---
export type NamedAPIResource = {
    name: string;
    url: string;
};
export type NamedAPIList = {
    count: number;
    results: NamedAPIResource[];
};
// --- Specific Type Definitions ---
export type PokemonList = NamedAPIList;
export type PokemonDetails = {
    name: string;
    id: number;
    sprites: {
        front_default: string | null;
        front_shiny: string | null;
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
    moves: {
        move: NamedAPIResource
    }[];
    abilities: {
        ability: {
            name: string;
            url: string;
        };
    }[];
    location_area_encounters: string;
};

export type LocationList = NamedAPIList;
export type LocationDetails = {
    name: string;
    id: number;
    areas: NamedAPIResource[];
    region: NamedAPIResource | null;
};
export type LocationAreaDetails = {
    name: string;
    id: number;
    pokemon_encounters: {
        pokemon: NamedAPIResource;
    }[];
};

export type MoveList = NamedAPIList;
export type MoveDetails = {
    name: string;
    power: number | null;
    accuracy: number | null;
    pp: number | null;
    learned_by_pokemon: NamedAPIResource[];
    flavor_text_entries: {
        flavor_text: string;
        language: NamedAPIResource;
        version_group: NamedAPIResource;
    }[];
};

export type GenerationList = NamedAPIList;
export type GenerationDetails = {
    name: string;
    id: number;
    pokemon_species: NamedAPIResource[];
    main_region: NamedAPIResource;
};

// --- Fetch Functions ---
// --- Pokemon Functions ---
export async function fetchPokemonList(){
    const res = await fetch(`${BASE_URL}/pokemon?limit=200`);
    const pokemon = await res.json() as PokemonList;
    return pokemon;
}
export async function fetchPokemonDetails(name: string) {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`);
    const details = await res.json() as PokemonDetails;
    return details;
}
// --- Location Functions ---
export async function fetchLocationList(){
    const res = await fetch(`${BASE_URL}/location?limit=200`);
    const locations = await res.json() as LocationList;
    return locations;
}
export async function fetchLocationDetails(name: string) {
    const res = await fetch(`${BASE_URL}/location/${name}`);
    const details = await res.json() as LocationDetails;
    return details;
}
export async function fetchLocationAreas(url: string) {
    const res = await fetch(url);
    const areas = await res.json() as LocationAreaDetails;
    return areas;
}
// --- Generation Functions ---
export async function fetchGenerationList(){
    const res = await fetch(`${BASE_URL}/generation`);
    const generations = await res.json() as GenerationList;
    return generations;
}
export async function fetchGenerationDetails(name: string) {
    const res = await fetch(`${BASE_URL}/generation/${name}`);
    const details = await res.json() as GenerationDetails;
    return details;
}
// --- Move Functions ---
export async function fetchMoveList(){
    const res = await fetch(`${BASE_URL}/move?limit=200`);
    const moves = await res.json() as MoveList;
    return moves;
}
export async function fetchMoveDetails(name: string) {
    const res = await fetch(`${BASE_URL}/move/${name}`);
    const details = await res.json() as MoveDetails;
    return details;
}