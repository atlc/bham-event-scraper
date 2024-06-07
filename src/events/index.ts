import { loadCityEvents } from "./city";
import { loadMusicEvents } from "./music";
import { loadSportEvents } from "./sports";

function getFormatted(events: { formatted: string }[]) {
    return events.map((event) => event.formatted).join("\n\n");
}

export async function formatEventInfo() {
    const { avondale, ironCity, theNick, saturn, workplay } = await loadMusicEvents();
    const { gardens, zoo } = await loadCityEvents();
    const { barons, legion } = await loadSportEvents();

    const markdown = `# What's Upcoming in Birmingham
    
## Music

### Saturn
${getFormatted(saturn)}

### Iron City
${getFormatted(ironCity)}

### Avondale
${getFormatted(avondale)}

### Workplay
${getFormatted(workplay)}}

### The Nick
${getFormatted(theNick)}}


## City 

### Botanical Gardens
${getFormatted(gardens)}

### The Zoo
${getFormatted(zoo)}

## Sports

### Barons
${getFormatted(barons)}

### Legion
${getFormatted(legion)}

---

Data last scraped ${new Date().toLocaleString()}. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.
`;

    return markdown;
}
