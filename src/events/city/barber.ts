import { By } from "selenium-webdriver";
import { generate_driver } from "../../selenium";
import { months } from "..";

const url = "https://barberracingevents.com/upcoming-events/";

export async function getSchedule() {
    const driver = await generate_driver();

    try {
        await driver.get(url);

        const fullCalendar = (await driver.findElements(By.className("wpb_content_element")))[1];
        const listings = await fullCalendar.findElements(By.css("li"));
        const listingText = await Promise.all(listings.map((listing) => listing.getText()));

        return listingText
            .map((lt) => {
                const [dates, title] = lt.split(" | ");
                const [month, days] = dates.split(" ");

                const today = new Date();
                const currentMonthIndex = today.getMonth();
                const ltMonthIndex = months[month] as number;

                if (ltMonthIndex < currentMonthIndex) return null;

                const dateRange = days.split("-");
                const firstLtDay = Number(dateRange[0]);
                const todayDay = today.getDate();

                if (ltMonthIndex === currentMonthIndex) {
                    if (firstLtDay < todayDay) return null;
                }

                return { title, dates, formatted: `[${dates}] ${title || ""}` };
            })
            .filter((x) => x)
            .slice(0, 6);
    } catch (error) {
        console.log(error);
        return [{ formatted: "Barber Motorsports calendar data unavailable at this time" }];
    } finally {
        await driver.quit();
    }
}
