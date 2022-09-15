import React, { memo, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { SocialCard } from './SocialCard/SocialCard';
import {
  useAuthUser,
} from '../../../controllers/entities/user/useAuthUserHook';
import {
  UpdateUserArgs,
  useUpdateUserMutation,
} from '../../../controllers/graphql/generated';

export const ConnectToSocial = memo(() => {
  const authUser = useAuthUser();
  const [update, { loading }] = useUpdateUserMutation({
    onError: () => { /* TODO: add message */ },
  });

  const onUpdate = useCallback((args: UpdateUserArgs): Promise<any> => {
    if (!authUser) {
      return Promise.resolve();
    }

    return update({
      variables: { args },
      optimisticResponse: {
        updateUser: {
          __typename: 'User',
          ...authUser,
          telegram: 'telegram' in args ? args.telegram : authUser.telegram,
          instagram: 'instagram' in args ? args.instagram : authUser.instagram,
          facebook: 'facebook' in args ? args.facebook : authUser.facebook,
        },
      },
    });
  }, [authUser, update]);

  return (
    <>
      <Typography
        sx={{
          fontSize: { md: 24 },
          marginBottom: 2,
        }}
        variant="h6"
        component="p"
      >
        Соціальні мережі
      </Typography>

      <div style={{ marginBottom: '16px' }}>
        <SocialCard
          Icon={TelegramIcon}
          title="Telegram"
          onUpdate={(telegram) => onUpdate({ telegram })}
          isLoading={loading}
          link={authUser?.telegram || ''}
        />
      </div>

      <div style={{ marginBottom: '16px' }}>
        <SocialCard
          Icon={InstagramIcon}
          title="Instagram"
          onUpdate={(instagram) => onUpdate({ instagram })}
          isLoading={loading}
          link={authUser?.instagram || ''}
        />
      </div>

      <SocialCard
        Icon={FacebookIcon}
        title="Facebook"
        onUpdate={(facebook) => onUpdate({ facebook })}
        isLoading={loading}
        link={authUser?.facebook || ''}
      />

    </>
  );
});
