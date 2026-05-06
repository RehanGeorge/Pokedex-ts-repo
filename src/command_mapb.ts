import type { State } from "./state.js";

export default async function commandMapb(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const data = await state.pokeapi.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = data.next ?? undefined;
    state.prevLocationsURL = data.previous ?? undefined;
    for (const location of data.results) {
        console.log(location.name);
    }
}
