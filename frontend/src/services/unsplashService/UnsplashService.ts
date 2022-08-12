import { createApi } from 'unsplash-js';
// eslint-disable-next-line import/no-unresolved
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';

interface FindResult {
  hasMore: boolean;
  images: Basic[];
}

export class UnsplashService {
  private readonly server;

  private pages = 1;

  private page = 1;

  private query = '';

  constructor() {
    const accessKey = getEnvVariable(ENV.UnsplashAccessKey);

    this.server = createApi({ accessKey });
  }

  async findImage(query: string): Promise<FindResult> {
    if (this.query !== query) {
      this.query = query;
      this.pages = 1;
      this.page = 1;
    }

    if (this.pages < this.page) {
      return { hasMore: false, images: [] };
    }

    try {
      const { response } = await this.server.search.getPhotos({
        query,
        page: this.page,
        orientation: 'landscape',
        perPage: 24,
      });

      if (!response?.results) {
        throw Error('Unsplash service error');
      }

      const images = response.results;

      this.pages = response.total_pages;
      this.page += 1;

      const hasMore = this.page <= this.pages;

      return { hasMore, images };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);

      return { hasMore: false, images: [] };
    }
  }
}
