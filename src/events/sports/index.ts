import { fetchSchedule } from "./barons";
import { getSchedule } from "./legion";

export async function loadSportEvents() {
    const barons = await fetchSchedule();
    const legion = await getSchedule();

    return { barons, legion };
}

import { url as baronsURL } from "./barons";
import { url as legionURL } from "./barons";

export const urls = {
    barons: baronsURL,
    legion: legionURL,
};
