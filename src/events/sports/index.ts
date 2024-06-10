import { getSchedule as getBaronsSchedule } from "./barons";
import { getSchedule as getLegionSchedule } from "./legion";
import { getSchedule as getStallionsSchedule } from "./stallions";
import { getSchedule as getSquadronSchedule } from "./squadron";

export async function loadSportEvents() {
    const sportSchedules = {
        barons: getBaronsSchedule(),
        legion: getLegionSchedule(),
        stallions: getStallionsSchedule(),
        squadron: getSquadronSchedule(),
    };

    const loadedSportSchedules = await Promise.all(Object.entries(sportSchedules).map(async ([key, promise]) => [key, await promise]));

    const { barons, legion, stallions, squadron } = Object.fromEntries(loadedSportSchedules);

    return { barons, legion, stallions, squadron };
}
