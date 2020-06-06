import {
  categoryRoots,
  categoryMap
} from './categories';
import ontologies from './ontologies';

let ontologyMap = {};

ontologies.forEach(function(element) {
  element.categories.forEach(function(category) {
    if (categoryMap[category]) {
      categoryMap[category].children = categoryMap[category].children || []
      let ontology = {
        id: element.acronym,
        label: element.acronym + ': ' + element.name,
        type: 'ontology'
      }
      categoryMap[category].children.push(ontology)
      ontologyMap[element.acronym] = ontology
    }
  })
})

export const options = categoryRoots;
export const ontologyByAcronym = ontologyMap;
