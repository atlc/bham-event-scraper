import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

export const url = `https://www.bullshockey.net/schedule`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const columns = await driver.findElements(By.css("p.font_8.wixui-rich-text__text>span.wixui-rich-text__text"));

        const hasRemovedTextCalendar = (await columns[0].getText()).toUpperCase().includes("PELHAM CIVIC COMPLEX RULES");

        if (hasRemovedTextCalendar) {
            return [{ formatted: "The Bulls have moved to using a JPEG for ants as their calendar, so check the link above to see upcoming games" }];
        }

        const dateStrings = (await Promise.all(columns.map((date) => date.getText()))).filter((str) => str && !WEEKDAYS.includes(str) && str !== "Birmingham, AL");

        const firstDate = new Date(dateStrings[0]);
        const today = new Date();
        //@ts-ignore
        const diff = firstDate - today;
        const daysApart = diff / 1000 / 60 / 60 / 24;

        if (diff < 0 || daysApart > 30) {
            return [{ formatted: "Currently out of season" }];
        }

        return dateStrings.slice(0, 6).map((ds) => ({ formatted: `[**HOME**] ${ds}` }));
    } catch (error) {
        return [{ formatted: "Bulls are out of season or calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
