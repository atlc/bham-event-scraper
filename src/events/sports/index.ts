import { getSchedule as getBaronsSchedule } from "./barons";
import { getSchedule as getBullsSchedule } from "./bulls";
import { getSchedule as getLegionSchedule } from "./legion";
import { getSchedule as getStallionsSchedule } from "./stallions";
import { getSchedule as getSquadronSchedule } from "./squadron";
import { getFormatted } from "..";

export async function loadSportEvents() {
    const sportSchedules = {
        barons: getBaronsSchedule(),
        bulls: getBullsSchedule(),
        legion: getLegionSchedule(),
        stallions: getStallionsSchedule(),
        squadron: getSquadronSchedule(),
    };

    const count = Object.keys(sportSchedules).length;

    const loadedSportSchedules = await Promise.all(Object.entries(sportSchedules).map(async ([key, promise]) => [key, await promise]));

    const { barons, bulls, legion, stallions, squadron } = Object.fromEntries(loadedSportSchedules);

    const markdown = `## Sports

### [Barons](https://www.milb.com/birmingham/schedule)
${getFormatted(barons)}

### [Legion](https://www.bhmlegion.com/legion-fc-2024-schedule/)
${getFormatted(legion)}

### [Stallions](https://www.theufl.com/teams/birmingham/schedule)
${getFormatted(stallions)}

### [Squadron](https://birmingham.gleague.nba.com/schedule)
${getFormatted(squadron)}

### [Bulls](https://www.bullshockey.net/schedule)
${getFormatted(bulls)}`;

    return { markdown, count };
}
