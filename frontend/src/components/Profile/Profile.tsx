import React, { FC } from 'react';
import { Avatar } from './Avatar/Avatar';

export const Profile: FC = React.memo(() => {
  return (
    <>
      <h1>Profile</h1>
      <Avatar />
    </>
  );
});
