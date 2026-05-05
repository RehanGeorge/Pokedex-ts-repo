import { createInterface } from "node:readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
})

export function cleanInput(input: string): string[] {
    return input.trim().split(/\s+/);
}

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

        console.log(`Your command was: ${command}`);
        rl.prompt();
    })
};