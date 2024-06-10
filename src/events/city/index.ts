import { getSchedule as getMuseum } from "./museum";
import { getSchedule as getGardens } from "./gardens";
import { getSchedule as getZoo } from "./zoo";

export const MAX_DESCRIPTION_LENGTH = 120;

export async function loadCityEvents() {
    const gardens = await getGardens();
    const museum = await getMuseum();
    const zoo = await getZoo();

    return {
        gardens,
        museum,
        zoo,
    };
}
