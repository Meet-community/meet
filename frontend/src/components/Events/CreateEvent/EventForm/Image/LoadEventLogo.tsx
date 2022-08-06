import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import styles from './Image.module.scss';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { ImageSearch } from '../../ImageSearch/ImageSearch';
import {
  useCreateEventContext,
} from '../../CreateEventContext/useCreateEventContext';

export const LoadEventLogo: FC = React.memo(() => {
  const {
    setLogo,
    isLogoError, setIsLogoError,
    setFile,
  } = useCreateEventContext();
  const [preview, setPreview] = useState<null | string>(null);

  const validateFile = (fileToUpload: File) => (
    fileToUpload?.size
    && fileToUpload.size <= 1024 * 1024 * 5
    && ['image/x-png', 'image/png', 'image/jpeg', 'image/jpg'].includes(fileToUpload.type)
  );

  const onLoadFileHandler = (
    { target: { validity, files } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadedFile = files?.[0];

    if (!uploadedFile) {
      return;
    }

    if (validity.valid && validateFile(uploadedFile)) {
      const previewImg = URL.createObjectURL(uploadedFile);

      setPreview(previewImg);
      setIsLogoError(false);
      setFile(uploadedFile);
    } else {
      setIsLogoError(true);
    }
  };

  const onPickImage = useCallback((url: string) => {
    setFile(null);
    setLogo(url);
    setPreview(url);
  }, [setFile, setLogo]);

  return (
    <>
      <input
        id='uploadEventLogo'
        type="file"
        accept="image/x-png, image/png, image/jpeg, image/jpg"
        className={styles.inputHidden}
        onChange={onLoadFileHandler}
      />

      <label
        htmlFor='uploadEventLogo'
      >
        <ImagePreview url={preview} />
      </label>
      <Typography
        variant="caption"
        component='p'
        color='#ff7961'
        className={cn(
          styles.errorMessage,
          { [styles.errorMessageVisible]: isLogoError },
        )}
      >
        Supported by .jpg, .jpeg, .png, .x-png; Maximum 5mb
      </Typography>

      <div className={styles.container}>
        <ImageSearch onPickImage={onPickImage} />
      </div>
    </>
  );
});
