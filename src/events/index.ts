import { loadCityEvents } from "./city";
import { loadMusicEvents } from "./music";
import { loadSportEvents } from "./sports";

function getFormatted(events: { formatted: string }[]) {
    return events.map((event) => event.formatted).join("\n\n");
}

export async function formatEventInfo() {
    const start = Date.now();

    const eventSchedules = {
        cityEvents: loadCityEvents(),
        musicEvents: loadMusicEvents(),
        sportEvents: loadSportEvents(),
    };

    const loadedEvents = await Promise.all(Object.entries(eventSchedules).map(async ([key, promise]) => [key, await promise]));

    const { cityEvents, musicEvents, sportEvents } = Object.fromEntries(loadedEvents);

    const { gardens, museum, vulcan, zoo } = cityEvents;
    const { avondale, ironCity, theNick, saturn, workplay } = musicEvents;
    const { barons, legion, stallions, squadron } = sportEvents;

    const end = Date.now();

    const runtime = ((end - start) / 1000).toFixed(1);

    const music = `## Music

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
    
${music}

${city}

${sports}
    
---

Data last scraped ${new Date().toLocaleString()}, taking ${runtime} seconds. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.
`;

    return markdown;
}
