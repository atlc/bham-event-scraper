import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { MAX_DESCRIPTION_LENGTH } from "..";

const url = "https://www.bcri.org/upcoming-events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = await driver.findElements(By.className("ectbe-content-box"));
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");
            const [date, name, address, blank, description] = sections;

            const desc = description || "No description available";

            const substringedDescription = desc.length > MAX_DESCRIPTION_LENGTH ? `${desc.substring(0, MAX_DESCRIPTION_LENGTH - 2)}...` : desc;

            return { name, date, formatted: `[${date}] ${name} (*${substringedDescription}*)` };
        });
    } catch (error) {
        console.log(error);
        return [{ formatted: "BCRI calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
