import { FC, memo } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';

interface Props {
  onClick: () => void;
}

export const FeedbackButton: FC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <IconButton
      sx={{
        position: 'fixed !important',
        bottom: '24px',
        right: '24px',
        padding: '12px',
        zIndex: '10',
        color: '#29b6f6',
        backgroundColor: 'rgba(144, 202, 249, 0.04)',
        borderRadius: '50%',
      }}
      color="primary"
      onClick={onClick}
    >
      <AddCommentIcon fontSize="large" />
    </IconButton>
  );
});
