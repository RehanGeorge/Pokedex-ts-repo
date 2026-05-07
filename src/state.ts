import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import commandMap from "./command_map.js";
import commandMapb from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI, type Pokemon } from "./pokeapi.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

export type State = {
    rl: Interface;
    commands: Record<string, CLICommand>;
    pokeapi: PokeAPI;
    nextLocationsURL?: string;
    prevLocationsURL?: string;
    pokedex: Record<string, Pokemon>;
}

export function initState(): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "> ",
    });

    const state: State = {
        rl,
        pokeapi: new PokeAPI(),
        nextLocationsURL: undefined,
        prevLocationsURL: undefined,
        pokedex: {},
        commands: {
            exit: {
                name: "exit",
                description: "Exits the pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "Displays a help message",
                callback: commandHelp,
            },
            map: {
                name: "map",
                description: "Displays the next 20 location areas",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "Displays the previous 20 location areas",
                callback: commandMapb,
            },
            explore: {
                name: "explore",
                description: "Explores a location area and lists its Pokémon",
                callback: commandExplore,
            },
            catch: {
                name: "catch",
                description: "Attempts to catch a Pokémon",
                callback: commandCatch,
            },
            inspect: {
                name: "inspect",
                description: "Inspects a caught Pokémon",
                callback: commandInspect,
            },
            pokedex: {
                name: "pokedex",
                description: "Displays all caught Pokémon",
                callback: commandPokedex,
            },
        },
    };

    return state;
}