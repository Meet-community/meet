import {
  Client,
  Language, PlaceData,
} from '@googlemaps/google-maps-services-js';

export class GooglePlaceService {
  private readonly client = new Client({});
  private readonly key = process.env.GOOGLE_PLACE_API_KEY as string;
  private readonly requestConfig = {
    key: this.key,
  };

  async getCityByGoogleId(google_id: string): Promise<Partial<PlaceData>> {
    try {

      console.log(this.requestConfig);

    const res = await this.client.placeDetails({
      params: {
        ...this.requestConfig,
        place_id: google_id,
        language: Language.en,
      }
    });

    // const data = res.data.result;
    // const error = res.data.error_message;
    // const { place_id, name, types } = data;
    console.log(res.data.result);

    return res.data.result;
    } catch (e) {
      console.log(e);

      throw Error(e);
    }
  }
}
