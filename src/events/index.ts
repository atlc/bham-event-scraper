import { loadCityEvents } from "./city";
import { loadEntertainmentEvents } from "./entertainment";
import { loadSportEvents } from "./sports";

export function getFormatted(events: { formatted: string }[]) {
    try {
        if (!events || !events.length) return "No current calendar info available";

        return events.map((event) => event.formatted).join("\n\n");
    } catch (error) {
        console.log("Event Formatting Error", error);
    }
}

export async function formatEventInfo() {
    const start = Date.now();

    const eventSchedules = {
        city: loadCityEvents(),
        entertainment: loadEntertainmentEvents(),
        sports: loadSportEvents(),
    };

    const loadedEvents = await Promise.all(Object.entries(eventSchedules).map(async ([key, promise]) => [key, await promise]));

    const { city, entertainment, sports } = Object.fromEntries(loadedEvents);

    const count = [city, entertainment, sports].reduce((a, b) => a + b.count, 0);

    const end = Date.now();
    const runtime = ((end - start) / 1000).toFixed(1);

    const markdown = `
# What's Upcoming in Birmingham
    
${entertainment.markdown}

${city.markdown}

${sports.markdown}
    
---

Data last scraped ${new Date().toLocaleString()}, taking ${runtime} seconds. Currently tracking ${count} calendars. If I'm broken, ping /u/NotFlameRetardant and tell him he's a bad bot dad.
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
