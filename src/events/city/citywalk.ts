import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { months } from "..";

const url = "https://citywalkbham.com/events/";

export async function getSchedule() {
    const driver = await generate_driver();

    const today = new Date();
    const thisYear = today.getFullYear();
    const thisMonth = today.getMonth();
    const maxDays = new Date(thisYear, thisMonth + 1, 0).getDate();

    const monthString = months[thisMonth];
    const nextMonthString = months[thisMonth === 11 ? 0 : thisMonth + 1];

    try {
        await driver.get(url);

        const pastAndPresentEvents = await driver.findElements(By.className("tribe-events-calendar-month__day"));

        const todaysClass = "tribe-events-calendar-month__day--current";
        const eventsClassLists = await Promise.all(pastAndPresentEvents.map((event) => event.getAttribute("class")));

        let todaysIndex = eventsClassLists.findIndex((ecl) => ecl.includes(todaysClass));

        if (todaysIndex === -1) return [{ formatted: "Unable to get CityWalk calendar info at this time" }];

        const events = pastAndPresentEvents.slice(todaysIndex, todaysIndex + 7);

        const eventText = await Promise.all(events.map((event) => event.getText()));

        return eventText.map((event, i) => {
            const sections = event.split("\n");
            const [eventQuantityStr, day, ...eventSections] = sections;

            let description = "";

            let dateString = "";

            if (i === 0) {
                dateString = `${monthString} ${day}`;
            } else {
                const firstEventDay = eventText[i].split("\n")[1];
                if (Number(day) < Number(firstEventDay)) {
                    dateString = `${nextMonthString} ${day}`;
                } else {
                    dateString = `${monthString} ${day}`;
                }
            }

            for (let i = 0; i < eventSections.length; i += 2) {
                const time = eventSections[i];
                const event = eventSections[i + 1];
                description += `"${event}" (${time});  `;
            }

            return { day, monthString, description, formatted: `[${dateString}] ${description} ` };
        });
    } finally {
        await driver.quit();
    }
}
