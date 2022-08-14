import React, {
  FC, useCallback, useEffect, useMemo,
} from 'react';
import { useMediaQuery } from '@mui/material';
import { NoSsr } from '@mui/base';
import { useEventsQuery } from '../../../controllers/graphql/generated';
import { EventsList } from '../EventsList/EventsList';
import {
  GoogleSelectTypes, PlaceType,
} from '../../UI/Selects/GoogleSelect/GoogleSelect.typedefs';
import {
  GoogleSelectMulti,
} from '../../UI/Selects/GoogleSelect/GoogleSelectMulti';
import styles from '../Events.module.scss';
import { useLocalStorage } from '../../../hooks/useLocaleStorage';

interface Props {
  setIsLoading: (v: boolean) => void;
}

export const EventsAll: FC<Props> = React.memo((props) => {
  const { setIsLoading } = props;

  const [citiesFilter, setCitiesFilter] = useLocalStorage<PlaceType[]>('event_page_cities_filter', []);

  const matches = useMediaQuery('(min-width:900px)');
  const { data: eventsData, loading, refetch } = useEventsQuery();

  const events = useMemo(() => (eventsData?.events
    ? eventsData.events
    : []
  ), [eventsData]);

  const onChangeCitiesFilter = useCallback((place: PlaceType[]) => {
    setCitiesFilter(place);
  }, [setCitiesFilter]);

  useEffect(() => {
    if (!loading) {
      refetch({
        filters: {
          googleCityIds: citiesFilter.map((el) => el.placeId),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesFilter, refetch]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  return (
    <>
      <div className={styles.container}>
        <NoSsr>
          <GoogleSelectMulti
            type={[GoogleSelectTypes.Cities]}
            onChange={onChangeCitiesFilter}
            value={citiesFilter}
            label="Cities filter"
            placeholder={citiesFilter.length ? '' : 'Select cities to filter events'}
            maxTags={matches ? 8 : 2}
          />
        </NoSsr>
      </div>
      <EventsList events={events} />
    </>
  );
});
