import { fetchSchedule as getBaronsSchedule } from "./barons";
import { getSchedule as getLegionSchedule } from "./legion";
import { getSchedule as getStallionsSchedule } from "./stallions";
import { getSchedule as getSquadronSchedule } from "./squadron";

export async function loadSportEvents() {
    const barons = await getBaronsSchedule();
    const legion = await getLegionSchedule();
    const stallions = await getStallionsSchedule();
    const squadron = await getSquadronSchedule();

    return { barons, legion, stallions, squadron };
}
