import { loadMusicEvents } from "./music";
import { loadSportEvents } from "./sports";

export async function formatEventInfo() {
    const { saturn } = await loadMusicEvents();
    const { barons, legion } = await loadSportEvents();

    const markdown = `## Music

### Saturn
${saturn.map((e) => e.formatted).join("\n\n")}

## City 

## Sports

### Barons
${barons.map((e) => e.formatted).join("\n\n")}

### Legion
${legion.map((e) => e.formatted).join("\n\n")}


---

Data last scraped ${new Date().toLocaleString()}. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.

`;

    return markdown;
}
