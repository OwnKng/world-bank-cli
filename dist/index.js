#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = require("inquirer");
const prompts_1 = require("./prompts");
const utils_1 = require("./utils");
const chalk_1 = require("chalk");
const program = new commander_1.Command();
program
    .command('get')
    .alias("g")
    .description("Request data from the World Bank API")
    .action(async () => {
    try {
        const { countryCodes, indicatorCode, dateRange } = await inquirer_1.prompt(prompts_1.retrievePrompts);
        const codes = countryCodes.replace(/ /g, ';');
        const dates = dateRange.split(' ');
        const from = parseInt(dates[0]);
        const to = dates[1] ? parseInt(dates[1]) : utils_1.getCurrentYear();
        const querryResults = await utils_1.queryWB(codes, indicatorCode, from, to);
        const path = utils_1.writeCSV(querryResults);
        console.log(chalk_1.default.bgHex('#04BCC4').bold(` World Bank data saved in /${path}. Happy analysing! `));
    }
    catch (err) {
        console.log(chalk_1.default.bgRed.bold(err));
    }
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map