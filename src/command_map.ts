import type { State } from "./state.js";

export default async function commandMap(state: State): Promise<void> {
    const data = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = data.next ?? undefined;
    state.prevLocationsURL = data.previous ?? undefined;
    for (const location of data.results) {
        console.log(location.name);
    }
}