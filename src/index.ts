// import { getSchedule } from "./events/city/citywalk";
// getSchedule().then(console.log);

import { formatEventInfo } from "./events";
formatEventInfo().then(console.log);

process.on("uncaughtException", console.log);
