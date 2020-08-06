# OntoClick v2.0.1

> Turn your clinical description into a proper ontology term.

OntoClick is a Chrome browser extension used by bio researchers to reference ontology class identifiers and preferred labels.

It uses the [NCBO BioPortal REST API](http://bioportal.bioontology.org/),[HPO Jax](), [Pryzm Health CR],[Ontology loop up search EBI] and [Neural Concept Recongniser] to fulfil search requests.

OntoClick was prototyped at [Health Hack](https://www.healthhack.com.au/) Sydney Nov 2017 by Dr Andreas Zankl's Team OntoClick and subsequently developed by [LivingryLabs](https://www.livingrylabs.net/). 

The OntoClick v2.0.1 was improved based on OntoClick prototype by Team Zankl(BINF6111) from UNSW.


## Build Prerequisites

* [Yarn](https://yarnpkg.com/en/docs/install)


## Install From Source
``` bash
# install dependencies
1 . Yarn install
2 . Npm install

# build for production with minification
npm run build

# To install, follow these steps:
Go to chrome:
1. Visit chrome://extensions
2. Enable developer options 
3. Click 'Load unpacked extension...'
4. Select the ontoclick/dist/ folder
```

## Future Product Installation
In the future, users can install the plugin from the chrome store by following steps:
1. Search for OntoClick in chrome store
2. Click ‘Add to Chrome’
3. Click ‘Add extension’ on the pop up window 

Unfortunately, since it is under review by the chrome team, this method of installation is not currently available.

## User Manual
1. Visit a web page in the Chrome browser
2. Three ways to open and search using OntoClick V2
    a. Select any clinical description text e.g. 'bowed femur'
       Right click to show browser context menu
       Left click OntoClick V2 menu item
    b. Click the OntoClick V2 logo on the toolbar to type down the text directly in the search box.
    c. Right click anywhere in the browser and click the ontoclick button to search immediately (fastest method for a user input quick search)
3. Choose the desired ontology term and the search API
4. Copy desired result by clicking the different copy buttons which includes the copying Notation or label individually, copying Notation and label together,   copying search text, notation and label all together or clicking the save to history button when multiple results are desired to be copied. Clear button refreshes copy history.
5. Right click to click paste to paste the copy text directly or click the export button to download the csv file which contains the copy history.


## Development Setup

``` bash
# install dependencies
yarn install

# get your BioPortal REST API key from https://bioportal.bioontology.org/account
open https://bioportal.bioontology.org/account

# add your API key for development builds
cp api/example.api.json api/dev.api.json
open api/dev.api.json

# add your API key for production builds
cp api/example.api.json api/prod.api.json
open api/prod.api.json

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
