import React, { FC, memo } from 'react';
import Box from '@mui/material/Box';
import {
  CardMedia,
  ImageListItem,
  ImageListItemBar,
  Skeleton, useMediaQuery,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Group } from '@mui/icons-material';
import { EventFullFragment } from '../../controllers/graphql/generated';

interface Props {
  event?: EventFullFragment | null;
  loading: boolean;
}

export const EventLogo: FC<Props> = memo((props) => {
  const { event, loading } = props;
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Box>
      <ImageListItem sx={{ width: '100%' }}>
        {loading ? (
          <Skeleton
            sx={{ bgcolor: 'grey.900' }}
            variant="rectangular"
            width='100%'
            height='350px'
          />
        ) : (
          <CardMedia
            component="img"
            height="350px"
            image={event?.logo ? event.logo : ''}
            alt="Event Logo"
          />
        )}

        <ImageListItemBar
          sx={{
            '.MuiImageListItemBar-titleWrap': {
              padding: { xs: '0 12px', sm: '0 40px' },
            },
            '.MuiImageListItemBar-actionIcon': {
              padding: { xs: '0 12px', sm: '0 40px' },
              display: 'flex',
              flexDirection: matches ? 'column' : 'row',
              gap: '8px',
            },
            padding: '12px 0',
            flexWrap: 'wrap',
          }}
          subtitle={!event?.creator
            ? (
              <Box>
                <Skeleton
                  animation="wave"
                  variant="text"
                  sx={{ width: 305, height: 56 }}
                />
              </Box>
            )
            : (
              <Typography
                variant={matches ? 'h4' : 'h5'}
              >
                {event?.title}
              </Typography>
            )}
          actionIcon={!event
            ? (
              <>
                <Box>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ width: 111, height: 24 }}
                  />
                </Box>

                <Box>
                  <Skeleton
                    animation="wave"
                    variant="text"
                    sx={{ width: 111, height: 24 }}
                  />
                </Box>
              </>
            )
            : (
              <>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LocationOnIcon aria-label="city" />

                  {event?.city.name}
                </Typography>

                <Typography sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Group aria-label="city" />

                  {`${event?.participants.length} з ${event?.capacity}`}
                </Typography>
              </>
            )}
        />
      </ImageListItem>
    </Box>
  );
});
