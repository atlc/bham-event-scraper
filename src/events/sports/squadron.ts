import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

export const url = `https://birmingham.gleague.nba.com/schedule`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const bodyText = await driver.findElement(By.css("body")).getText();

        const outOfSeason = bodyText.search("The are no games scheduled for your current criteria.") !== -1;

        return outOfSeason ? null : [{ formatted: JSON.stringify(bodyText) }];
    } finally {
        await driver.quit();
    }
}
