import dotenv from "dotenv";
dotenv.config();

const deployment = {
    isProduction: process.env.NODE_ENV === "production",
};

const selenium = {
    binaries: {
        firefox: process.env.FIREFOX_BIN,
    },
};

function parseEnvBlock(envObj: { [key: string]: string | boolean | undefined }, objectName: string) {
    const missingValues = Object.keys(envObj).filter((key) => envObj[key] === undefined);

    if (missingValues.length) {
        console.log(`Crashing app - the following variables for ${objectName} are missing: ${missingValues.join(", ")}`);
        process.exit(1);
    }
}

parseEnvBlock(deployment, "deployment");
parseEnvBlock(selenium.binaries, "Selenium binaries");

export default {
    deployment,
    selenium,
};
