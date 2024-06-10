import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const url = "https://www.thenickrocks.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("tw-section"))).slice(0, 7);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");
            const [weekday, day, name, venue, time, ages, cost] = sections;
            const date = `${weekday}, ${day.replace(/ /g, "")}`;

            return { name, date, formatted: `[${date}] ${name} (${time}; ${cost})` };
        });
    } finally {
        await driver.quit();
    }
}
