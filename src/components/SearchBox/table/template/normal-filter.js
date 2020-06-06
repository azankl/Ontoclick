'use strict';

var debounce = require('debounce');

module.exports = function (h, that) {

    if (!that.opts.filterable) return '';

    var search = that.source == 'client' ? that.search.bind(that, that.data) : that.serverSearch.bind(that);

    if (that.opts.filterable && !that.opts.filterByColumn) {
        var id = 'VueTables__search_' + that.id;
        return h(
            'div',
            { 'class': 'form-group VueTables__search' },
            [h(
                'input',
                { 'class': 'form-control',
                attrs: { type: 'text',

                placeholder: that.display('filterPlaceholder'),
                'value': that.query,
                id: id
            },
            on: {
                'keyup': debounce(search, that.opts.debounce)
            }
        },
        []
        )]
                );
    }

    return '';
};
