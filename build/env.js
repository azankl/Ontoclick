// Build-time constants exposed to the app as process.env.*, shared by webpack and Vitest
module.exports = (mode) => ({
  NODE_ENV: JSON.stringify(mode),
  NCBO_SEARCH: JSON.stringify('https://data.bioontology.org/search'),
  NCBO_ANNOTATOR: JSON.stringify('https://data.bioontology.org/annotator'),
  JAX: JSON.stringify('https://ontology.jax.org/api/hp/search'),
  EBI: JSON.stringify('https://www.ebi.ac.uk/ols4/api/search'),
});
