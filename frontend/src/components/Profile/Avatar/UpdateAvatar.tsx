import React, {
  FC, useState,
} from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import cn from 'classnames';
import {
  useUpdateUserAvatarMutation,
} from '../../../controllers/graphql/generated';
import {
  useAuthUser,
} from '../../../controllers/entities/user/useAuthUserHook';
import styles from './UploadAvatar.module.scss';

export const UpdateAvatar: FC = React.memo(() => {
  const [update, { loading }] = useUpdateUserAvatarMutation();
  const [isError, setIsError] = useState(false);
  const authUser = useAuthUser();

  const validateFile = (fileToUpload: File) => (
    fileToUpload?.size
    && fileToUpload.size <= 1024 * 1024 * 2
    && ['image/x-png', 'image/png', 'image/jpeg'].includes(fileToUpload.type)
  );

  const changeFileHandler = (
    { target: { validity, files } }: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const uploadedFile = files?.[0];

    if (!uploadedFile) {
      return;
    }

    if (validity.valid && validateFile(uploadedFile)) {
      setIsError(false);

      update({
        variables: {
          args: {
            file: uploadedFile,
          },
        },
      });
    } else {
      setIsError(true);
    }
  };

  return (
    <form>
      <input
        id='uploadAvatarInput'
        type="file"
        accept="image/x-png, image/png, image/jpeg, image/gif"
        className={styles.inputHidden}
        onChange={changeFileHandler}
        disabled={loading}
      />
      <div className={styles.container}>
        <span
          className={cn(
            styles.avatarWrapper,
            { [styles.avatarError]: isError },
          )}
        >
          <Avatar
            alt='user avatar'
            src={authUser?.avatar || '/static/images/avatar/1.jpg'}
            sx={{
              width: { xs: 200, md: 300 },
              height: { xs: 200, md: 300 },
            }}
          />
          <label htmlFor='uploadAvatarInput'>
            <Typography
              variant="overline"
              noWrap
              component="div"
              className={styles.editAvatarBadge}
            >
              edit avatar
            </Typography>
          </label>
          <div
            className={cn(
              styles.avatarLoader,
              { [styles.avatarLoaderActive]: loading },
            )}
          />
        </span>
        <Typography
          variant="caption"
          component='p'
          color='#ff7961'
          className={cn(
            styles.errorMessage,
            { [styles.errorMessageVisible]: isError },
          )}
        >
          Supported by .jpg, .jpeg, .png; Maximum 2mb
        </Typography>
      </div>
    </form>
  );
});
