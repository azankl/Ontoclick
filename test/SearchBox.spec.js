import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBox from 'src/components/SearchBox/SearchBox.vue';

describe('SearchBox.vue', () => {
  let wrapper;

  beforeEach(() => {
    localStorage.clear();
    // mounted() asks for an NCBO API key when none is stored
    vi.stubGlobal('prompt', vi.fn(() => null));
  });

  afterEach(() => {
    wrapper.destroy();
    vi.unstubAllGlobals();
  });

  it('should render correct contents', () => {
    wrapper = mount(SearchBox, { attachTo: document.body, stubs: ['v-server-table'] });
    expect(wrapper.find('h3').text()).toBe('ONTOCLICK');
  });

  it('falls back to the built-in NCBO key when the prompt is cancelled', () => {
    wrapper = mount(SearchBox, { attachTo: document.body, stubs: ['v-server-table'] });
    expect(window.prompt).toHaveBeenCalledOnce();
    expect(localStorage.apiKeyOntoclick).toBeTruthy();
  });
});
