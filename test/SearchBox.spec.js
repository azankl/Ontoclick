import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBox from 'src/components/SearchBox/SearchBox.vue';

describe('SearchBox.vue', () => {
  let wrapper;

  const mountSearchBox = () => mount(SearchBox, { attachTo: document.body, stubs: ['v-server-table'] });

  beforeEach(() => {
    localStorage.clear();
    // The component asks for an NCBO API key when NCBO is selected and none is stored
    vi.stubGlobal('prompt', vi.fn(() => null));
  });

  afterEach(() => {
    wrapper.destroy();
    vi.unstubAllGlobals();
  });

  it('should render correct contents', () => {
    wrapper = mountSearchBox();
    expect(wrapper.find('h3').text()).toBe('ONTOCLICK');
  });

  it('defaults to EBI and does not ask for a key on launch', () => {
    wrapper = mountSearchBox();
    expect(wrapper.vm.conceptrecogniserValue).toBe('ebi');
    expect(window.prompt).not.toHaveBeenCalled();
  });

  it('asks for a key each time NCBO is selected until one is entered', async () => {
    wrapper = mountSearchBox();

    await wrapper.setData({ conceptrecogniserValue: 'ncbos' });
    expect(window.prompt).toHaveBeenCalledOnce();
    expect(localStorage.apiKeyOntoclick).toBeUndefined();

    await wrapper.setData({ conceptrecogniserValue: 'ncboa' });
    expect(window.prompt).toHaveBeenCalledTimes(2);

    await wrapper.setData({ conceptrecogniserValue: 'jax' });
    expect(window.prompt).toHaveBeenCalledTimes(2);
  });

  it('stores the key the user enters and does not ask again', async () => {
    window.prompt.mockReturnValue('  my-key ');
    wrapper = mountSearchBox();

    await wrapper.setData({ conceptrecogniserValue: 'ncbos' });
    expect(localStorage.apiKeyOntoclick).toBe('my-key');

    await wrapper.setData({ conceptrecogniserValue: 'ncboa' });
    expect(window.prompt).toHaveBeenCalledOnce();
  });
});
