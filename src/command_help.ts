import { CLICommand } from "./types/clicommand.js";

export function commandHelp(commands: Record<string, CLICommand>) {
        console.log(`Welcome to the Pokedex!
Usage:`);
        for (const commandName in commands) {
            const command = commands[commandName];
            console.log(`    ${command.name}: ${command.description}`);
        }
}