// Build-time constants exposed to the app as process.env.*, shared by webpack and Vitest
const API = require('../api/prod.api.json');

module.exports = (mode) => ({
  NODE_ENV: JSON.stringify(mode),
  NCBO_SEARCH: JSON.stringify('https://data.bioontology.org/search'),
  NCBO_ANNOTATOR: JSON.stringify('https://data.bioontology.org/annotator'),
  NCBO_KEY: JSON.stringify(API.ncbo_key),
  JAX: JSON.stringify('https://ontology.jax.org/api/hp/search'),
  EBI: JSON.stringify('https://www.ebi.ac.uk/ols4/api/search'),
  NEURAL: JSON.stringify('https://cors-anywhere.herokuapp.com/https://ncr.ccm.sickkids.ca/curr/match/'),
  PRYZM: JSON.stringify('https://cors-anywhere.herokuapp.com/https://knowledge.pryzm.health/api/cr/v1/annotate?apiKey='),
  PRYZM_KEY: JSON.stringify(API.pryzm_key),
});
