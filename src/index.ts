import { Command } from 'commander'
import {prompt} from 'inquirer'
import {retrievePrompts} from './prompts'
import {queryWB, writeCSV} from './utils'

const program = new Command()

program
    .command('request')
    .alias("r")
    .description("Request data from the World Bank API")
    .action(() => {
        prompt(retrievePrompts).then(({countryCodes, indicatorCode}) => {
            const codes = countryCodes.split(" ")

            queryWB(codes, indicatorCode)
                .then(response => writeCSV(response))
                .catch(error => console.log(error))

        })   
    })

program.parse(process.argv)