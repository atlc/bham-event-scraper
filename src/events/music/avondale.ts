import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const url = "https://www.avondalebrewing.com/calendar-tickets";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const events = (await driver.findElements(By.className("eventlist-event"))).slice(0, 7);
        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event) => {
            const sections = event.split("\n");

            const [month, day, name, flatTime, desc, doorsTime, buttonText] = sections;

            const time = sections.length === 7 ? doorsTime : flatTime.replace("M ", "M - ");
            const date = `${month} ${day}`;

            return { name, date, formatted: `[${date}] ${name} (${time})` };
        });
    } finally {
        await driver.quit();
    }
}
