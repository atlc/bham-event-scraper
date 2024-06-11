import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

export const url = `https://www.bullshockey.net/schedule`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const columns = await driver.findElements(By.css("p.font_8.wixui-rich-text__text>span.wixui-rich-text__text"));
        const dateStrings = (await Promise.all(columns.map((date) => date.getText()))).filter(
            (str) => str && !WEEKDAYS.includes(str) && str !== "Birmingham, AL"
        );

        const firstDate = new Date(dateStrings[0]);
        const today = new Date();
        //@ts-ignore
        const diff = firstDate - today;
        const daysApart = diff / 1000 / 60 / 60 / 24;

        if (diff < 0 || daysApart > 30) {
            return [{ formatted: "Currently out of season" }];
        }

        return dateStrings.slice(0, 6).map((ds) => ({ formatted: `[**HOME**] ${ds}` }));
    } finally {
        await driver.quit();
    }
}
