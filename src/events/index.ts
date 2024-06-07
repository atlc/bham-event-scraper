import { loadMusicEvents } from "./music";
import { loadSportEvents } from "./sports";

export async function formatEventInfo() {
    const { avondale, ironCity, saturn } = await loadMusicEvents();
    const { barons, legion } = await loadSportEvents();

    const markdown = `# What's Happening in Birmingham Soon
    
## Music

### Saturn
${saturn.map((e) => e.formatted).join("\n\n")}

### Iron City
${ironCity.map((e) => e.formatted).join("\n\n")}

### Avondale
${avondale.map((e) => e.formatted).join("\n\n")}

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
