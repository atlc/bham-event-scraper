import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const url = "https://ironcitybham.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("seven columns"))).slice(0, 4);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");

            if (sections.length === 2) {
                const [artist, date] = sections;
                return { artist, date, formatted: `[${date}] ${artist}` };
            } else {
                const [artist, presenter, date] = sections;
                return { artist, presenter, date, formatted: `[${date}] ${artist}` };
            }
        });
    } catch (error) {
        console.log(error);
        return [{ formatted: "Iron City calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
