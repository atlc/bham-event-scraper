import { getSchedule as getMuseum } from "./museum";
import { getSchedule as getGardens } from "./gardens";
import { getSchedule as getVulcan } from "./vulcan";
import { getSchedule as getZoo } from "./zoo";

export const MAX_DESCRIPTION_LENGTH = 120;

export async function loadCityEvents() {
    const citySchedules = {
        gardens: getGardens(),
        museum: getMuseum(),
        vulcan: getVulcan(),
        zoo: getZoo(),
    };

    const loadedCitySchedules = await Promise.all(Object.entries(citySchedules).map(async ([key, promise]) => [key, await promise]));
    const { gardens, museum, vulcan, zoo } = Object.fromEntries(loadedCitySchedules);

    console.log({ gardens, vulcan });

    return {
        gardens,
        museum,
        vulcan,
        zoo,
    };
}
