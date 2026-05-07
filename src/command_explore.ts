import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const locationName = args[0];
    if (!locationName) {
        console.log("Usage: explore <location-area>");
        return;
    }
    console.log(`Exploring ${locationName}...`);
    const data = await state.pokeapi.fetchLocation(locationName);
    console.log("Found Pokemon:");
    for (const encounter of data.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
    }
}
