import { getSchedule as getBarber } from "./barber";
import { getSchedule as getBCRI } from "./bcri";
import { getSchedule as getCityWalk } from "./citywalk";
import { getSchedule as getMuseum } from "./museum";
import { getSchedule as getGardens } from "./gardens";
import { getSchedule as getVulcan } from "./vulcan";
import { getSchedule as getZoo } from "./zoo";
import { getFormatted } from "..";

export async function loadCityEvents() {
    const citySchedules = {
        barber: getBarber(),
        bcri: getBCRI(),
        cityWalk: getCityWalk(),
        gardens: getGardens(),
        museum: getMuseum(),
        vulcan: getVulcan(),
        zoo: getZoo(),
    };

    const count = Object.keys(citySchedules).length;

    const loadedCitySchedules = await Promise.all(Object.entries(citySchedules).map(async ([key, promise]) => [key, await promise]));
    const { barber, bcri, cityWalk, gardens, museum, vulcan, zoo } = Object.fromEntries(loadedCitySchedules);

    const markdown = `## City 

### [Barber](https://barberracingevents.com/upcoming-events/)
${getFormatted(barber)}

### [Botanical Gardens](https://bbgardens.org/events/)
${getFormatted(gardens)}

### [City Walk](https://citywalkbham.com/events/)
${getFormatted(cityWalk)}

### [Civil Rights Institute](https://www.bcri.org/upcoming-events/)
${getFormatted(bcri)}

### [Museum of Art](https://www.artsbma.org/things-to-do/calendar/)
${getFormatted(museum)}

### [The Zoo](https://www.birminghamzoo.com/events/)
${getFormatted(zoo)}

### [Vulcan](https://visitvulcan.com/events/)
${getFormatted(vulcan)}  
`;

    return { markdown, count };
}
