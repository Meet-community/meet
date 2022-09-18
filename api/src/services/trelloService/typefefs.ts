export interface CreatCardDate {
  name: string;
  desc?: string;
  pos: 'top' | 'bottom' | number;
  idList: string;
  idMembers?: string[];
  idLabels?: string[];
  urlSource?: string;
  fileSource?: File;
  address?: string;
  locationName?: string;
  coordinates?: string;
}

export interface CreateFeedbackArgs {
  creatorEmail?: string;
  feedback: string;
  route: string;
  userAgent?: string;
}
