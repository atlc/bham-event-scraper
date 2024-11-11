import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const date = new Date();
const YYYY = date.getFullYear();

export const url = `https://www.bhmlegion.com/legion-fc-${YYYY}-schedule/`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const events = await driver.findElements(By.className("GameContainer"));

        const stripped = (await Promise.all(events.map((event) => event.getText())))
            .filter((x) => x)
            .slice(0, 3)
            .filter((str) => !str.includes("RECAP"));

        if (!stripped.length) {
            return [{ formatted: "Legion are out of season or calendar data unavailable at this time" }];
        }

        const formatted = stripped
            .map((str) => str.replace("\nTICKETS", "").replace("\nWATCH", ""))
            .map((str) => {
                const elements = str.split("\n");

                let [type] = elements;
                type = type === "HOME" ? "**HOME**" : "AWAY";

                if (elements.length === 7) {
                    const [_type, date, versus, theme, time, stadium, city] = elements;
                    const formatted = `[${type}] Legion ${versus} (${date} @${time}) [*Special Theme: ${theme}*]`;
                    return { type, date, versus, theme, time, stadium, city, formatted };
                } else {
                    const [_type, date, versus, time, stadium, city] = elements;
                    const formatted = `[${type}] Legion ${versus} (${date} @${time})`;
                    return { type, date, versus, theme: "None", time, stadium, city, formatted };
                }
            });

        return formatted;
    } catch (error) {
        return [{ formatted: "Legion are out of season or calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
