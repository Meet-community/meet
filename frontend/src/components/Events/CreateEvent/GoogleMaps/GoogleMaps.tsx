import React, { FC } from 'react';
import getConfig from 'next/config';

interface Props {
  placeId?: string | null;
}

export const GoogleMaps: FC<Props> = React.memo((props) => {
  const { placeId } = props;

  const { publicRuntimeConfig } = getConfig();
  const apiKey = publicRuntimeConfig.GOOGLE_PLACE_API_KEY;

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
