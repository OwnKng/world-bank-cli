# World Bank CLI

The World Bank CLI is a command line interface to retrieve data from the [World Bank's API](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation) and save it in a csv file.

## Usage

To retrieve data from the World Bank API simply type `worldbank get` into your terminal.

```
worldbank get
```

The World Bank CLI will then provide you with a few options to specify which data points to request, which countries to download the data for, as well as the time period covered.

Once your request is made, the returned data will be saved in a csv file to your /downloads folder.
