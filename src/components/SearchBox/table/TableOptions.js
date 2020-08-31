import axios from 'axios';

// NCBO Search = 0 
// NCBO Annotator = 1
//      data : response.data.collection
//      count : response.data.totalCount
// https://data.bioontology.org/documentation

// Pryzm Health = 2
// https://track.health/api/

// JAX = 3
//     data : response.data.terms
//     count : response.data.termsTotalCount
// https://hpo.jax.org/api/hpo/docs/ 

// OLS EBI = 4
//     data : response.data.
//     count: response.data.
// https://www.ebi.ac.uk/ols/docs/api/search

// Neural Concept Recogniser = 5
//     data: response.data.
//     count: response.data. 
// https://ncr.ccm.sickkids.ca/api_doc/


const recogDict = {
  'NCBO Bioportal Search': 0,
  'NCBO Bioportal Annotator': 1,
  'Pryzm Health CR': 2,
  'HPO Jax': 3,
  'Ontology Lookup Search EBI': 4,
  'Neural Concept Recogniser': 5,
  
};

// Search HTML for concept recogniser dropdown list
// Initial startup value will always be NCBO Search
function getSelectedAPI() {
  let div = document.getElementsByName("conceptRecogniser")[0];
  let api = 'NCBO Bioportal Search';
  if (typeof div !== "undefined") {
    api = document.getElementsByClassName('vue-treeselect__single-value')[0].innerText;
  } 
  return recogDict[api];
}

// Search for ontologies selected from dropdown menu
// Human Phenotype Ontology is the default value if no ontologies are selected
function getOntologies() {
  let list = [];
  let div = document.getElementsByClassName('vue-treeselect__multi-value-label');
  for (var i = 0; i < div.length; i++) {
    let selected = div[i].innerText;
    // Extract ontology ID to be used for GET request
    let id = selected.match(/\(([^)]+)\)/)[1];
    if (!list.includes(id)) {
      list.push(id);
    }
  }
  return ((Array.isArray(list) && list.length) ? list.join(',') : 'HP');
}

// Renames the key for dictionary
// Input: dictionary, keyToReplace, newKeyName
const clone = (obj) => Object.assign({}, obj);
const renameKey = (object, key, newKey) => {
    const clonedObj = clone(object);
    const targetKey = clonedObj[key];
    delete clonedObj[key];
    clonedObj[newKey] = targetKey;
    return clonedObj;
};

function keyLoop(data, init, fin) {
    var i;
    var arr = [];
    for (i = 0; i < data.length; i++) {
        let temp = renameKey(data[i], init, fin);
        arr.push(temp);
    }
    return arr;
}

export default {
  requestKeys: {
    query: 'q',
    limit: 'pagesize',
    page: 'page'
  },
  headings: {
    notation: 'Notation',
    prefLabel: 'Label',
    spantext: 'Actions'
  },
  pagination: {
    dropdown: false
  },
  requestFunction: (data) => {
    let api = getSelectedAPI();
    let ontologies = getOntologies();
    
    const ncbo = [
      process.env.NCBO_SEARCH,
      process.env.NCBO_ANNOTATOR,
      {
        apikey: process.env.NCBO_KEY,
        q: data.q,
        pagesize: 5,
        page: data.page,
        include: 'prefLabel,synonym,definition,notation',
        ontologies: ontologies
      },
      {
        apikey: process.env.NCBO_KEY,
        text: data.q,
        pagesize: 5,
        page: data.page,
        include: 'prefLabel,synonym,definition,notation',
        ontologies: ontologies
      }
    ];

    const jax = [
      process.env.JAX,
      {
        q: data.q
      }
    ];

    const ebi = [
      process.env.EBI,
      {
        q: data.q,
        ontology: 'hp',
        groupField: 'iri',
        start: data.page,
        rows: 5,
        local: true
      }
    ];

    const neural = [
      process.env.NEURAL,
      {
        text: data.q
      }
    ];

    const pryzm = [
      process.env.PRYZM + process.env.PRYZM_KEY,
      data.q
    ]

    // Change the URL and parameters depending on the Concept Recogniser selected
    let apiURL, apiParam;
    switch(api) {
      case 0:
        apiURL = ncbo[0];
        apiParam = ncbo[2];
        break;
      case 1:
        apiURL = ncbo[1];
        apiParam = ncbo[3];
        break;
      case 3:
        apiURL = jax[0];
        apiParam = jax[1];
        break;
      case 4:
        apiURL = ebi[0];
        apiParam = ebi[1];
        break;
      case 5:
        apiURL = neural[0];
        apiParam = neural[1];
        break;
      default:
        apiURL = null;
        apiParam = null;
    };

    // Seperate from the other returns as Pryzm requires a POST request instead of GET request
    if (api == 2) {
      return axios.post(pryzm[0], {
        payload: pryzm[1]
      }).then((res) => {
        for (var i = 0; i < res.data.data.length; i++) {
          // Switch return object's keys to align with display rows in SearchBox.vue
          res.data.data[i].notation = res.data.data[i].term.curie;
          res.data.data[i].prefLabel = res.data.data[i].term.label;
          res.data.data[i].definition = [];
          res.data.data[i].definition.push(res.data.data[i].term.metadata.metadata.DEFINITION);
          let arr = [];
          for (var j = 0; j < res.data.data[i].term.synonyms.length; j++) {
              arr.push(res.data.data[i].term.synonyms[j].synonym)
          }
          res.data.data[i].synonym = arr;
        }
        return res;
      }).catch((err) => {
        return null
      })
    }

    return axios.get(apiURL, {
      params: apiParam
    }).then((res) => {
      if (api == 0) {
        return res;
      } else if (api == 1) {
        for (var i = 0; i < res.data.length; i++) {
          // Switch return object's keys to align with display rows in SearchBox.vue
          res.data[i].notation = res.data[i].annotatedClass.notation;
          res.data[i].prefLabel = res.data[i].annotatedClass.prefLabel;
          res.data[i].definition = res.data[i].annotatedClass.definition;
          res.data[i].synonym = res.data[i].annotatedClass.synonym;
          res.data[i].annotatedClass = null;
        }
        return res;
      } else if (api == 3) {
        res.data.terms = keyLoop(res.data.terms, 'id', 'notation');
        res.data.terms = keyLoop(res.data.terms, 'name', 'prefLabel');
        return res
      } else if (api == 4) {
        res.data.response.docs = keyLoop(res.data.response.docs, 'obo_id', 'notation');
        res.data.response.docs = keyLoop(res.data.response.docs, 'label', 'prefLabel');
        res.data.response.docs = keyLoop(res.data.response.docs, 'description', 'definition');
        return res;
      } else if (api == 5) {
        res.data.matches = keyLoop(res.data.matches, 'hp_id', 'notation');
        var i;
        for (i = 0; i < res.data.matches.length; i++) {
          res.data.matches[i].prefLabel = res.data.matches[i].names[0];
          res.data.matches[i].names.shift();
        }
        res.data.matches = keyLoop(res.data.matches, 'names', 'synonym');
        return res;
      } else {
        return null;
      }
    }).catch((err) => {
      return null;
    });
  },
  responseAdapter: (response) => {
    let api = getSelectedAPI();
    if (response !== null && response.data) {
      if (api == 0) {
        return {
          data: response.data.collection,
          count: response.data.totalCount
        }
      } else if (api == 1) {
        return {
          data: response.data,
          count: response.data.length
        }
      } else if (api == 2) {
        return {
          data: response.data.data,
          count: response.data.data.length
        }
      } else if (api == 3) {
        let count;
        if (response.data.terms.length >= 10) {
          count = 1;
        } else {
          count = response.data.terms.length;
        }
        return {
          data: response.data.terms,
          // API only returns top 10 results, all results are returned on one single page
          // Let count be 1 to let user think there are no more result pages
          count: count
        }
      } else if (api == 4) {
        return {
          data: response.data.response.docs,
          count: response.data.response.numFound
        }
      } else if (api == 5) {
        let count;
        if (response.data.matches.length >= 10) {
          count = 1;
        } else {
          count = response.data.matches.length;
        }
        return {
          data: response.data.matches,
          // API only returns top 10 results, all results are returned on one single page
          // Let count be 1 to let user think there are no more result pages
          count: count
        }
      } else {
        return {
          data: [],
          count: 0
        }
      }
    } else {
      return {
        data: [],
        count: 0
      }
    }
  }
}

