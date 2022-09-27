import React, { FC, useCallback, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import {
  useCreateEventContext,
} from '../../CreateEventContext/useCreateEventContext';
import { GoogleSelect } from '../../../../UI/Selects/GoogleSelect/GoogleSelect';
import {
  GoogleSelectTypes, PlaceType,
} from '../../../../UI/Selects/GoogleSelect/GoogleSelect.typedefs';
import { GoogleMaps } from '../../GoogleMaps/GoogleMaps';
import styles from './EventLocation.module.scss';
import { Maybe } from '../../../../../controllers/graphql/generated';

export const EventLocation: FC = React.memo(() => {
  const {
    googleCity,
    setGoogleCity,
    googlePlace,
    setGooglePlace,
  } = useCreateEventContext();

  const placeId = useMemo(() => (
    googlePlace?.placeId || googleCity?.placeId || null
  ), [googleCity?.placeId, googlePlace?.placeId]);

  const changeCityHandler = useCallback((v: Maybe<PlaceType>) => {
    setGoogleCity(v);
    setGooglePlace(null);
  }, [setGoogleCity, setGooglePlace]);

  return (
    <div>

      <div className={styles.container}>
        <Typography
          variant='h5'
        >
          Місце події
        </Typography>

        <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>

          <Grid item xs={12} md={6}>
            <GoogleSelect
              type={[GoogleSelectTypes.Cities]}
              onChange={changeCityHandler}
              value={googleCity}
              required
              label="Місто"
              placeholder="Kyiv"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <GoogleSelect
              type={[GoogleSelectTypes.Establishment]}
              onChange={setGooglePlace}
              value={googlePlace}
              label="Місцерозташування"
              placeholder="Майдан незалежності"
              placePrefix={googleCity ? googleCity.name : ''}
            />
          </Grid>

        </Grid>
      </div>

      <div className={styles.mapsWrapper}>
        <GoogleMaps placeId={placeId} />
      </div>

    </div>
  );
});
