<template>
<div>
  <div class="row">
    <div class="col-sm-7 text-left">
      <img class="logo" src="/static/img/icon-38.png">
      <h3 class="pull-left">ONTOCLICK</h3>
    </div>
  </div>
  <v-server-table :url="url" :columns="columns" :options="options">
    <div slot='conceptRec' class='form-group'>
      <treeselect :multiple="false" :clearable="false" :close-on-select="true" :flat="true" :select="getCR()" :options="conceptrecogniserOptions" v-model="conceptrecogniserValue" placeholder="Select Concept Recognizer" name="conceptRecogniser" />
    </div>
    <div slot='ontologiesFilter' class='form-group'>
        <treeselect :multiple="true" :clearable="false" :close-on-select="true" :flat="true" :options="ontologyOptions" style="z-index:6;" placeholder="Filter by Ontology" v-model="ontologyValue" />
      </div>
    <template slot="child_row" scope="props">
        <div class='text-wrap' v-if="props.row.definition"><b>Definition: </b>{{props.row.definition[0]}}</div>
        <div class='text-wrap' v-if="props.row.synonym"><b>Synonyms: </b>{{ typeof props.row.synonym === 'string' ? props.row.synonym : props.row.synonym.join(', ') }}</div>
      </template>
    <template slot="notation" scope="props" v-if="props.row.notation || props.row.id">
        <span :id='"notation"+props.index' v-if="props.row.notation">{{props.row.notation}}</span>
        <span :id='"notation"+props.index' v-if="props.row.id">{{props.row.id}}</span>
        <a class="hover-action fa fa-copy" @click='copyContent("notation"+props.index)'></a>
      </template>
    <template slot="prefLabel" scope="props" v-if="props.row.prefLabel || props.row.name">
        <span :id='"prefLabel"+props.index' v-if="props.row.prefLabel">{{props.row.prefLabel}}</span>
        <span :id='"prefLabel"+props.index' v-if="props.row.name">{{props.row.name}}</span>
        <a class="hover-action fa fa-copy" @click='copyContent("prefLabel"+props.index)'></a>
      </template>
    <template slot="spantext" scope="props">
        <span :id='"spantext"+props.index' v-if="props.row.prefLabel && props.row.notation"></span>
        <a class="hover-action fa fa-copy" title="Notation + Label" @click='copyContentS(props.row.notation + " " + props.row.prefLabel)' v-if="props.row.notation && props.row.prefLabel"></a>
        <a class="hover-action fa fa-copy" title="Notation + Label" @click='copyContentS(props.row.id + " " + props.row.name)' v-if="props.row.id && props.row.name"></a>

        <a class="hover-action fa fa-copy" title="Text span + Notation + Label" @click="doCopy(props.row.notation, props.row.prefLabel)" v-if="props.row.notation && props.row.prefLabel"></a>
        <a class="hover-action fa fa-copy" title="Text span + Notation + Label" @click="doCopy(props.row.id, props.row.name)" v-if="props.row.id && props.row.name"></a>
      </template>
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

function copyElementContentS(cps) {
 const el = document.createElement('textarea');
  el.value = cps;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

const keyDict = {
  0: 'notation',
  1: 'id',
  2: 'hp_id',
  3: ''
};

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
  console.log(v + " concept");
  let x = recogDict[v];
  // console.log(x);
  let key = keyDict[x];
  // console.log(key);
  console.log('key: ' + key);
  return key;
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
      url: 'https://google.com',
      columns: ['notation', 'prefLabel' , 'spantext'],
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
        skin: 'table table-hover',
        uniqueKey: test()
      },
      query: query,
      ontologyValue: ontology ? [ontology] : [],
      ontologyOptions: options,
      results: [],
      request: null,
      conceptrecogniserValue: ['ncbo'],
      conceptrecogniserOptions: [{
        id: 'ncbo',
        label: 'NCBO Bioportal',
      }, {
        id: 'jax',
        label: 'HPO Jax',
      }, {
        id: 'neural',
        label: 'Neural Concept Recogniser',
      }, {
        id: 'ebi',
        label: 'Ontology Lookup Search EBI'
      }]
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
    copyModel(model) {},
    copyContentS(srcstr) {
      copyElementContentS(srcstr);
      window.parent.postMessage({
        type: 'copied'
      }, "*")
    },
    doCopy(rownotation, label) {
      let keyword = document.getElementsByClassName('VueTables__search')[0].children[0].value;
      let val = '"' + keyword + '","' + rownotation + '","' + label + '"';
      copyElementContentS(val);
      window.parent.postMessage({
        type: 'copied'
      }, "*")
    },
    getCR() {
      return 'notation';
    }
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

.VueTables__child-row-toggler {
    width: 16px;
    height: 16px;
    line-height: 16px;
    display: block;
    margin: auto;
    text-align: center;
}

.VueTables__child-row-toggler--closed::before {
    content: "+";
}

.VueTables__child-row-toggler--open::before {
    content: "-";
}

.text-wrap {
  word-wrap: normal;
  white-space: pre-line;
}

</style>
