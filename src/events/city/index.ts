import { getSchedule as getMuseum } from "./museum";
import { getSchedule as getGardens } from "./gardens";
import { getSchedule as getZoo } from "./zoo";

export const MAX_DESCRIPTION_LENGTH = 120;

export async function loadCityEvents() {
    const citySchedules = {
        gardens: getGardens(),
        museum: getMuseum(),
        zoo: getZoo(),
    };

    const loadedCitySchedules = await Promise.all(Object.entries(citySchedules).map(async ([key, promise]) => [key, await promise]));
    const { gardens, museum, zoo } = Object.fromEntries(loadedCitySchedules);

    return {
        gardens,
        museum,
        zoo,
    };
}
