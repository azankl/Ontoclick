'use strict';

module.exports = function(source) {
  return function(h) {

    var rows = require('vue-tables-2/compiled/template/rows')(h, this);
    var normalFilter = require('./template/normal-filter')(h, this);
    var dropdownPagination = require('vue-tables-2/compiled/template/dropdown-pagination')(h, this);
    var columnFilters = require('vue-tables-2/compiled/template/column-filters')(h, this);
    var footerHeadings = require('vue-tables-2/compiled/template/footer-headings')(h, this);
    var noResults = require('vue-tables-2/compiled/template/no-results')(h, this);
    var pagination = require('vue-tables-2/compiled/template/pagination')(h, this);
    var dropdownPaginationCount = require('vue-tables-2/compiled/template/dropdown-pagination-count')(h, this);
    var headings = require('vue-tables-2/compiled/template/headings')(h, this);
    var perPage = require('vue-tables-2/compiled/template/per-page')(h, this);
    var beforeFilters = this.$slots.beforeFilters ? this.$slots.beforeFilters : '';
    var afterFilters = this.$slots.afterFilters ? this.$slots.afterFilters : '';
    var beforeBody = this.$slots.beforeBody ? this.$slots.beforeBody : '';
    var prependBody = this.$slots.prependBody ? this.$slots.prependBody : '';
    var appendBody = this.$slots.appendBody ? this.$slots.appendBody : '';
    var afterBody = this.$slots.afterBody ? this.$slots.afterBody : '';
    var ontologiesFilter = this.$slots.ontologiesFilter ? this.$slots.ontologiesFilter : '';

    return h(
      'div', {
        'class': "VueTables VueTables--" + this.source
      }, [h(
        'div', {
          'class': 'row'
        }, [h(
          'div', {
            'class': 'col-md-12'
          }, [normalFilter]
        ), h(
          'div', {
            'class': 'col-md-12'
          }, [ontologiesFilter]
        )]
      ), h(
        'div', {
          'class': 'table-responsive'
        }, [h(
          'table', {
            'class': 'VueTables__table table ' + this.opts.skin
          }, [h(
            'thead',
            null, [h(
              'tr',
              null, [headings]
            ), beforeFilters, columnFilters, afterFilters]
          ), footerHeadings, beforeBody, h(
            'tbody',
            null, [prependBody, noResults, rows, appendBody]
          ), afterBody]
        )]
      ), pagination, dropdownPaginationCount]
    );
  };
};
