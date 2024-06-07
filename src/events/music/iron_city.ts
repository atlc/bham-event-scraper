import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const url = "https://ironcitybham.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("seven columns"))).slice(0, 7);
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
    } finally {
        await driver.quit();
    }
}
