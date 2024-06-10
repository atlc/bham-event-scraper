import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";

const url = "https://saturnbirmingham.com/calendar/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        // Grab this month and next month's calendar in the event you're near the end of the month
        const calendars = (await driver.findElements(By.className("seetickets-calendar"))).slice(0, 2);

        const monthTitles = await Promise.all(calendars.map((cal) => cal.findElement(By.xpath("preceding-sibling::*[1]")).getText()));

        const events = await Promise.all(calendars.map((cal) => cal.findElements(By.className("seetickets-calendar-event-container"))));

        const eventDates = (
            await Promise.all(
                events.map(async (monthEvents, i) => {
                    const monthEventDates = await Promise.all(
                        monthEvents.map(async (me) => {
                            const [month, year] = monthTitles[i].split(" ");
                            const day = await me.findElement(By.xpath("preceding-sibling::*[1]")).getText();
                            const dateString = `${month} ${day} ${year}`;
                            return dateString;
                        })
                    );
                    return monthEventDates;
                })
            )
        ).flat();

        const eventShortlist = await Promise.all(
            events
                .flat()
                .slice(0, 8)
                .map(async (event, i) => {
                    const date = eventDates[i];
                    const text = await event.getText();
                    return { date, text };
                })
        );

        const consolidated = eventShortlist.map((es, i) => {
            if (es.date.length > 20) {
                es.date = eventShortlist[i - 1].date;
            }

            const text = es.text
                .replace(/[\n]+/g, " ")
                .replace(/Show/g, " (Show")
                .replace(/PM/g, "PM)")
                .replace(/AM/g, "AM)")
                .replace(/M\)Doors/g, "M, Doors)")
                .replace(/MDoors/g, "M, Doors)")
                .replace(/BUY TICKETS/g, "")
                .replace(/NOT AVAILABLE/g, "")
                .replace(") ", ", ")
                .replace(", )", ")")
                .replace(" )", "")
                .replace(/, \n/g, ")")
                .replace(",  ", ") ")
                .replace(") Doors", ", Doors")
                .replace(/  /g, " ")
                .replace(/ $/g, "")
                .replace(/,$/g, ")");

            const formatted = `[${es.date}] ${text}`;

            return { ...es, formatted };
        });

        return consolidated;
    } finally {
        await driver.quit();
    }
}
