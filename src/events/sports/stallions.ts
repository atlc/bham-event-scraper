import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

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

                const months: { [key: string]: number } = {
                    January: 0,
                    February: 1,
                    March: 2,
                    April: 3,
                    May: 4,
                    June: 5,
                    July: 6,
                    August: 7,
                    September: 8,
                    October: 9,
                    November: 10,
                    December: 11,
                };

                const today = new Date();
                const thisYear = today.getFullYear();

                const gameDate = new Date(thisYear, months[month], Number(day));

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
getSchedule();
