import { getSchedule as getSaturn } from "./saturn";

export async function loadMusicEvents() {
    const saturn = await getSaturn();

    return {
        saturn,
    };
}
