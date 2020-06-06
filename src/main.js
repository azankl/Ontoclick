// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// =============== Base libraries integration ==================
import Vue from 'vue';
import VueResource from 'vue-resource';

import { ServerTable } from 'vue-tables-2';
import TableOptions from 'components/SearchBox/table/TableOptions';
import MockSearchResponse from 'components/SearchBox/OntologyData/mock';

Vue.use(VueResource);
Vue.use(ServerTable, TableOptions, false, require('components/SearchBox/table/TableTemplate.js')('server'))

/*
Vue.http.interceptors.unshift((request, next) => {
  next(
    request.respondWith(MockSearchResponse,
      {status: 200}
    )
  );
});
*/

import store from './store';

// ===== Bootstrap components integration (JQuery needed) ======
window.$ = window.jQuery = require('jquery');
require('bootstrap-sass');

// ======================= Base Component ======================
import App from './App';

// ======================== Vue Instance =======================
/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => h(App),
});
