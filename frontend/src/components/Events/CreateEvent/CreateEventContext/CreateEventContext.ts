import React from 'react';
import {
  PlaceType,
} from '../../../UI/Selects/GoogleSelect/GoogleSelect.typedefs';

export interface CreateEventContextProps {
  // Avatar block
  file?: File | null;
  setFile: (v: File | null) => void;
  logo?: string | null;
  setLogo: (v: string) => void;
  isLogoError: boolean;
  setIsLogoError: (v: boolean) => void;

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
  capacity: number;
  setCapacity: (v: number) => void;

  // location block
  googleCity: PlaceType | null;
  setGoogleCity: (v: PlaceType | null) => void;
  googlePlace: PlaceType | null;
  setGooglePlace: (v: PlaceType | null) => void;
}

export const CreateEventContext = React.createContext<CreateEventContextProps>({
  // Avatar block
  setFile: () => { /* empty */ },
  setLogo: () => { /* empty */ },
  isLogoError: false,
  setIsLogoError: () => { /* empty */ },

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
  capacity: 5,
  setCapacity: () => { /* empty */ },

  // location block
  googleCity: null,
  setGoogleCity: () => { /* empty */ },
  googlePlace: null,
  setGooglePlace: () => { /* empty */ },
});
