import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';
import Typography from '@mui/material/Typography';
import styles from './Image.module.scss';
import { ImagePreview } from './ImagePreview/ImagePreview';
import { ImageSearch } from '../../ImageSearch/ImageSearch';

interface Props {
  file?: File | null;
  setFile: (v: File | null) => void;
  logo?: string | null;
  setLogo: (v: string) => void;
}

export const LoadEventLogo: FC<Props> = React.memo((props) => {
  const {
    setFile, setLogo,
  } = props;
  const [isError, setIsError] = useState(false);
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
      setIsError(false);
      setFile(uploadedFile);
    } else {
      setIsError(true);
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
          { [styles.errorMessageVisible]: isError },
        )}
      >
        Supported by .jpg, .jpeg, .png, .x-png; Maximum 5mb
      </Typography>

      <ImageSearch onPickImage={onPickImage} />
    </>
  );
});
