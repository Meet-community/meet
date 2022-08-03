import React, { memo } from 'react';
import styles from '../Profile.module.scss';
import {
  useAuthUser,
} from '../../../controllers/entities/user/useAuthUserHook';

export const ProfileUserInfo = memo(() => {
  const authUser = useAuthUser();

  return (
    <div>
      <div className={styles.fullName}>
        {`${authUser?.firstName} ${authUser?.lastName}`}
      </div>

      <div className={styles.email}>
        {authUser?.email}
      </div>
    </div>
  );
});
