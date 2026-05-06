import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.trim().split(/\s+/);
};

export function startREPL(state: State) {
    state.rl.prompt();

    state.rl.on("line", async (line) => {
        const input = cleanInput(line);
        if (input.length === 0 || input[0] === "") {
            state.rl.prompt();
            return;
        }

        const command = input[0].toLowerCase();
        const args = input.slice(1);

        if (command in state.commands) {
            try {
                await state.commands[command].callback(state, ...args);
            } catch (err) {
                console.error(`Error: ${err instanceof Error ? err.message : err}`);
            }
        } else {
            console.log(`Unknown command: ${command}`);
        }

        state.rl.prompt();
    });
};