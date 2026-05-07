import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor() {
    this.#cache = new Cache(5 * 60 * 1000); // 5 minute cache interval
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ? pageURL : `${PokeAPI.baseURL}/location-area`;
    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      console.log(`[cache] Using cached data for ${url}`);
      return cached;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.statusText}`);
    }
    const data = await response.json() as ShallowLocations;
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const cached = this.#cache.get<Location>(url);
    if (cached) {
      console.log(`[cache] Using cached data for ${url}`);
      return cached;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch location: ${locationName}`);
    }
    const data = await response.json() as Location;
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;
    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      console.log(`[cache] Using cached data for ${url}`);
      return cached;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon: ${pokemonName}`);
    }
    const data = await response.json() as Pokemon;
    this.#cache.add(url, data);
    return data;
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
};

export type Location = {
  id: number;
  name: string;
  game_index: number;
  location: { name: string; url: string };
  pokemon_encounters: {
    pokemon: { name: string; url: string };
  }[];
};