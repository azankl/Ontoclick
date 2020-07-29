import Vue from 'vue';
import axios from 'axios';

// const x = 0;

// NCBO = 0 
//      data : response.data.collection
//      count : response.data.totalCount
// https://data.bioontology.org/documentation

// JAX = 1 
//     data : response.data.terms
//     count : response.data.termsTotalCount
// https://hpo.jax.org/api/hpo/docs/ 

// OLS EBI = 2
//     data : response.data.
//     count: response.data.
// https://www.ebi.ac.uk/ols/docs/api/search

// Neural Concept Recogniser = 3
//     data: response.data.
//     count: response.data. 
// https://ncr.ccm.sickkids.ca/api_doc/


// https://track.health/api/
// API key 4df19df4-f923-4b81-b575-6edc3deba4c2

const recogDict = {
  'NCBO Bioportal': 0,
  'HPO Jax': 1,
  'Ontology Lookup Search EBI': 2,
  'Neural Concept Recogniser': 3
};
const ontoDict = {
  'HP': 0,
  'GO': 1
};

function getSelectedAPI() {
  let div = document.getElementsByName("conceptRecogniser")[0];
  let api = 'NCBO Bioportal';
  if (typeof div !== "undefined") {
    api = document.getElementsByClassName('vue-treeselect__single-value')[1].innerText;
  } 
  return recogDict[api];
}

function getSelectedONTO() {
  let div = document.getElementsByName("ontoRecogniser")[0];
  let onto = 'HP';
  if (typeof div !== "undefined") {
    onto = document.getElementsByClassName('vue-treeselect__single-value')[0].innerText;
  } 
  return ontoDict[onto];
}

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
    let onto = getSelectedONTO();
    console.log(onto);
    let onto_term;
    switch(onto) {
      case 0:
        onto_term = "HP";
        break;
      case 1:
        onto_term = 'GO';
        break;
      default:
        onto_term = null;
    };

    
    const ncbo = [
      process.env.API_URL,
      {
        apikey: process.env.API_KEY,
        q: data.q,
        pagesize: 5,
        page: data.page,
        include: 'prefLabel,synonym,definition,notation',
        ontologies: onto_term
      }
    ];

    const jax = [
      'http://hpo.jax.org/api/hpo/search/',
      {
        q: data.q
      }
    ];

    const ebi = [
      'https://www.ebi.ac.uk/ols/api/search',
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
      'https://ncr.ccm.sickkids.ca/curr/match/',
      {
        text: data.q
      }
    ];

    let apiURL, apiParam;
    switch(api) {
      case 0:
        apiURL = ncbo[0];
        apiParam = ncbo[1];
        break;
      case 1:
        apiURL = jax[0];
        apiParam = jax[1];
        break;
      case 2:
        apiURL = ebi[0];
        apiParam = ebi[1];
        break;
      case 3:
        apiURL = neural[0];
        apiParam = neural[1];
        break;
      default:
        apiURL = null;
        apiParam = null;
    };

    return axios.get(apiURL, {
      params: apiParam
    }).then((res) => {
      if (api == 0) {
        console.log(res);
        return res;
      } else if (api == 1) {
        res.data.terms = keyLoop(res.data.terms, 'id', 'notation');
        res.data.terms = keyLoop(res.data.terms, 'name', 'prefLabel');
        return res
      } else if (api == 2) {
        res.data.response.docs = keyLoop(res.data.response.docs, 'obo_id', 'notation');
        res.data.response.docs = keyLoop(res.data.response.docs, 'label', 'prefLabel');
        res.data.response.docs = keyLoop(res.data.response.docs, 'description', 'definition');
        return res;
      } else if (api == 3) {
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
          data: response.data.terms,
          count: response.data.termsTotalCount
        }
      } else if (api == 2) {
        return {
          data: response.data.response.docs,
          count: response.data.response.numFound
        }
      } else if (api == 3) {
        return {
          data: response.data.matches,
          count: response.data.matches.length
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

