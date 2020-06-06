var API = require("../api/prod.api.json")

module.exports = {
  NODE_ENV: '"production"',
  API_URL: '"https://data.bioontology.org/search"',
  API_KEY: JSON.stringify(API.key)
}
