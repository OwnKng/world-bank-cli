"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const inquirer_1 = require("inquirer");
const prompts_1 = require("./prompts");
const utils_1 = require("./utils");
const program = new commander_1.Command();
program
    .command('request')
    .alias("r")
    .description("Request data from the World Bank API")
    .action(() => {
    inquirer_1.prompt(prompts_1.retrievePrompts).then(({ countryCodes, indicatorCode }) => {
        const codes = countryCodes.split(" ");
        utils_1.queryWB(codes, indicatorCode).then(response => utils_1.writeCSV(response)).catch(error => console.log(error));
    });
});
program.parse(process.argv);
//# sourceMappingURL=index.js.map