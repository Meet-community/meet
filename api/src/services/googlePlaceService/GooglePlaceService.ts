import {
  AddressType,
  Client,
  Language,
} from '@googlemaps/google-maps-services-js';

export class GooglePlaceService {
  private readonly client = new Client({});
  private readonly key = process.env.GOOGLE_PLACE_API_KEY as string;
  private readonly requestConfig = {
    key: this.key,
  };

  async getCityByGoogleId(
    google_id: string
  ): Promise<{ name: string; place_id: string; types: string[] }> {
    try {

      const response = await this.client.placeDetails({
        params: {
          ...this.requestConfig,
          place_id: google_id,
          language: Language.en,
          fields: ['types', 'place_id', 'name']
        }
      });

      const { name, types, place_id } = response.data.result;

      if (!name || !types || !place_id) {
        throw Error(`Can not get city for googleId: ${google_id}`);
      }

      if (
        !types.includes(AddressType.locality)
        || !types.includes(AddressType.political)
      ) {
        throw Error(`GoogleId: ${google_id} it's not a city. Name: ${name}, types: ${types}`);
      }

      return { name, place_id, types };

    } catch (e) {
      throw Error(e);
    }
  }
}
