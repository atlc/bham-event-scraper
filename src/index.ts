import fs from "fs";

import { formatEventInfo } from "./events";

formatEventInfo().then(console.log);

process.on("uncaughtException", console.log);
