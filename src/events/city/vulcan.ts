import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { MAX_DESCRIPTION_LENGTH } from "../";

const url = "https://visitvulcan.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("tribe-events-calendar-list__event-row"))).slice(0, 3);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");

            const [weekday, day, datetime, title, ...rest] = sections;

            const [address, blank, description] = rest.length === 3 ? rest : ["Vulcan Park and Museum 1701 Valley View Drive, Birmingham, United States", ...rest];

            const substringedDescription = description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH - 2)}...` : description;

            const formatted = `[${datetime}] ${title} (*${substringedDescription}*)`;
            return { datetime, title, formatted };
        });
    } catch (error) {
        console.log(error);
        return [{ formatted: "Vulcan calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
