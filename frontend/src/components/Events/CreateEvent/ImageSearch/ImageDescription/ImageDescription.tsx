import React, { FC } from 'react';
import { Link, Typography } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import styles from './ImageDescription.module.scss';

interface Props {
  userName: string;
  userLink: string;
  photoLink: string;
}

export const ImageDescription: FC<Props> = React.memo((props) => {
  const { userName, userLink, photoLink } = props;
  const sourceLink = 'https://unsplash.com';

  return (
    <div className={styles.description}>
      <Typography
        variant="body2"
        component="p"
        sx={{
          maxWidth: { xs: 120, md: 170 },
        }}
        noWrap
      >
        {'Photo by '}
        <Link
          onClick={(e) => e.stopPropagation()}
          href={userLink}
          target="_blank"
          style={{ textDecoration: 'none' }}
        >
          {userName}
        </Link>
      </Typography>
      <Typography
        variant='caption'
        component="p"
      >
        <Link
          href={sourceLink}
          target="_blank"
          style={{ textDecoration: 'none' }}
          onClick={(e) => e.stopPropagation()}
        >
          @Unsplash
        </Link>
      </Typography>
      <Link
        href={photoLink}
        target="_blank"
        style={{
          textDecoration: 'none', position: 'absolute', top: 8, right: 8, color: 'white',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <LinkIcon />
      </Link>
    </div>
  );
});
