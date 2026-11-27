import axios from 'axios';

// NCBO Search = 0
// NCBO Annotator = 1
//      data : response.data.collection
//      count : response.data.totalCount
// https://data.bioontology.org/documentation

// JAX = 3
//     data : response.data.terms
//     count : response.data.termsTotalCount
// https://hpo.jax.org/api/hpo/docs/

// OLS EBI = 4
//     data : response.data.
//     count: response.data.
// https://www.ebi.ac.uk/ols/docs/api/search

const recogDict = {
  'NCBO Bioportal Search': 0,
  'NCBO Bioportal Annotator': 1,

  'HPO Jax': 3,
  'Ontology Lookup Search EBI': 4,
};
// Search HTML for concept recogniser dropdown list
// Before the dropdown exists (the first request), fall back to the default, EBI
function getSelectedAPI() {
  let div = document.getElementsByName("conceptRecogniser")[0];
  let api;
  if (typeof div !== "undefined") {
    api = document.getElementsByClassName('vue-treeselect__single-value')[0].innerText;
  } else {
    api = 'Ontology Lookup Search EBI';
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
    notation: 'Identifier',
    prefLabel: 'Label',
    spantext: 'Actions'
  },
  pagination: {
    dropdown: false
  },
  requestFunction: (data) => {
    let ontologies = getOntologies();
    // Read the key from storage rather than the #apkey element, which doesn't exist yet on the first request
    let apikey = localStorage.apiKeyOntoclick;

    const ncbo = [
      process.env.NCBO_SEARCH,
      process.env.NCBO_ANNOTATOR,
      {
        apikey: apikey,
        q: data.q,
        pagesize: 5,
        page: data.page,
        include: 'prefLabel,synonym,definition,notation',
        ontologies: ontologies
      },
      {
        apikey: apikey,
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
        // OLS uses the same ontology IDs as NCBO, but lowercase
        ontology: ontologies.toLowerCase(),
        groupField: 'iri',
        start: (data.page - 1) * 5,
        rows: 5,
        local: true
      }
    ];

    // A failing service resolves to null so it doesn't discard the results of the others
    const get = (url, params) => axios.get(url, {params: params}).catch((err) => {
      console.log(err);
      return null;
    });
    // NCBO rejects requests without a key, so skip them until the user has entered one
    const ncbos_get = apikey ? get(ncbo[0], ncbo[2]) : Promise.resolve(null);
    const ncboa_get = apikey ? get(ncbo[1], ncbo[3]) : Promise.resolve(null);
    const jax_get = get(jax[0], jax[1]);
    const ebi_get = get(ebi[0], ebi[1]);

    return axios.all([ncbos_get, ncboa_get, jax_get, ebi_get]
    ).then(res => {
      const ncbos_res = res[0];
      const ncboa_res = res[1];
      const jax_res = res[2];
      const ebi_res = res[3];

      // Parse NCBO Search response
      // none needed

      // Parse NCBO Annotator response
      for (var i = 0; ncboa_res && i < ncboa_res.data.length; i++) {
        // Switch return object's keys to align with display rows in SearchBox.vue
        ncboa_res.data[i].notation = ncboa_res.data[i].annotatedClass.notation;
        ncboa_res.data[i].prefLabel = ncboa_res.data[i].annotatedClass.prefLabel;
        ncboa_res.data[i].definition = ncboa_res.data[i].annotatedClass.definition;
        ncboa_res.data[i].synonym = ncboa_res.data[i].annotatedClass.synonym;
        ncboa_res.data[i].annotatedClass = null;
      }

      // Parse JAX response
      if (jax_res && jax_res.data.terms) {
        jax_res.data.terms = keyLoop(jax_res.data.terms, 'id', 'notation');
        jax_res.data.terms = keyLoop(jax_res.data.terms, 'name', 'prefLabel');
      }

      // Parse EBI response
      if (ebi_res && ebi_res.data.response) {
        ebi_res.data.response.docs = keyLoop(ebi_res.data.response.docs, 'obo_id', 'notation');
        ebi_res.data.response.docs = keyLoop(ebi_res.data.response.docs, 'label', 'prefLabel');
        ebi_res.data.response.docs = keyLoop(ebi_res.data.response.docs, 'description', 'definition');
      }

      return [ncbos_res, ncboa_res, jax_res, ebi_res];
    }).catch((err) => {
      console.log(err);
      return null;
    });

    // return axios.get(apiURL, {
    //   params: apiParam
    // }).then((res) => {
    //   console.log("function api: " + api);
    //   if (api == 0) {
    //     console.log("request function 0");
    //     return res;
    //   } else if (api == 1) {
    //     for (var i = 0; i < res.data.length; i++) {
    //       // Switch return object's keys to align with display rows in SearchBox.vue
    //       res.data[i].notation = res.data[i].annotatedClass.notation;
    //       res.data[i].prefLabel = res.data[i].annotatedClass.prefLabel;
    //       res.data[i].definition = res.data[i].annotatedClass.definition;
    //       res.data[i].synonym = res.data[i].annotatedClass.synonym;
    //       res.data[i].annotatedClass = null;
    //     }
    //     return res;
    //   } else if (api == 3) {
    //     res.data.terms = keyLoop(res.data.terms, 'id', 'notation');
    //     res.data.terms = keyLoop(res.data.terms, 'name', 'prefLabel');
    //     return res
    //   } else if (api == 4) {
    //     console.log("request function 4");
    //     res.data.response.docs = keyLoop(res.data.response.docs, 'obo_id', 'notation');
    //     res.data.response.docs = keyLoop(res.data.response.docs, 'label', 'prefLabel');
    //     res.data.response.docs = keyLoop(res.data.response.docs, 'description', 'definition');
    //     return res;
    //   } else {
    //     return null;
    //   }
    // }).catch((err) => {
    //   return null;
    // });
  },
  responseAdapter: (response) => {
    let api = getSelectedAPI();
    const index = {0: 0, 1: 1, 3: 2, 4: 3}[api];
    if (response !== null && response[index]) {
      if (api == 0) {
        response = response[0];
        return {
          data: response.data.collection,
          count: response.data.totalCount
        }
      } else if (api == 1) {
        response = response[1];
        return {
          data: response.data,
          count: response.data.length
        }
      } else if (api == 3) {
        response = response[2];
        let count;
        let data;
        if (response.data.terms == undefined) {
          data = [];
          count = 0;
        } else if (response.data.terms.length >= 10) {
          data = response.data.terms;
          count = 1;
        } else if (response.data.terms.length == 0)  {
          data = [];
          count = 0;
        } else {
          data = response.data.terms;
          count = response.data.terms.length;
        }
        return {
          data: data,
          // API only returns top 10 results, all results are returned on one single page
          // Let count be 1 to let user think there are no more result pages
          count: count
        }
      } else if (api == 4) {
        response = response[3];
        if (response.data.response == undefined) {
          return {
            data: [],
            count: 0
          }
        }
        if (response.data.response.numFound == 0) {
          return {
            data: [],
            count: 0
          }
        }
        return {
          data: response.data.response.docs,
          count: response.data.response.numFound
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

