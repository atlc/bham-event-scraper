import firefox from "selenium-webdriver/firefox";
import { Builder } from "selenium-webdriver";
import config from "../config";

const options = new firefox.Options();
options.addArguments("-headless");

options.setBinary(config.selenium.binaries.firefox as string);

export function generate_driver() {
    const driver = new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
    return driver;
}
