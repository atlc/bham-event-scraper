import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { MAX_DESCRIPTION_LENGTH } from "./";

const url = "https://visitvulcan.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("tribe-events-calendar-list__event-details"))).slice(0, 3);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");

            const [date, name, area, description] = sections;

            const substringedDescription =
                description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 2)}...` : description;

            const [day, time] = date.split(" @ ");

            const formatted = `[${day}] ${name} - ${area} (${time ? time + "; " : ""}*${substringedDescription}*)`;
            return { day, time, name, formatted };
        });
    } finally {
        await driver.quit();
    }
}
