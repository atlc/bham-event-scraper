import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const url = "https://www.artsbma.org/things-to-do/calendar/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("tribe-events-calendar-list__event-details"))).slice(0, 7);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");

            const [date, name, area, description] = sections;

            const [day, time] = date.split(" @ ");

            const formatted = `[${day}] ${name} - ${area} (${time ? time + "; " : ""}*${description}*)`;
            return { day, time, name, formatted };
        });
    } finally {
        await driver.quit();
    }
}
