import { getSchedule as getGardens } from "./gardens";
import { getSchedule as getZoo } from "./zoo";

export async function loadCityEvents() {
    const gardens = await getGardens();
    const zoo = await getZoo();

    return {
        gardens,
        zoo,
    };
}
