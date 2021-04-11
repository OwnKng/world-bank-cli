import axios from 'axios'
import { parse } from 'json2csv'
import {writeFile} from 'fs'
import path = require("path")

export const queryWB = async (country : string[], indicator: string) => {
  const baseUrl = `https://api.worldbank.org/v2/country/${country.join(';')}/indicator/${indicator}?format=json`

  try {
    const resp = await axios.get(baseUrl)

    // get the number of pages for the series 
    const { pages } = resp.data[0]

    // create an empty array to store the results
    let results = []

    // push the first set of results to the array
    results.push(resp.data[1])

    // iterate through pages and return results for each page
    if(pages > 1) {
      for(let i = 2; i <= pages; i++) {
        const url = `${baseUrl}&page=${i}`
        await axios.get(url).then(response => response.data).then(data => results.push(data[1]))
      }
    }

    // clean the results
    results = results.flat()

    results = results.map(d => {
      const { value: indicator } = d.indicator
      const { value: country} = d.country

      return {
        ...d, 
        indicator,
        country
      }

    })

    // Return the results
    return results

  } catch(err) {
    throw new Error('Unable to retrieve data. Check country and indicator codes and try again')
  }

}

export const writeCSV = (data: any) => {

  const directory = path.join(__dirname, `./WorldBankExtract.csv`)

  try {
    const csv = parse(data)

    writeFile(directory, csv, function(err) {
      if(err) throw err
      console.log(`Data retrieved and file saved in ${directory}`)
    })

  } catch (err) {
    console.error(err)
  }
  
}