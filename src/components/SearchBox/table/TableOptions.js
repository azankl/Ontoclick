import Vue from 'vue';
import axios from 'axios';

// const x = 0;

// NCBO = 0 
//      data : response.data.collection
//      count : response.data.totalCount

// JAX = 1 
//     data : response.data.terms
//     count : response.data.termsTotalCount

// Neural Concept Recogniser = 2
//     data: response.data.
//     count: response.data. 
// https://ncr.ccm.sickkids.ca/api_doc/

// OLS EBI = 3
//     data : response.data.
//     count: response.data.
// https://www.ebi.ac.uk/ols/docs/api

const recogDict = {
  'NCBO Bioportal': 0,
  'HPO Jax': 1,
  'Neural Concept Recogniser': 2,
  'Ontology Lookup Search EBI': 3
};

function test() {
  let div = document.getElementsByName("conceptRecogniser")[0];
  let v = 'NCBO Bioportal';
  if (typeof div !== "undefined") {
    v = document.getElementsByClassName('vue-treeselect__single-value')[0].innerText;
  } 
  // console.log(v + " concept");
  let x = recogDict[v];
  // console.log(x);

  return x;
}

export default {
  requestKeys: {
    query: 'q',
    limit: 'pagesize',
    page: 'page',
    byColumn: 'yeet'
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
    let x = test();
    console.log(x + 'zxczcxz');
    console.log(data);
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
      })
    ]).then(axios.spread((...responses) => {
      const res0 = responses[0];
      const res1 = responses[1];
      const res2 = responses[2];
      const res3 = responses[3];

      if (x >= 0 && x <= 3) {
        return responses[x];
      } else {
        return null
      }
    })).catch((e) => {
      this.dispatch('error', e);
    });
  },
  responseAdapter: (response) => {
    let x = test();
    console.log(x + ' asdsad')
    if (response.data) {
      if (x == 0) {
        return {
          data: response.data.collection,
          count: response.data.totalCount
        }
      } else if (x == 1) {
        return {
          data: response.data.terms,
          count: response.data.termsTotalCount
        }
      }
    } else {
      return {
        data: [],
        count: 0
      }
    }
    // return response.data ? {
    //   data: response.data.collection,
    //   count: response.data.totalCount
    // } : {
    //   data: [],
    //   count: 0
    // }
  }
}

