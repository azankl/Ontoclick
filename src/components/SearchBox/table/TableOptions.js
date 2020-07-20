import Vue from 'vue';
import axios from 'axios';

const x = 1;

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

const keyDict = {
  0: 'notation',
  1: 'id',
  2: 'hp_id',
  3: ''
}

export default {
  requestKeys: {
    query: 'q',
    limit: 'pagesize',
    page: 'page',
  },
  headings: {
    notation: 'Notation',
    prefLabel: 'Label',
    spantext: 'Actions'
  },
  pagination: {
    dropdown: false
  },
  uniqueKey: keyDict[x],
  requestFunction: (data) => {
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
      // if (x == 0) {
      //   return res0;
      // } else if (x == 1) {
      //   return res1;
      // } else {
      //   return null
      // }
    })).catch((e) => {
      this.dispatch('error', e);
    });
    
  },
  responseAdapter: (response) => {
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

