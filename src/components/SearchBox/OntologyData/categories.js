function categoriesToTree(categories) {
  let ids = {};
  let roots = [];
  let branches = categories.map(function(category) {
    let branch = {};
    // need to track node type as we inject ontologies into the children array alongside categories
    branch.type = 'category';
    branch.id = category.acronym;
    branch.label = category.name;
    if (category.parentCategory) {
      branch.parent = category.parentCategory.match(/http:\/\/data\.bioontology\.org\/categories\/(.*)/);
      if (branch.parent) {
        branch.parent = branch.parent[1]; // set parent to acronym (trailing substring of category @id)
      }
    }
    ids[branch.id] = branch;
    if (branch.parent === undefined) {
      roots.push(branch);
    }
    return branch;
  });
  branches.forEach(function(branch) {
    if (branch.parent) {
      ids[branch.parent].children = ids[branch.parent].children || []
      ids[branch.parent].children.push(branch);
    }
  });
  return {
    roots: roots,
    ids: ids
  }
}

var categories = [{
  "id": "http://data.bioontology.org/categories/Imaging",
  "acronym": "Imaging",
  "name": "Imaging",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Imaging",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Mouse_Anatomy",
  "acronym": "Mouse_Anatomy",
  "name": "Mouse Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:55-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Animal_Gross_Anatomy",
  "@id": "http://data.bioontology.org/categories/Mouse_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Ethology",
  "acronym": "Ethology",
  "name": "Ethology",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Ethology",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Experimental_Conditions",
  "acronym": "Experimental_Conditions",
  "name": "Experimental Conditions",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Experimental_Conditions",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/"
  }
}, {
  "id": "http://data.bioontology.org/categories/Yeast",
  "acronym": "Yeast",
  "name": "Yeast",
  "description": null,
  "created": "2013-09-18T19:09:55-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Yeast",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/All_Organisms",
  "acronym": "All_Organisms",
  "name": "All Organisms",
  "description": null,
  "created": "2013-09-18T19:10:00-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/All_Organisms",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Immunology",
  "acronym": "Immunology",
  "name": "Immunology",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Immunology",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Fish_Anatomy",
  "acronym": "Fish_Anatomy",
  "name": "Fish Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:57-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Animal_Gross_Anatomy",
  "@id": "http://data.bioontology.org/categories/Fish_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Cellular_anatomy_",
  "acronym": "Cellular_anatomy_",
  "name": "Cellular anatomy ",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Cellular_anatomy_",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Taxonomic_Classification",
  "acronym": "Taxonomic_Classification",
  "name": "Taxonomic Classification",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Taxonomic_Classification",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Molecule",
  "acronym": "Molecule",
  "name": "Molecule",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Molecule",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Health",
  "acronym": "Health",
  "name": "Health",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Health",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Gross_Anatomy",
  "acronym": "Gross_Anatomy",
  "name": "Gross Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:57-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Anatomy",
  "@id": "http://data.bioontology.org/categories/Gross_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Dysfunction",
  "acronym": "Dysfunction",
  "name": "Dysfunction",
  "description": null,
  "created": "2013-09-18T19:10:00-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Dysfunction",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Biomedical_Resources",
  "acronym": "Biomedical_Resources",
  "name": "Biomedical Resources",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Biomedical_Resources",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Genomic_and_Proteomic",
  "acronym": "Genomic_and_Proteomic",
  "name": "Genomic and Proteomic",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Genomic_and_Proteomic",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Biological_Process",
  "acronym": "Biological_Process",
  "name": "Biological Process",
  "description": null,
  "created": "2013-09-18T19:09:54-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Biological_Process",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Other",
  "acronym": "Other",
  "name": "Other",
  "description": null,
  "created": "2013-09-18T19:10:00-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Other",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Subcellular",
  "acronym": "Subcellular",
  "name": "Subcellular",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Subcellular",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Phenotype",
  "acronym": "Phenotype",
  "name": "Phenotype",
  "description": null,
  "created": "2013-09-18T19:09:58-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Phenotype",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Human_Developmental_Anatomy",
  "acronym": "Human_Developmental_Anatomy",
  "name": "Human Developmental Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:57-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Animal_Gross_Anatomy",
  "@id": "http://data.bioontology.org/categories/Human_Developmental_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Plant_Anatomy",
  "acronym": "Plant_Anatomy",
  "name": "Plant Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:57-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Gross_Anatomy",
  "@id": "http://data.bioontology.org/categories/Plant_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Neurologic_Disease",
  "acronym": "Neurologic_Disease",
  "name": "Neurologic Disease",
  "description": null,
  "created": "2013-09-18T19:10:00-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Neurologic_Disease",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Arabadopsis",
  "acronym": "Arabadopsis",
  "name": "Arabidopsis",
  "description": null,
  "created": "2013-09-18T19:09:55-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Arabadopsis",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Neurological_Disorder",
  "acronym": "Neurological_Disorder",
  "name": "Neurological Disorder",
  "description": null,
  "created": "2013-09-18T19:10:00-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Neurological_Disorder",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Anatomy",
  "acronym": "Anatomy",
  "name": "Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Plant",
  "acronym": "Plant",
  "name": "Plant",
  "description": null,
  "created": "2013-09-18T19:09:55-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Plant",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Human",
  "acronym": "Human",
  "name": "Human",
  "description": null,
  "created": "2013-09-18T19:09:55-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Human",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Subcellular_anatomy",
  "acronym": "Subcellular_anatomy",
  "name": "Subcellular anatomy",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Subcellular_anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Chemical",
  "acronym": "Chemical",
  "name": "Chemical",
  "description": null,
  "created": "2013-09-18T19:10:00-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Chemical",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Microbial_Anatomy",
  "acronym": "Microbial_Anatomy",
  "name": "Microbial Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:57-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Gross_Anatomy",
  "@id": "http://data.bioontology.org/categories/Microbial_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Cell",
  "acronym": "Cell",
  "name": "Cell",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Cell",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Development",
  "acronym": "Development",
  "name": "Development",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Development",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Protein",
  "acronym": "Protein",
  "name": "Protein",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Gene_Product",
  "@id": "http://data.bioontology.org/categories/Protein",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Animal_Gross_Anatomy",
  "acronym": "Animal_Gross_Anatomy",
  "name": "Animal Gross Anatomy",
  "description": null,
  "created": "2013-09-18T19:09:56-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Gross_Anatomy",
  "@id": "http://data.bioontology.org/categories/Animal_Gross_Anatomy",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Gene_Product",
  "acronym": "Gene_Product",
  "name": "Gene Product",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Genomic_and_Proteomic",
  "@id": "http://data.bioontology.org/categories/Gene_Product",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Vocabularies",
  "acronym": "Vocabularies",
  "name": "Vocabularies",
  "description": null,
  "created": "2013-09-18T19:09:57-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Vocabularies",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Physicochemical",
  "acronym": "Physicochemical",
  "name": "Physicochemical",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Physicochemical",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "acronym": "http://data.bioontology.org/metadata/omvacronym",
    "name": "http://data.bioontology.org/metadata/omvname"
  }
}, {
  "id": "http://data.bioontology.org/categories/Upper_Level_Ontology",
  "acronym": "Upper_Level_Ontology",
  "name": "Upper Level Ontology",
  "description": null,
  "created": "2013-09-18T19:09:59-07:00",
  "parentCategory": null,
  "@id": "http://data.bioontology.org/categories/Upper_Level_Ontology",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "acronym": "http://data.bioontology.org/metadata/omvacronym",
    "name": "http://data.bioontology.org/metadata/omvname"
  }
}, {
  "id": "http://data.bioontology.org/categories/Plant_Development",
  "acronym": "Plant_Development",
  "name": "Plant Development",
  "description": null,
  "created": "2013-09-18T19:09:55-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Development",
  "@id": "http://data.bioontology.org/categories/Plant_Development",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}, {
  "id": "http://data.bioontology.org/categories/Animal_Development",
  "acronym": "Animal_Development",
  "name": "Animal Development",
  "description": null,
  "created": "2013-09-18T19:09:54-07:00",
  "parentCategory": "http://data.bioontology.org/categories/Development",
  "@id": "http://data.bioontology.org/categories/Animal_Development",
  "@type": "http://data.bioontology.org/metadata/Category",
  "@context": {
    "@vocab": "http://data.bioontology.org/metadata/",
    "parentCategory": {
      "@id": "http://data.bioontology.org/metadata/Category",
      "@type": "@id"
    }
  }
}]

let tree = categoriesToTree(categories);

export const categoryRoots = tree.roots;
export const categoryMap = tree.ids;
