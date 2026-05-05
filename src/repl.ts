import { createInterface } from "node:readline";
import { CLICommand } from "./types/clicommand.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
});

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp
        }
    }
}

export function cleanInput(input: string): string[] {
    return input.trim().split(/\s+/);
};

export function startREPL() {
    rl.prompt();

    rl.on("line", (line) => {
        const input = cleanInput(line);
        if (input.length === 0 || input[0] === "") {
            rl.prompt();
            return;
        }

        const command = input[0].toLowerCase();
        const args = input.slice(1);

        switch (command) {
            case "exit":
                commandExit();
                break;
            case "help":
                commandHelp(getCommands());
                break;
            default:
                console.log(`Unknown command: ${command}`);
        }

        rl.prompt();
    })
};