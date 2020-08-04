<template>
<div>
  <div class="row">
    <div class="col-sm-7 text-left">
      <img class="logo" src="/static/img/rdf_flyer.png">
      <h3 class="pull-left">ONTOCLICK</h3>
      <i class="pull-right fa fa-trash" aria-hidden="true" id="clearButton"></i>
      <i class="pull-right fa fa-download" aria-hidden="true" id="exportButton"></i>
    </div>
  </div>
  <v-server-table :url="url" :columns="columns" :options="options">
    <div slot='conceptRec' class='form-group'>
      <treeselect :multiple="false" :clearable="false" :select='selectAPI()' :close-on-select="true" :options="conceptrecogniserOptions" v-model="conceptrecogniserValue" placeholder="Select Concept Recognizer" name="conceptRecogniser" />
    </div>
    <div slot='ontologiesFilter' class='form-group' v-if="conceptrecogniserValue==='ncbos' || conceptrecogniserValue==='ncboa'">
        <treeselect :multiple="true" :clearable="false" :close-on-select="true" :flat="true" :options="ontologyOptions" style="z-index:6;" placeholder="Filter by Ontology" v-model="ontologyValue" />
      </div>
    <template slot="child_row" scope="props">
        <div class='text-wrap' v-if="props.row.definition"><b>Definition: </b>{{props.row.definition[0]}}</div>
        <div class='text-wrap' v-if="props.row.synonym"><b>Synonyms: </b>{{ typeof props.row.synonym === 'string' ? props.row.synonym : props.row.synonym.join(', ') }}</div>
      </template>
    <template slot="notation" scope="props" v-if="props.row.notation">
        <span :id='"notation"+props.index' v-if="props.row.notation">{{props.row.notation}}</span>
        <a class="hover-action fa fa-copy" @click='copyContent("notation"+props.index)'></a>
      </template>
    <template slot="prefLabel" scope="props" v-if="props.row.prefLabel">
        <span :id='"prefLabel"+props.index' v-if="props.row.prefLabel">{{props.row.prefLabel}}</span>
        <a class="hover-action fa fa-copy" @click='copyContent("prefLabel"+props.index)'></a>
      </template>
    <template slot="spantext" scope="props">
        <span :id='"spantext"+props.index' v-if="props.row.prefLabel && props.row.notation"></span>
        <a class="hover-action fa fa-copy" title="Notation + Label" @click='copyContentS(props.row.notation + " " + props.row.prefLabel)' v-if="props.row.notation && props.row.prefLabel"></a>
        <a class="hover-action fa fa-file-text-o" title="Text span + Notation + Label" @click="doCopy(props.row.notation, props.row.prefLabel)" v-if="props.row.notation && props.row.prefLabel"></a>
        <a class="hover-action fa fa-file-excel-o" title="Save to history" @click="storeData(props.row.notation, props.row.prefLabel)" v-if="props.row.notation && props.row.prefLabel"></a>
      </template>
  </v-server-table>
</div>
</template>
    
<script>
import Treeselect from '@riophae/vue-treeselect'
// import {
  // options,
  // ontologyByAcronym
// } from './OntologyData/tree'
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

function changeExportName() {
  // PERSISTANT STORAGE
  // chrome.storage.local.get(['storage'], function(storage) {
  //   if (storage.storage === undefined) {
  //     document.getElementById('exportButton').innerText = 'export (0)';
  //   } else {
  //     document.getElementById('exportButton').innerText = 'export (' + storage.storage.length + ')';
  //   }
  // });

  // SESSION STORAGE (Each tab is seperate from another)
  if (sessionStorage.getItem('storage') === null) {
    document.getElementById('exportButton').innerText = ' (0)  ';
  } else {
    document.getElementById('exportButton').innerText = ' (' + JSON.parse(sessionStorage.getItem('storage')).length + ')  ';
  }
}

function enterPress() {
  let search = document.getElementsByClassName('VueTables__search')[0].children[0];
  const enter = new KeyboardEvent('keyup', {
    key: 'Enter',
  });
  search.dispatchEvent(enter);
}

function getPubMedID() {
  return [unescape(document.location.search.match(/id=(.*)\&/)[1]),
          unescape(document.location.search.match(/href=(.*)/)[1])];
}

function getStorage() {
  // PERSISTANT STORAGE
  // chrome.storage.local.get(['storage'], function(res) {
    // console.log(res);
  // });

  // SESSION STORAGE (Each tab is seperate from another)
  if (sessionStorage.getItem('storage') === null) {
    console.log(sessionStorage.getItem('storage'));
  } else {
    console.log(JSON.parse(sessionStorage.getItem('storage')));
  }
  console.log(getPubMedID());
}

function clearStorage() {
  // PERSISTANT STORAGE
  // chrome.storage.local.clear();

  // SESSION STORAGE
  sessionStorage.clear();
  changeExportName();
}

function downloadCSV() {
  // PERSISTANT STORAGE
  // chrome.storage.local.get(['storage'], function(res) {
    // if (res.storage !== undefined) {
    //   var csv = 'text,notation,label\n';

    //   res.storage.forEach(function(row) {
    //     csv += row.join(',');
    //     csv += '\n';
    //   }); 
    //   // console.log(csv);
    //   var hiddenElement = document.createElement('a');
    //   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    //   hiddenElement.target = '_blank';
    //   hiddenElement.download = 'download.csv';
    //   hiddenElement.click();
  //   }
  // })

  if (sessionStorage.getItem('storage') !== null) {
    let storage = JSON.parse(sessionStorage.getItem('storage'));
    var csv = '';
    let options = getPubMedID();
    if (options[0] !== 'null') {
      csv += options[0];
    } else {
      csv += options[1] + '\n';
    }

    storage.forEach(function(row) {
      csv += row.join(',');
      csv += '\n';
    })

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'download.csv';
    hiddenElement.click();
  }
  clearStorage();
}

function isArrayInArray(arr, item){
  var item_as_string = JSON.stringify(item);

  var contains = arr.some(function(ele){
    return JSON.stringify(ele) === item_as_string;
  });
  return contains;
}

export default {
  name: 'search-box',
  components: {
    Treeselect
  },
  data() {
    let query = document.location.search.match(/query=([^&]*)/)
    // let ontology = document.location.search.match(/ontology=(.*)/)
    query = query ? unescape(query[1]) : undefined
    // ontology = ontology ? unescape(ontology[1]) : undefined
    return {
      loading: true,
      url: 'https://google.com', // Not required
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
        uniqueKey: 'notation'
      },
      query: query,
      ontologyValue: ['HP'],
      ontologyOptions: ontologies,
      results: [],
      request: null,
      conceptrecogniserValue: 'ncbos',
      conceptrecogniserOptions: [{
        id: 'ncbos',
        label: 'NCBO Bioportal Search',
      }, {
        id: 'ncboa',
        label: 'NCBO Bioportal Annotator',
      },{
        id: 'pryzm',
        label: 'Pryzm Health CR'
      }, {
        id: 'ebi',
        label: 'Ontology Lookup Search EBI'
      }, {
        id: 'jax',
        label: 'HPO Jax',
      }, {
        id: 'neural',
        label: 'Neural Concept Recogniser',
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
    storeData(notation, label) {
      let keyword = document.getElementsByClassName('VueTables__search')[0].children[0].value;
      let data = [keyword, notation, label];

      // SESSION STORAGE 
      if (sessionStorage.getItem('storage') === null) {
        sessionStorage.setItem('storage', JSON.stringify([data]));
      } else {
        let currentStorage = JSON.parse(sessionStorage.getItem('storage'));
        if (!isArrayInArray(currentStorage, data)) {
          currentStorage.push(data);
          sessionStorage.setItem('storage', JSON.stringify(currentStorage));
        }
      }

      // PERSISTANT STORAGE
      // chrome.storage.local.get(['storage'], function(storage) {
      //   if (JSON.stringify(storage) === '{}') {
      //     chrome.storage.local.set({'storage': [data]});
      //   } else {
      //     if (!isArrayInArray(storage.storage, data)) {
      //       storage.storage.push(data);
      //       chrome.storage.local.set({'storage': storage.storage});
      //     }
      //   }
      // })
      changeExportName();
    },
    selectAPI() {
      try {
        document.getElementById('exportButton').addEventListener('click', downloadCSV);
        changeExportName();
        document.getElementById('clearButton').addEventListener('click', clearStorage);
        
        let search = document.getElementsByClassName('VueTables__search')[0].children[0].value;
        enterPress();
      } catch(err) {
        // do nothing
      }
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

.logo {
  height: 30px;
  width: 30px;
}

</style>
