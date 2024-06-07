import { formatEventInfo } from "./events";
formatEventInfo().then(console.log);

// import { getSchedule } from "./events/sports/stallions";
// getSchedule().then(console.log);

process.on("uncaughtException", console.log);
