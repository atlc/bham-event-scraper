import { loadCityEvents } from "./city";
import { loadMusicEvents } from "./music";
import { loadSportEvents } from "./sports";

function getFormatted(events: { formatted: string }[]) {
    return events.map((event) => event.formatted).join("\n\n");
}

export async function formatEventInfo() {
    const start = Date.now();

    const { gardens, zoo } = await loadCityEvents();
    const { avondale, ironCity, theNick, saturn, workplay } = await loadMusicEvents();
    const { barons, legion, stallions, squadron } = await loadSportEvents();

    const end = Date.now();

    const runtime = ((end - start) / 1000).toFixed(1);

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

### Museum of Art

### The Zoo
${getFormatted(zoo)}

## Sports

### Barons
${getFormatted(barons)}

### Legion
${getFormatted(legion)}

### Stallions
${getFormatted(stallions)}

### Squadron
${getFormatted(squadron)}

---

Data last scraped ${new Date().toLocaleString()}, taking ${runtime} seconds. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.
`;

    return markdown;
}
