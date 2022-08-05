import React, {
  FC, useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import {
  ImageList,
  useMediaQuery,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  UnsplashService,
} from '../../../../services/unsplashService/UnsplashService';
import { EmptyMessage } from './EmptyMessage/EmptyMessage';
import { ImageCard } from './ImageCard/ImageCard';
import { imageSearchConfig as config } from './imageSearch.constans';
import { SearchImageInput } from './SearchImageInput/SearchImageInput';

interface Props {
  onPickImage: (url: string) => void;
}
export const ImageSearch: FC<Props> = React.memo((props) => {
  const { onPickImage } = props;

  const unsplashService = useMemo(() => new UnsplashService(), []);
  const matches = useMediaQuery('(min-width:600px)');
  const listRef = useRef<HTMLUListElement>(null);

  const [images, setImages] = useState<Basic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState(config.initialSearchQuery);

  const shouldHideGallery = useMemo(() => (
    !hasMore && !isLoading && !images.length
  ), [hasMore, images.length, isLoading]);

  const galleryHeight = useMemo(() => {
    if (shouldHideGallery) {
      return 0;
    }

    return matches ? config.galleryHeightPc : config.galleryHeightM;
  }, [matches, shouldHideGallery]);

  useEffect(() => {
    setIsLoading(false);
  }, [images]);

  useEffect(() => {
    setIsLoading(true);
    unsplashService.findImage(searchQuery || config.initialSearchQuery)
      .then((res) => {
        setImages(res.images);
        setHasMore(res.hasMore);
        listRef.current?.scroll({ top: 0 });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const fetchMore = useCallback(() => {
    if (isLoading) {
      return Promise.resolve();
    }

    setIsLoading(true);

    return unsplashService.findImage(searchQuery || config.initialSearchQuery)
      .then((res) => {
        setImages((prev) => [...prev, ...res.images]);
        setHasMore(res.hasMore);
      });
  }, [searchQuery, unsplashService, isLoading]);

  return (
    <div>
      <SearchImageInput onSearch={setSearchQuery} />
      <InfiniteScroll
        dataLength={images.length}
        next={fetchMore}
        hasMore={hasMore}
        endMessage={<EmptyMessage />}
        loader={null}
        hasChildren={false}
        scrollableTarget='scrollableImageList'
      >
        <ImageList
          sx={{
            width: '100%',
            height: galleryHeight,
          }}
          cols={matches ? 3 : 2}
          rowHeight={matches ? config.height.pc : config.height.m}
          gap={matches ? config.gap.pc : config.gap.m}
          id='scrollableImageList'
          ref={listRef}
        >
          {images.map((image) => (
            <ImageCard
              image={image}
              cardHeight={config.height}
              inImageClick={onPickImage}
            />
          ))}
        </ImageList>
      </InfiniteScroll>
    </div>
  );
});
