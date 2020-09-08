# OntoClick

![build](https://github.com/azankl/Ontoclick/workflows/build/badge.svg)

#### Turn a free text description into a proper ontology term with just one click.
#### Overview

OntoClick is a Chrome browser extension that lets the user hightlight a piece of text and then tries to find a matching Ontology term for it.

Ontoclick currently supports matching terms to the [Human Phenotype Ontology](https://hpo.jax.org/app/), [Gene Ontology](http://geneontology.org), [Mondo Disease Ontology](https://mondo.monarchinitiative.org), [Orphanet Rare Disease Ontology](http://www.orphadata.org/cgi-bin/index.php#ontologies) and [Human Disease Ontology](https://disease-ontology.org).

Ontoclick uses the [NCBO BioPortal Search API](http://data.bioontology.org/documentation#nav_search) to find a matching ontology term, but searches can also be performed with the [NCBO BioPortal Annotator API](http://data.bioontology.org/documentation#nav_annotator), the [EBI Ontology Lookup Service Search API](https://www.ebi.ac.uk/ols/docs/api), the [HPO Search API](https://hpo.jax.org/webjars/swagger-ui/3.20.9/index.html?url=/api/hpo/docs/), the [Pryzm Health Concept Recogniser](https://track.health/api/), and the [SickKids Neural Concept Recogniser](https://ncr.ccm.sickkids.ca/api_doc/)  (the latter four only support searching the Human Phenotype Ontology).

The search results can be copied to the clipboard or saved to a list that can be exported in .CSV format.



#### Acknowledgements

OntoClick was born at [Health Hack Sydney](https://speakerdeck.com/azankl/ontoclick-pitch-healthhack-2017) in November 2017. Many thanks to Team Ontoclick, in particular  Graham Towse from [LivingryLabs](https://www.livingrylabs.net/) for developing the first prototype. The current version was built by Anthony Xu, Yifei (Frank) Luo, Aravind Venkateswaran, and Lianguizi (Alisa) Zhou, bioinformatics students at the University of New South Wales, as part of their BINF6111 engineering project.




### Build Prerequisites

* [Yarn](https://yarnpkg.com/en/docs/install)


### Install From Source
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

## Known Limitations

- Cannot choose a different concept recogniser as a default option, always reverts back to NCBO Bioportal Search




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
