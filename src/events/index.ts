import { loadCityEvents } from "./city";
import { loadEntertainmentEvents } from "./entertainment";
import { loadSportEvents } from "./sports";

function getFormatted(events: { formatted: string }[]) {
    if (!events.length) return "No current calendar info available";

    return events.map((event) => event.formatted).join("\n\n");
}

export async function formatEventInfo() {
    const start = Date.now();

    const eventSchedules = {
        cityEvents: loadCityEvents(),
        entertainmentEvents: loadEntertainmentEvents(),
        sportEvents: loadSportEvents(),
    };

    const loadedEvents = await Promise.all(Object.entries(eventSchedules).map(async ([key, promise]) => [key, await promise]));

    const { cityEvents, entertainmentEvents, sportEvents } = Object.fromEntries(loadedEvents);

    const { bcri, cityWalk, gardens, museum, vulcan, zoo } = cityEvents;
    const { avondale, ironCity, theNick, saturn, workplay } = entertainmentEvents;
    const { barons, legion, stallions, squadron } = sportEvents;

    const end = Date.now();

    const runtime = ((end - start) / 1000).toFixed(1);

    const entertainment = `## Music & Entertainment

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

    const city = `## City 

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
${getFormatted(vulcan)}`;

    const sports = `## Sports

### [Barons](https://www.milb.com/birmingham/schedule)
${getFormatted(barons)}

### [Legion](https://www.bhmlegion.com/legion-fc-2024-schedule/)
${getFormatted(legion)}

### [Stallions](https://www.theufl.com/teams/birmingham/schedule)
${getFormatted(stallions)}

### [Squadron](https://birmingham.gleague.nba.com/schedule)
${getFormatted(squadron)}`;

    const markdown = `# What's Upcoming in Birmingham
    
${entertainment}

${city}

${sports}
    
---

Data last scraped ${new Date().toLocaleString()}, taking ${runtime} seconds. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.
`;

    return markdown;
}

export const MAX_DESCRIPTION_LENGTH = 120;

export const months: { [key: string | number]: number | string } = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
};
