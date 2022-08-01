import React, { FC } from 'react';
import { UpdateAvatar } from './Avatar/UpdateAvatar';
import { Container } from '../UI/Container/Container';

export const Profile: FC = React.memo(() => {
  return (
    <Container pageTitle="Profile">
      <UpdateAvatar />
    </Container>
  );
});
