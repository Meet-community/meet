export enum GoogleSelectTypes {
  Geocode = 'geocode',
  Address = 'address',
  Establishment = 'establishment',
  Regions = '(regions)',
  Cities = 'locality',
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
}

export interface SelectValueType {
  description: string;
  place_id: string;
  structured_formatting: StructuredFormatting;
  types: string[];
}

export interface PlaceType {
  description: string;
  name: string;
  placeId: string;
  types: string[];
  mainTextMatched?: any[];
  mainText?: string;
  secondaryText?: string;
}
