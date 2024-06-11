import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { months } from "..";

export const url = `https://www.theufl.com/teams/birmingham/schedule`;

export async function getSchedule() {
    const driver = generate_driver();

    try {
        await driver.get(url);

        const potentialGameDivs = await driver.findElements(By.className("chakra-container"));
        const games = await Promise.all(
            potentialGameDivs.filter(async (pgd) => {
                const gameHeading = await pgd.findElement(By.className("chakra-heading"));
                return !!gameHeading;
            })
        );
        const gameText = (await Promise.all(games.map((game) => game.getText()))).map((game) => game.split("\n")).filter((splits) => splits.length === 6);

        const consolidated = gameText
            .map((game) => {
                const [week, opponent, datetime] = game;
                const type = opponent.substring(0, 2).toLowerCase() === "at" ? "AWAY" : "**HOME**";

                const [date, time] = datetime.split(" | ");

                const [weekday, month, day] = date.replace(",", "").split(" ");

                const today = new Date();
                const thisYear = today.getFullYear();

                const monthNumber = months[month] as number;
                const gameDate = new Date(thisYear, monthNumber, Number(day));

                const isUpcoming = gameDate > today;

                const formatted = `[${type}] ${week} ${opponent} (${date}, ${time})`;

                return { formatted, isUpcoming };
            })
            .filter((game) => game.isUpcoming);

        return consolidated;
    } finally {
        await driver.quit();
    }
}
