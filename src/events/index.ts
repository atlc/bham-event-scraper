import { loadMusicEvents } from "./music";
import { loadSportEvents } from "./sports";

function getFormatted(event: { formatted: string }) {
    return event.formatted;
}

export async function formatEventInfo() {
    const { avondale, ironCity, theNick, saturn, workplay } = await loadMusicEvents();
    const { barons, legion } = await loadSportEvents();

    const markdown = `# What's Upcoming in Birmingham
    
## Music

### Saturn
${saturn.map(getFormatted).join("\n\n")}

### Iron City
${ironCity.map(getFormatted).join("\n\n")}

### Avondale
${avondale.map(getFormatted).join("\n\n")}

### Workplay
${workplay.map(getFormatted).join("\n\n")}}

### The Nick
${theNick.map(getFormatted).join("\n\n")}}


## City 

## Sports

### Barons
${barons.map(getFormatted).join("\n\n")}

### Legion
${legion.map(getFormatted).join("\n\n")}

---

Data last scraped ${new Date().toLocaleString()}. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.
`;

    return markdown;
}
