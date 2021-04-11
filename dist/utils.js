"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCSV = exports.getCurrentYear = exports.queryWB = void 0;
const axios_1 = require("axios");
const json2csv_1 = require("json2csv");
const fs_1 = require("fs");
const path = require("path");
const queryWB = async (country, indicator, from, to) => {
    const baseUrl = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?&date=${from}:${to}&per_page=100&format=json`;
    try {
        const resp = await axios_1.default.get(baseUrl);
        // get the number of pages for the series 
        const { pages } = resp.data[0];
        // create an empty array to store the results
        let results = [];
        // push the first set of results to the array
        results.push(resp.data[1]);
        // iterate through pages and return results for each page
        if (pages > 1) {
            for (let i = 2; i <= pages; i++) {
                const url = `${baseUrl}&page=${i}`;
                await axios_1.default.get(url).then(response => response.data).then(data => results.push(data[1]));
            }
        }
        // clean the results
        results = results.flat();
        results = results.map(d => {
            const { value: indicator } = d.indicator;
            const { value: country } = d.country;
            return Object.assign(Object.assign({}, d), { indicator,
                country });
        });
        // Return the results
        return results;
    }
    catch (err) {
        throw new Error('Unable to retrieve data. Check country and indicator codes and try again');
    }
};
exports.queryWB = queryWB;
const getCurrentYear = () => {
    const d = new Date();
    return d.getFullYear();
};
exports.getCurrentYear = getCurrentYear;
const writeCSV = (data) => {
    const directory = path.join('./Downloads', `./WorldBankExtract.csv`);
    try {
        const csv = json2csv_1.parse(data);
        fs_1.writeFile(directory, csv, function (err) {
            if (err)
                throw err;
        });
        return directory;
    }
    catch (err) {
        console.error(err);
    }
};
exports.writeCSV = writeCSV;
//# sourceMappingURL=utils.js.map