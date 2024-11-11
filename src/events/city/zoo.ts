import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { MAX_DESCRIPTION_LENGTH } from "../";

const url = "https://www.birminghamzoo.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("tribe-events-calendar-list__event-details"))).slice(0, 7);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");
            const [date, name, description] = sections;

            const [day, time] = date.split(" @ ");

            const substringedDescription = description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...` : description;

            const formatted = `[${day}] ${name} (${time ? time + "; " : ""}*${substringedDescription}*)`;
            return { day, time, name, formatted };
        });
    } catch (error) {
        console.log(error);
        return [{ formatted: "Zoo calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
