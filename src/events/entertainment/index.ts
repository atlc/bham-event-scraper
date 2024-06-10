import { getSchedule as getAvondale } from "./avondale";
import { getSchedule as getIronCity } from "./iron_city";
import { getSchedule as getTheNick } from "./the_nick";
import { getSchedule as getSaturn } from "./saturn";
import { getSchedule as getWorkplay } from "./workplay";

export async function loadEntertainmentEvents() {
    const entertainmentSchedules = {
        avondale: getAvondale(),
        ironCity: getIronCity(),
        theNick: getTheNick(),
        saturn: getSaturn(),
        workplay: getWorkplay(),
    };

    const loadedEntertainmentSchedules = await Promise.all(Object.entries(entertainmentSchedules).map(async ([key, promise]) => [key, await promise]));

    const { avondale, ironCity, theNick, saturn, workplay } = Object.fromEntries(loadedEntertainmentSchedules);

    return {
        avondale,
        ironCity,
        theNick,
        saturn,
        workplay,
    };
}
