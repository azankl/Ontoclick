import Vue from 'vue';
import axios from 'axios';

// const x = 0;

// NCBO = 0 
//      data : response.data.collection
//      count : response.data.totalCount

// JAX = 1 
//     data : response.data.terms
//     count : response.data.termsTotalCount\

// OLS EBI = 2
//     data : response.data.
//     count: response.data.
// https://www.ebi.ac.uk/ols/docs/api/search

// Neural Concept Recogniser = 3
//     data: response.data.
//     count: response.data. 
// https://ncr.ccm.sickkids.ca/api_doc/

const recogDict = {
  'NCBO Bioportal': 0,
  'HPO Jax': 1,
  'Ontology Lookup Search EBI': 2,
  'Neural Concept Recogniser': 3
};

function getSelectedAPI() {
  let div = document.getElementsByName("conceptRecogniser")[0];
  let api = 'NCBO Bioportal';
  if (typeof div !== "undefined") {
    api = document.getElementsByClassName('vue-treeselect__single-value')[0].innerText;
  } 
  return recogDict[api];
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
    return axios.all([
      axios.get(process.env.API_URL, {
        params: {
          apikey: process.env.API_KEY,
          q: data.q,
          pagesize: 5,
          page: data.page,
          include: 'prefLabel,synonym,definition,notation',
          ontologies: 'HP'
        }
      }),
      axios.get('http://hpo.jax.org/api/hpo/search/', {
        params: {
          q: data.q,
        }
      }),
      axios.get('https://www.ebi.ac.uk/ols/api/search', {
        params: {
          q: data.q,
          ontology: 'hp',
          groupField: 'iri',
          start: 0,
          // rows: 5
        }
      }),
      // axios.get('https://ncr.ccm.sickkids.ca/curr/match/', {
      //   params: {
      //     text: data.q
      //   }
      // })
    ]).then(axios.spread((...responses) => {
      const res0 = responses[0];
      const res1 = responses[1];
      const res2 = responses[2];
      const res3 = responses[3];

      if (api == 0) {
        return res0;
      } else if (api == 1) {
        res1.data.terms = keyLoop(res1.data.terms, 'id', 'notation');
        res1.data.terms = keyLoop(res1.data.terms, 'name', 'prefLabel');
        return res1
      } else if (api == 2) {
        res2.data.response.docs = keyLoop(res2.data.response.docs, 'obo_id', 'notation');
        res2.data.response.docs = keyLoop(res2.data.response.docs, 'label', 'prefLabel');
        res2.data.response.docs = keyLoop(res2.data.response.docs, 'description', 'definition');
        return res2;
      } else if (api == 3) {
        res3.data.matches = keyLoop(res3.data.matches, 'hp_id', 'notation');
        var i;
        for (i = 0; i < res3.data.matches.length; i++) {
          res3.data.matches[i].prefLabel = res3.data.matches[i].names[0];
          res3.data.matches[i].names.shift();
        }
        res3.data.matches = keyLoop(res3.data.matches, 'names', 'synonym');
        return res3;
      } else {
        return null;
      }
    }))
    .catch((e) => {
      this.dispatch('error', e);
    });
  },
  responseAdapter: (response) => {
    let api = getSelectedAPI();
    console.log(response.data);
    if (response.data) {
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

