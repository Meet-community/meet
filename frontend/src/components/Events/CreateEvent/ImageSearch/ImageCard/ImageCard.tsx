import React, { FC } from 'react';
import { ImageListItem, Paper } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { ImageDescription } from '../ImageDescription/ImageDescription';

interface Props {
  image: Basic;
  cardHeight: {
    m: number;
    pc: number;
  }
  inImageClick: (url: string) => void;
}

export const ImageCard: FC<Props> = React.memo((props) => {
  const { image, cardHeight, inImageClick } = props;

  return (
    <Paper elevation={24} key={image.id}>
      <ImageListItem
        sx={{
          height: { xs: cardHeight.m, sm: cardHeight.pc },
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => inImageClick(image.urls.regular)}
      >
        <img
          src={image.urls.regular}
          alt={image.alt_description || image.description || 'image'}
          loading="lazy"
        />
        <ImageDescription
          userName={image.user.username}
          userLink={image.user.links.html}
          photoLink={image.links.html}
        />
      </ImageListItem>
    </Paper>
  );
});
