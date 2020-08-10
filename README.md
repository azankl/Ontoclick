# OntoClick v2.0.1

> Turn your clinical description into a proper ontology term.

OntoClick is a Chrome browser extension used by bio researchers to reference ontology class identifiers and preferred labels.

It uses the [NCBO BioPortal REST API](http://bioportal.bioontology.org/), [HPO Jax](https://hpo.jax.org/webjars/swagger-ui/3.20.9/index.html?url=/api/hpo/docs/), [Pryzm Health CR](https://track.health/api/), [EBI Ontology Lookup Search](https://www.ebi.ac.uk/ols/docs/api) and [Neural Concept Recongniser](https://ncr.ccm.sickkids.ca/api_doc/) to fulfil search requests.

OntoClick was prototyped at [Health Hack](https://www.healthhack.com.au/) Sydney Nov 2017 by Dr Andreas Zankl's Team OntoClick and subsequently developed by [LivingryLabs](https://www.livingrylabs.net/). 

OntoClick v2.0.1 was improved, based on initial OntoClick prototype, by Team Zankl (BINF6111) from UNSW.


## Build Prerequisites

* [Yarn](https://yarnpkg.com/en/docs/install)
* [npm](https://docs.npmjs.com)


## Install From Source
``` bash
# install dependencies
yarn install

# build for production with minification
yarn run build

# To install, follow these steps:
Go to Chrome:
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

Unfortunately, since it is under review by the Chrome team, this method of installation is not currently available.

## User Manual
1. Visit a web page in the Chrome browser
2. Three ways to open and search using OntoClick V2:
    1. Highlight any clinical description text or phrase e.g. 'bowed femur', 'Heart defects, especially abnormalities of atrial septation, occur in about 60% of cases', 
       right click to show browser context menu, and finally, 
       left click OntoClick menu item
    2. Click the OntoClick logo on the toolbar to type down the text directly in the search box.
    3. Right click anywhere in the browser and click the Ontoclick button to search immediately (fastest method for a user input quick search)
3. Choose the desired ontology term and the search API/Concept Recogniser
4. Copy desired result by clicking the different copy buttons which include copying notation or label individually, copying notation and label together, copying search text, notation, and label all together or clicking the save to history button when multiple results are desired to be exported. Clear button clears copy history.
5. Right click and click paste to paste the copied text directly or click the export button to download the csv file which contains the copy history.


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
yarn run dev

# build for production with minification
yarn run build

# run unit tests
yarn run unit

# run e2e tests
yarn run e2e

# run all tests
yarn test
```
