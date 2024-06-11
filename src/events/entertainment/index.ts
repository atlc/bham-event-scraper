import { getSchedule as getAvondale } from "./avondale";
import { getSchedule as getIronCity } from "./iron_city";
import { getSchedule as getTheNick } from "./the_nick";
import { getSchedule as getSaturn } from "./saturn";
import { getSchedule as getWorkplay } from "./workplay";
import { getFormatted } from "..";

export async function loadEntertainmentEvents() {
    const entertainmentSchedules = {
        avondale: getAvondale(),
        ironCity: getIronCity(),
        theNick: getTheNick(),
        saturn: getSaturn(),
        workplay: getWorkplay(),
    };

    const count = Object.keys(entertainmentSchedules).length;

    const loadedEntertainmentSchedules = await Promise.all(Object.entries(entertainmentSchedules).map(async ([key, promise]) => [key, await promise]));

    const { avondale, ironCity, theNick, saturn, workplay } = Object.fromEntries(loadedEntertainmentSchedules);

    const markdown = `
## Music & Entertainment

### [Saturn](https://saturnbirmingham.com/calendar/)
${getFormatted(saturn)}

### [Iron City](https://ironcitybham.com/events/)
${getFormatted(ironCity)}

### [Avondale](https://www.avondalebrewing.com/calendar-tickets)
${getFormatted(avondale)}

### [Workplay](https://workplay.com/events/)
${getFormatted(workplay)}}

### [The Nick](https://www.thenickrocks.com/events/)
${getFormatted(theNick)}}`;

    return { markdown, count };
}
