import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import { CreateEventContext } from './CreateEventContext';
import { getNearCoolTime, HOUR } from '../../../../helpers/date';
import {
  PlaceType,
} from '../../../UI/Selects/GoogleSelect/GoogleSelect.typedefs';
import { Maybe } from '../../../../controllers/graphql/generated';
import { isLink } from '../../../../helpers/validationRules';

interface Props {
  children: JSX.Element;
}

export const CreateEventContextProvider: FC<Props> = React.memo(({ children }) => {
  const defaultStartAt = useMemo(() => getNearCoolTime(), []);
  const defaultEndAt = useMemo(() => new Date(defaultStartAt.getTime() + HOUR), [defaultStartAt]);

  // avatar block
  const [file, setFile] = useState<Maybe<File>>(null);
  const [logo, setLogo] = useState<Maybe<string>>(null);
  const [logoError, setLogoError] = useState<Maybe<string>>(null);

  // info block
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [startAt, setStartAt] = useState<Date>(defaultStartAt);
  const [endAt, setEndAt] = useState<Date>(defaultEndAt);
  const [eventLink, setEventLink] = useState<string>('');
  const [eventLinkError, setEventLinkError] = useState<Maybe<string>>(null);
  const [capacity, setCapacity] = useState<number>(5);
  const [capacityError, setCapacityError] = useState<Maybe<string>>(null);

  // location block
  const [googleCity, setGoogleCity] = useState<PlaceType | null>(null);
  const [googlePlace, setGooglePlace] = useState<PlaceType | null>(null);

  const checkFields = useCallback(() => {
    if (!file && !logo) {
      setLogoError('Logo required');
      if (typeof window !== 'undefined') {
        window.scroll({ top: 0 });
      }

      return false;
    }

    if (eventLink && !isLink(eventLink)) {
      setEventLinkError('Should be a link');

      return false;
    }

    if (capacity < 2) {
      setCapacityError('The minimum value is 2');

      return false;
    }

    if (capacity > 100) {
      setCapacityError('The maximum value is 100');

      return false;
    }

    return true;
  }, [capacity, eventLink, file, logo]);

  const value = useMemo(() => ({
    // avatar block
    file,
    setFile,
    logo,
    setLogo,
    logoError,
    setLogoError,

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
    eventLinkError,
    setEventLinkError,
    capacity,
    setCapacity,
    capacityError,
    setCapacityError,

    // location block
    googleCity,
    setGoogleCity,
    googlePlace,
    setGooglePlace,

    // utils
    checkFields,

    // eslint-disable-next-line max-len
  }), [file, logo, logoError, title, description, startAt, endAt, eventLink, eventLinkError, capacity, capacityError, googleCity, googlePlace, checkFields]);

  return (
    <CreateEventContext.Provider value={value}>
      {children}
    </CreateEventContext.Provider>
  );
});
