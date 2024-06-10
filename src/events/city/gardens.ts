import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { MAX_DESCRIPTION_LENGTH } from "../";

const url = "https://bbgardens.org/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("tribe-events-calendar-list__event-details"))).slice(0, 7);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");
            const [date, name] = sections;

            const description = sections[sections.length - 1];
            const substringedDescription =
                description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 2)}...` : description;

            const [day, time] = date.split(" | ");

            return { name, date, formatted: `[${day}] ${name} (${time}; *${substringedDescription}*)` };
        });
    } finally {
        await driver.quit();
    }
}
