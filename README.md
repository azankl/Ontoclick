# Ontoclick

![build](https://github.com/azankl/Ontoclick/workflows/build/badge.svg)

#### Turn a free text description into a proper ontology term with just one click.
### Overview

Ontoclick is a web browser extension for Chrome and Firefox browsers that lets the user highlight a piece of text and then tries to find a matching Ontology term for it.

Ontoclick currently supports matching terms to the [Human Phenotype Ontology](https://hpo.jax.org/app/), [Gene Ontology](http://geneontology.org), [Mondo Disease Ontology](https://mondo.monarchinitiative.org), [Orphanet Rare Disease Ontology](http://www.orphadata.org/cgi-bin/index.php#ontologies) and [Human Disease Ontology](https://disease-ontology.org).

Ontoclick uses the [NCBO BioPortal Search API](http://data.bioontology.org/documentation#nav_search) to find a matching ontology term, but searches can also be performed with the [NCBO BioPortal Annotator API](http://data.bioontology.org/documentation#nav_annotator), the [EBI Ontology Lookup Service Search API](https://www.ebi.ac.uk/ols/docs/api) or the [HPO Search API](https://hpo.jax.org/webjars/swagger-ui/3.20.9/index.html?url=/api/hpo/docs/) (the latter two only support searching the Human Phenotype Ontology).

The search results can be copied to the clipboard or saved to a list that can be exported in .CSV format.

### Publication

*Ontoclick: a web browser extension to facilitate biomedical knowledge curation*\
[BioRxiv](https://www.biorxiv.org/content/10.1101/2021.03.04.433993v2) or [Bioinformatics (Oxford University Press)](https://doi.org/10.1093/bioinformatics/btab520)

### Acknowledgements

Ontoclick was born at [Health Hack Sydney](https://speakerdeck.com/azankl/ontoclick-pitch-healthhack-2017) in November 2017. Many thanks to Team Ontoclick, in particular Graham Towse from [LivingryLabs](https://www.livingrylabs.net/) for developing the first prototype. Many thanks to Anthony Xu, Yifei (Frank) Luo, Aravind Venkateswaran, and Lianguizi (Alisa) Zhou, for further improving this prototype.

### Install for Chrome

Ontoclick is available on the Chrome Store [here](https://chrome.google.com/webstore/detail/ontoclick/nepbilmonlfaigoeldkbimkeihligbgf).

### Install for Firefox

Ontoclick is available as a Firefox Add-On [here](https://addons.mozilla.org/en-US/firefox/addon/ontoclick/)

### How to Use the Extension

1. Visit a web page in your browser
2. Highlight the text you want to search for, right-click to show the browser context menu and select Ontoclick from the context menu.
3. The Ontoclick popup opens and displays matching ontology terms from the Human Phenotype Ontology.
4. Click on the '+' icon in front of a term to see more information about the term (if available).
5. Hover over a term to see additional icons:
   - click the 'copy' icon next to the Ontology ID to copy the Ontology ID
   - click the 'copy' icon next to the Label to copy the Ontology Label
   - click the 'copy' icon in the 'Actions' column to copy the Ontology ID _and_ the Label
   - click the 'highlighter' icon in the 'Actions' column to copy the highlighted text _and_ the Ontology ID _and_ the Label.
   - click the 'disc' icon in the 'Actions' column to save the highlighted text, Ontology ID and Label to Ontoclick's history list. The number in the right upper corner of the Ontoclick window shows the number of items saved to the history list. Click the 'download' icon to download the history list as a .CSV file. Click the 'rubber' icon to erase the history list.
6. If no suitable terms are retrieved, click on the triangle next to 'NCBO Bioportal Search' to re-run the search with a different concept recogniser. The result window will update immediately with the new results. The different concept recognisers all have their strengths and weaknesses, try different ones to see what gives the best results.
7. Click on the triangle next to 'Human Phenotype Ontology' to select another (or additional) ontologies. This only works when 'NCBO Bioportal Search' or 'NCBO Bioportal Annotator' are selected.
8. The Ontoclick Popup can also be launched without selecting any text:
   - right-click anywhere in the browser window and select Ontoclick from the context menu that appears
   - click the Ontoclick icon in the browser toolbar
   - in both cases, you can now type your search term into the Ontoclick Search bar
   - Please note: the history list function is not available when launching the Ontoclick popup from the toolbar icon

### Install From Source

**Build Prerequisites**

* [Yarn](https://yarnpkg.com/en/docs/install)

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


### Development Setup

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
