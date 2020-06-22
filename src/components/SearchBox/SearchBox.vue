<template>
<div>
  <div class="row">
    <div class="col-sm-7 text-left">
      <img class="logo" src="/static/img/icon-38.png">
      <h3 class="pull-left">ONTOCLICK</h3>
    </div>
  </div>
  <v-server-table url="url" :columns="columns" :options="options">
    <div slot='ontologiesFilter' class='form-group'>
      <treeselect :multiple="true" :clearable="false" :close-on-select="true" :flat="true" :options="ontologyOptions" placeholder="Filter by Ontology" v-model="ontologyValue" />
    </div>
    <template slot="notation" scope="props" v-if="props.row.notation">
        <span :id='"notation"+props.index'>{{props.row.notation}}</span>
        <a class="hover-action fa fa-copy" @click='copyContent("notation"+props.index)'></a>
        <!-- <a class="hover-action fa fa-edit" @click='replaceWithContent("notation"+props.index)'></a> -->
      </template>
    <template slot="prefLabel" scope="props" v-if="props.row.prefLabel">
        <span :id='"prefLabel"+props.index'>{{props.row.prefLabel}}</span>
        <a class="hover-action fa fa-copy" @click='copyContent("prefLabel"+props.index)'></a>
        <!-- <a class="hover-action fa fa-edit" @click='replaceWithContent("prefLabel"+props.index)'></a> -->
      </template>
    <!-- <template slot="Actions" scope="props">
        <a class="hover-action fa fa-copy" @click='copyModel(props)'></a>
      </template> -->
  </v-server-table>
</div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import {
  options,
  ontologyByAcronym
} from './OntologyData/tree'
import ontologies from './OntologyData/ontologies'

function copyElementContent(srcElementId) {
  let srcElement = document.getElementById(srcElementId)
  var range = document.createRange();
  range.selectNodeContents(srcElement);
  let selection = document.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('Copy');
  selection.removeAllRanges();
}

export default {
  name: 'search-box',
  components: {
    Treeselect
  },
  data() {
    let query = document.location.search.match(/query=([^&]*)/)
    let ontology = document.location.search.match(/ontology=(.*)/)
    query = query ? unescape(query[1]) : undefined
    ontology = ontology ? unescape(ontology[1]) : undefined
    return {
      loading: true,
      url: 'https://data.bioontology.org/search',
      columns: ['notation', 'prefLabel' /*, 'Actions'*/ ],
      options: {
        initFilters: {
          'GENERIC': query
        },
        sortable: [],
        perPage: 5,
        pagination: {
          chunk: 3
        },
        texts: {
          filterPlaceholder: 'Query'
        },
        skin: 'table table-hover'
      },
      query: query,
      ontologyValue: ontology ? [ontology] : [],
      ontologyOptions: options,
      results: [],
      request: null
    }
  },
  methods: {
    copyContent(srcElementId) {
      copyElementContent(srcElementId);
      window.parent.postMessage({
        type: 'copied'
      }, "*")
    },
    replaceWithContent(srcElementId) {
      copyElementContent(srcElementId);
      window.parent.postMessage({
        type: 'copied-paste'
      }, "*")
    },
    copyModel(model) {}
  }
}
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css">
</style><style>tr {
  cursor: pointer;
}

tr a.hover-action {
  opacity: 0;
}

tr:hover a.hover-action {
  opacity: 1;
}

li.VuePagination__pagination-item-next-chunk,
li.VuePagination__pagination-item-prev-chunk {
  display: none;
}

div.VuePagination p {
  margin: 0;
}

ul.pagination {
  margin: 0;
}

ul.pagination>li>a,
.pagination>li>span {
  color: #039be5;
}

.vue-treeselect {
  z-index: 4;
}

.search-box {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.search-box .controls {
  flex-grow: 0;
  flex-shrink: 0;
}

.search-box .content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
