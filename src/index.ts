import express from "express";

// import { getSchedule } from "./events/sports/bulls";
// getSchedule().then(console.log);

import fs from "fs";
import { formatEventInfo } from "./events";

// Bumping this up since there will be a bunch of concurrent selenium windows
process.setMaxListeners(20);

if (process.env.NODE_ENV !== "production") {
    formatEventInfo().then(saveToFile);

    function saveToFile(data: string) {
        console.log(data);
        fs.writeFileSync("WEEKLY.md", data);
    }
} else {
    const app = express();

    app.get("/api/events", async (req, res) => {
        formatEventInfo().then((markdown) => res.json({ markdown }));
    });
}

process.on("uncaughtException", console.log);
