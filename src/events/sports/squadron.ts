import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

export const url = `https://birmingham.gleague.nba.com/schedule`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const gameDivs = await driver.findElements(By.css('[class^="Schedule_gameslist__"]'));
        if (!gameDivs.length) {
            return [{ formatted: "Squadron are out of season or calendar data unavailable at this time" }];
        }

        const stripped = await Promise.all(gameDivs.map(async (gd) => gd.getText()));

        const formatted = stripped.map((text) => {
            const [date, time, description] = text.split("\n\n");
            const [away, home, arena] = description.split("\n");
            const isHome = home === "BIRMINGHAM SQUADRON";

            return { formatted: `[${isHome ? "**Home**" : "Away"}] ${date}, ${time}:\t ${away} @ ${home} (${arena})` };
        });

        return formatted;
    } catch (error) {
        return [{ formatted: "Squadron are out of season or calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
