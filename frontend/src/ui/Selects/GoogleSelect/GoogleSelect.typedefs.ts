export enum GoogleSelectTypes {
  Geocode = 'geocode',
  Address = 'address',
  Establishment = 'establishment',
  Regions = '(regions)',
  Cities = '(cities)',
}

export interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
}
export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}
