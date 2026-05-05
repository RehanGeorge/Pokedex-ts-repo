import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().split(/\s+/);
};

export function startREPL(state: State) {
    state.rl.prompt();

    state.rl.on("line", (line) => {
        const input = cleanInput(line);
        if (input.length === 0 || input[0] === "") {
            state.rl.prompt();
            return;
        }

        const command = input[0].toLowerCase();
        const args = input.slice(1);

        if (command in state.commands) {
            state.commands[command].callback(state, ...args);
        } else {
            console.log(`Unknown command: ${command}`);
        }

        state.rl.prompt();
    });
};