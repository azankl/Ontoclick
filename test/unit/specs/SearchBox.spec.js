import Vue from 'vue';
import SearchBox from 'src/components/SearchBox/SearchBox';

describe('SearchBox.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(SearchBox),
    });
    expect(vm.$el.querySelector('h3').textContent).to.equal('ONTOCLICK');
  });
});
