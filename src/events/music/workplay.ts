import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

// Can't use their official calendar since every event is just a static image linking to SeeTickets
// const url = "https://workplay.com/events/";

const url = "https://www.seetickets.us/event/penny-circus-grand-champ-bicycle-day-cinema-now/wafform.aspx?_act=fullsearchv3&v3=yes&s=workplay&tag=";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("search-event"))).slice(0, 4);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");
            const [date, name] = sections;
            return { name, date, formatted: `[${date}] ${name}` };
        });
    } finally {
        await driver.quit();
    }
}
