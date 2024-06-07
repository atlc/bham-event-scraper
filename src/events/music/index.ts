import { getSchedule as getAvondale } from "./avondale";
import { getSchedule as getIronCity } from "./iron_city";
import { getSchedule as getSaturn } from "./saturn";

export async function loadMusicEvents() {
    const avondale = await getAvondale();
    const ironCity = await getIronCity();
    const saturn = await getSaturn();

    return {
        avondale,
        ironCity,
        saturn,
    };
}
