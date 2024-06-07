// import { getSchedule } from "./events/music/workplay";
// getSchedule().then(console.log);

import { formatEventInfo } from "./events";

formatEventInfo().then(console.log);

process.on("uncaughtException", console.log);
