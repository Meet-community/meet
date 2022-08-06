import React from 'react';
import { Maybe } from '../../../../controllers/graphql/generated';
import {
  PlaceType,
} from '../../../UI/Selects/GoogleSelect/GoogleSelect.typedefs';

export interface CreateEventContextProps {
  // Avatar block
  file?: Maybe<File>;
  setFile: (v:Maybe<File>) => void;
  logo?: Maybe<string>;
  setLogo: (v: Maybe<string>) => void;
  logoError: Maybe<string>;
  setLogoError: (v: Maybe<string>) => void;

  // Info block
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  startAt: Date;
  setStartAt: (v: Date) => void;
  endAt: Date;
  setEndAt: (v: Date) => void;
  eventLink: string;
  setEventLink: (v: string) => void;
  eventLinkError: Maybe<string>;
  setEventLinkError: (v: Maybe<string>) => void;
  capacity: number;
  setCapacity: (v: number) => void;
  capacityError: Maybe<string>,
  setCapacityError: (v: Maybe<string>) => void

  // location block
  googleCity: Maybe<PlaceType>;
  setGoogleCity: (v: Maybe<PlaceType>) => void;
  googlePlace: Maybe<PlaceType>;
  setGooglePlace: (v: Maybe<PlaceType>) => void;

  // utils
  checkFields: () => boolean;
}

export const CreateEventContext = React.createContext<CreateEventContextProps>({
  // Avatar block
  setFile: () => { /* empty */ },
  setLogo: () => { /* empty */ },
  logoError: '',
  setLogoError: () => { /* empty */ },

  // Info block
  title: '',
  setTitle: () => { /* empty */ },
  description: '',
  setDescription: () => { /* empty */ },
  startAt: new Date(),
  setStartAt: () => { /* empty */ },
  endAt: new Date(),
  setEndAt: () => { /* empty */ },
  eventLink: '',
  setEventLink: () => { /* empty */ },
  eventLinkError: null,
  setEventLinkError: () => { /* empty */ },
  capacity: 5,
  setCapacity: () => { /* empty */ },
  capacityError: null,
  setCapacityError: () => { /* empty */ },

  // location block
  googleCity: null,
  setGoogleCity: () => { /* empty */ },
  googlePlace: null,
  setGooglePlace: () => { /* empty */ },

  // utils
  checkFields: () => false,
});
