import { afterEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import TableOptions from 'src/components/SearchBox/table/TableOptions';

// With no recogniser dropdown in the DOM, requests default to NCBO Bioportal Search and the HP ontology
describe('TableOptions', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('keeps NCBO results when another service fails', async () => {
    vi.spyOn(axios, 'get').mockImplementation((url) => {
      if (url === process.env.NCBO_SEARCH) {
        return Promise.resolve({ data: { collection: [{ notation: 'HP:0001156', prefLabel: 'Brachydactyly' }], totalCount: 1 } });
      }
      return Promise.reject(new Error('CORS'));
    });
    vi.spyOn(console, 'log').mockImplementation(() => {});

    const response = await TableOptions.requestFunction({ q: 'brachydactyly', page: 1 });

    expect(TableOptions.responseAdapter(response)).toEqual({
      data: [{ notation: 'HP:0001156', prefLabel: 'Brachydactyly' }],
      count: 1,
    });
  });

  it('sends the stored NCBO key and lowercase ontologies to EBI', async () => {
    localStorage.apiKeyOntoclick = 'my-key';
    const get = vi.spyOn(axios, 'get').mockResolvedValue({ data: {} });

    await TableOptions.requestFunction({ q: 'brachydactyly', page: 2 });

    const params = Object.fromEntries(get.mock.calls.map(([url, { params }]) => [url, params]));
    expect(params[process.env.NCBO_SEARCH].apikey).toBe('my-key');
    expect(params[process.env.EBI]).toMatchObject({ ontology: 'hp', start: 5 });
  });
});
