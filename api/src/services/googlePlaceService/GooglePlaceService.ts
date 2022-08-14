import {
  AddressType,
  Client,
  Language,
} from '@googlemaps/google-maps-services-js';
import {
  ClientError,
  ClientErrorTypes
} from '../../core/ClientError/ClientError';
import { GOOGLE_ERROR } from './googleService.constans';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';

export class GooglePlaceService {
  private readonly client = new Client({});
  private readonly key = getEnvVariable(ENV.GooglePlaceApiKey);
  private readonly requestConfig = {
    key: this.key,
  };

  async getCityByGoogleId(
    google_id: string
  ): Promise<{ name: string; place_id: string; types: string[] }> {
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
      throw new ClientError({
        type: ClientErrorTypes.NotFound,
        message: GOOGLE_ERROR.NotFound,
        fields: { googleId: google_id }
      });
    }

    if (
      !types.includes(AddressType.locality)
      || !types.includes(AddressType.political)
    ) {
      throw new ClientError({
        type: ClientErrorTypes.BadRequest,
        message: GOOGLE_ERROR.NotCity,
        fields: { googleId: google_id, name, types: types.join(', ') },
      });
    }

    return { name, place_id, types };
  }
}
