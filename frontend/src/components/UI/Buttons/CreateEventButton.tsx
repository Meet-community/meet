import { memo, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { ROUTES } from '../../../../routes/routes';

export const CreateEventButton = memo(() => {
  const route = useRouter();

  const handleClick = useCallback(() => {
    route.push(`/${ROUTES.events.index}/${ROUTES.events.create}`);
  }, [route]);

  return (
    <IconButton
      sx={{
        padding: '12px',
        color: '#29b6f6',
        backgroundColor: 'rgba(144, 202, 249, 0.04)',
        borderRadius: '50%',
      }}
      color="primary"
      onClick={handleClick}
    >
      <FiberNewIcon fontSize="large" />
    </IconButton>
  );
});
