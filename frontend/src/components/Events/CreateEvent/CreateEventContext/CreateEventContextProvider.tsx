import React, { FC, useMemo, useState } from 'react';
import { CreateEventContext } from './CreateEventContext';
import { HOUR } from '../../../../helpers/date';
import {
  PlaceType,
} from '../../../UI/Selects/GoogleSelect/GoogleSelect.typedefs';

interface Props {
  children: JSX.Element;
}

export const CreateEventContextProvider: FC<Props> = React.memo(({ children }) => {
  // avatar block
  const [file, setFile] = useState<File | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [isLogoError, setIsLogoError] = useState(false);

  // info block
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startAt, setStartAt] = useState<Date>(new Date(Date.now()));
  const [endAt, setEndAt] = useState<Date>(new Date(Date.now() + HOUR));
  const [eventLink, setEventLink] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(5);

  // location block
  const [googleCity, setGoogleCity] = useState<PlaceType | null>(null);
  const [googlePlace, setGooglePlace] = useState<PlaceType | null>(null);

  const value = useMemo(() => ({
    // avatar block
    file,
    setFile,
    logo,
    setLogo,
    isLogoError,
    setIsLogoError,

    //  info block
    title,
    setTitle,
    description,
    setDescription,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    eventLink,
    setEventLink,
    capacity,
    setCapacity,

    // location block
    googleCity,
    setGoogleCity,
    googlePlace,
    setGooglePlace,

    // eslint-disable-next-line max-len
  }), [capacity, description, endAt, eventLink, file, googleCity, googlePlace, isLogoError, logo, startAt, title]);

  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
});
