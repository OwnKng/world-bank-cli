#!/usr/bin/env node
import { Command } from 'commander'
import {prompt} from 'inquirer'
import {retrievePrompts} from './prompts'
import {queryWB, writeCSV, getCurrentYear} from './utils'
import chalk from 'chalk'

const program = new Command()

program
    .command('get')
    .alias("g")
    .description("Request data from the World Bank API")
    .action( async() => {

        try {
            const {countryCodes, indicatorCode, dateRange} = await prompt(retrievePrompts)

            const codes = countryCodes.replace(/ /g, ';')

            const dates = dateRange.split(' ')
            const from = parseInt(dates[0])

            const to = dates[1] ? parseInt(dates[1]) : getCurrentYear()
            
            const querryResults = await queryWB(codes, indicatorCode, from, to)
            const path = await writeCSV(querryResults) 

            console.log(chalk.bgHex('#04BCC4').bold(` World Bank data saved in ${path}. Happy analysing! `))

        } catch(err) {
            console.log(chalk.bgRed.bold(err))
        }
    })

program.parse(process.argv)