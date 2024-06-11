// import { getSchedule } from "./events/sports/bulls";
// getSchedule().then(console.log);

import { formatEventInfo } from "./events";
formatEventInfo().then(console.log);

process.on("uncaughtException", console.log);
