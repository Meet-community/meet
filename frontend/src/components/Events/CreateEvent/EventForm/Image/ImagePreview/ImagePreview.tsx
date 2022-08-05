import React, { FC } from 'react';
import { CardMedia, ImageListItem, ImageListItemBar } from '@mui/material';
import cn from 'classnames';
import styles from '../Image.module.scss';

interface Props {
  url?: string | null;
}

export const ImagePreview: FC<Props> = React.memo((props) => {
  const { url } = props;

  return (
    <div className={cn(styles.imageWrapper, styles.imageSize)}>
      <ImageListItem>
        <CardMedia
          component="img"
          image={url || 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'}
          alt="Event Logo"
          className={styles.imageSize}
        />

        <ImageListItemBar
          title='Event preview'
          subtitle="Load a picture or choose some picture from the search"
        />
      </ImageListItem>
    </div>
  );
});
