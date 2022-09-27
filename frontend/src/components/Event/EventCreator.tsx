import React, { FC, memo } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import SentimentVeryDissatisfiedIcon
  from '@mui/icons-material/SentimentVeryDissatisfied';

interface Creator {
  id: number,
  firstName: string,
  lastName: string,
  avatar?: string | null,
  email: string,
  telegram?: string | null,
  facebook?: string | null,
  instagram?: string | null
}

interface Props {
  creator: Creator;
}

export const EventCreator: FC<Props> = memo((props) => {
  const { creator } = props;

  return (
    <Grid
      container
      justifyItems='center'
    >
      <Grid
        item
        xs={12}
        sx={{ marginBottom: '12px' }}
      >
        <Avatar
          src={creator.avatar || '/static/images/avatar/1.jpg'}
          alt={creator.firstName}
          sx={{
            width: { xs: '80px', md: '120px' },
            height: { xs: '80px', md: '120px' },
            margin: '0 auto 12px',
          }}
        />

        <Typography sx={{ textAlign: 'center' }}>
          {`${creator.firstName} ${creator.lastName} - Творець події`}
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
      >
        <Typography
          variant='h6'
          sx={{
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          Соціальні мережі
        </Typography>

        <Typography sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
        >
          {creator.instagram && (
            <Typography
              sx={{ textAlign: { xs: 'center' } }}
              variant='body2'
            >
              <Link
                href={`${creator.instagram}`}
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <InstagramIcon />

                Instagram
              </Link>
            </Typography>
          )}

          {creator.telegram && (
            <Typography sx={{ textAlign: { xs: 'center' } }}>
              <Link
                href={`${creator.telegram}`}
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <TelegramIcon />

                Telegram
              </Link>
            </Typography>
          )}

          {creator.facebook && (
            <Typography sx={{ textAlign: { xs: 'center' } }}>
              <Link
                href={`${creator.facebook}`}
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <FacebookIcon />

                Facebook
              </Link>
            </Typography>
          )}

          {!creator.telegram && !creator.facebook && !creator.instagram && (
            <Typography sx={{
              textAlign: { xs: 'center' },
              display: 'flex',
              alignItem: 'center',
              gap: '8px',
            }}
            >
              У користувача немає соціальних мереж

              <SentimentVeryDissatisfiedIcon />
            </Typography>
          )}
        </Typography>
      </Grid>
    </Grid>
  );
});
