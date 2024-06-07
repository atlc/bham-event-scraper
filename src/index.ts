// import { getSchedule } from "./events/music/iron_city";
// getSchedule()

import { formatEventInfo } from "./events";

formatEventInfo().then(console.log);

process.on("uncaughtException", console.log);
