import { getSchedule as getAvondale } from "./avondale";
import { getSchedule as getIronCity } from "./iron_city";
import { getSchedule as getTheNick } from "./the_nick";
import { getSchedule as getSaturn } from "./saturn";
import { getSchedule as getWorkplay } from "./workplay";

export async function loadMusicEvents() {
    const avondale = await getAvondale();
    const ironCity = await getIronCity();
    const theNick = await getTheNick();
    const saturn = await getSaturn();
    const workplay = await getWorkplay();

    return {
        avondale,
        ironCity,
        theNick,
        saturn,
        workplay,
    };
}
