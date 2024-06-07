import { fetchSchedule } from "./barons";
import { getSchedule } from "./legion";

export async function loadSportEvents() {
    const barons = await fetchSchedule();
    const legion = await getSchedule();

    return { barons, legion };
}
