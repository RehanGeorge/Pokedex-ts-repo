import { initState } from "./state.js";
import { startREPL } from "./repl.js";

async function main() {
    const state = initState();
    startREPL(state);
}

main();