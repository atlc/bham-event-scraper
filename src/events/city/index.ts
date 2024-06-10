import { getSchedule as getBCRI } from "./bcri";
import { getSchedule as getCityWalk } from "./citywalk";
import { getSchedule as getMuseum } from "./museum";
import { getSchedule as getGardens } from "./gardens";
import { getSchedule as getVulcan } from "./vulcan";
import { getSchedule as getZoo } from "./zoo";

export async function loadCityEvents() {
    const citySchedules = {
        bcri: getBCRI(),
        cityWalk: getCityWalk(),
        gardens: getGardens(),
        museum: getMuseum(),
        vulcan: getVulcan(),
        zoo: getZoo(),
    };

    const loadedCitySchedules = await Promise.all(Object.entries(citySchedules).map(async ([key, promise]) => [key, await promise]));
    const { cityWalk, gardens, museum, vulcan, zoo } = Object.fromEntries(loadedCitySchedules);

    return { cityWalk, gardens, museum, vulcan, zoo };
}
