var API = require("../api/prod.api.json")

module.exports = {
  NODE_ENV: '"production"',
  NCBO_SEARCH: '"https://data.bioontology.org/search"',
  NCBO_ANNOTATOR: '"https://data.bioontology.org/annotator"',
  NCBO_KEY: JSON.stringify(API.ncbo_key),
  JAX: '"https://hpo.jax.org/api/hpo/search/"',
  EBI: '"https://www.ebi.ac.uk/ols/api/search"',
  NEURAL: '"https://cors-anywhere.herokuapp.com/https://ncr.ccm.sickkids.ca/curr/match/"',
  PRYZM: '"https://cors-anywhere.herokuapp.com/https://knowledge.pryzm.health/api/cr/v1/annotate?apiKey="',
  PRYZM_KEY: JSON.stringify(API.pryzm_key)
}
