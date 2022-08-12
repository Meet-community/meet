import React, { FC } from 'react';
import { ENV, getEnvVariable } from '../../../../helpers/getEnvVariable';

interface Props {
  placeId?: string | null;
}

export const GoogleMaps: FC<Props> = React.memo((props) => {
  const { placeId } = props;

  const apiKey = getEnvVariable(ENV.GooglePlaceApiKey);

  return (
    <iframe
      title='googleMaps'
      style={{ border: 0, width: '100%', height: '100%' }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId || 'ChIJH7mh_1DO1EARHHl-_mJZLQQ'}`}
    />
  );
});
