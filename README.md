# OntoClick v0.0.1

> Turn your clinical description into a proper ontology term.

OntoClick is a Chrome browser extension used by bio researchers to reference ontology class identifiers and preferred labels.

It uses the [NCBO BioPortal REST API](http://bioportal.bioontology.org/) to fulfil search requests.

OntoClick was prototyped at [Health Hack](https://www.healthhack.com.au/) Sydney Nov 2017 by Dr Andreas Zankl's Team OntoClick and subsequently developed by [LivingryLabs](https://www.livingrylabs.net/).

## Usage

1. Visit a web page in the Chrome browser
2. Select any clinical description text e.g. 'bowed femur'
3. Right click to show browser context menu
4. Left click OntoClick menu item
5. Copy desired result to clipboard

## Alpha Limitations

* 'Filter by Ontology' is hard coded to the Human Phenotype Ontology
* Does not have 'replace' feature
* Does not have configurable identifier structure e.g. "notation: preferred label"
* Does not work with custom context menus e.g. Google Sheets
* Does not have class detail view

## Build Prerequisites

* [Yarn](https://yarnpkg.com/en/docs/install)

## Install From Source

``` bash
# install dependencies
yarn install

# get your BioPortal REST API key from https://bioportal.bioontology.org/account
open https://bioportal.bioontology.org/account

# add your API key for production builds
cp api/example.api.json api/prod.api.json
open api/prod.api.json

# build for production with minification
npm run build

# To run but not install, use the load-into-chrome script
./bin/load-into-chrome

# To install, follow these steps:
# 1. Start chrome
# 2. Visit chrome://extensions
# 3. Click 'Load unpacked extension...'
# 4. Select the ontoclick/dist/ folder
```

## Install From Release

TODO: Add instructions for installing the extension using a release artefact.

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
