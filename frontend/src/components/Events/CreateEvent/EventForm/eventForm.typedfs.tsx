export interface EventFormValues {
  title: string;
  description: string;
  startAt: Date;
  endAt: Date;
  logoFile?: File;
  capacity: number;
  minCapacity: number;
  googleCityId: string;
  googlePlaceId?: string;
  logo?: string;
}
