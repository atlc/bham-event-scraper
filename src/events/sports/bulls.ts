import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { capitalize } from "..";

export const url = `https://www.bullshockey.net/game-promotions`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const dump = (await driver.findElements(By.css("h2")))[1];

        if (!dump) throw new Error("No massive calendar crammed under the h2 found");

        const today = new Date();
        const thisYear = today.getFullYear();
        let year = thisYear;
        const thisMonth = today.getMonth();
        let m = null;

        const gameBlocks = (await dump.getText()).split("\n\n\n").map((str) => {
            const [date, title, ...desc] = str.split("\n");

            const [weekday, month, day] = date.split(" ");
            m = new Date(`${month} 1, ${year}`).getMonth();

            if (m && thisMonth < m) year += 1;

            const gameDate = new Date(`${month} ${day}, ${year}`);

            const formattedDate = `${capitalize(weekday)}, ${capitalize(month)} ${day}, ${year}`;

            const formattedTitle = title
                .split(" ")
                .map((word) => capitalize(word))
                .join(" ");

            const formatted = `[${formattedDate}] (${formattedTitle}): *${desc.join("; ")}*`;

            return { formatted, isPast: today > gameDate };
        });

        const upcoming = gameBlocks.filter((game) => !game.isPast).slice(0, 4);

        if (!upcoming.length) throw new Error("There are no future upcoming Bulls games (or at least home giveaways)");

        return upcoming;
    } catch (error) {
        console.log(error);
        return [{ formatted: "Bulls are out of season or calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
