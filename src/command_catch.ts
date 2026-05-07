import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("Usage: catch <pokemon-name>");
        return;
    }
    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    const pokemon = await state.pokeapi.fetchPokemon(pokemonName);

    // Higher base_experience = harder to catch.
    // catchChance ranges roughly from ~0.8 (low XP) down to ~0.1 (high XP ~300+)
    const catchChance = Math.max(0.1, 1 - pokemon.base_experience / 350);
    if (Math.random() < catchChance) {
        console.log(`${pokemonName} was caught!`);
        console.log("You may now inspect it with the inspect command.");
        state.pokedex[pokemon.name] = pokemon;
    } else {
        console.log(`${pokemonName} escaped!`);
    }
}
