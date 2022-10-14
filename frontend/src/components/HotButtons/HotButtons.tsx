import { FC, memo } from 'react';
import { Feedback } from '../Feedback/Feedback';
import { CreateEventButton } from '../UI/Buttons/CreateEventButton';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';

export const HotButtons: FC = memo(() => {
  const user = useAuthUser();

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '12px',
      zIndex: '10',
    }}
    >
      {user && <CreateEventButton />}

      <Feedback />
    </div>
  );
});
