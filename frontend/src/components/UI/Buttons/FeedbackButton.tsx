import { FC, memo } from 'react';
import RateReviewIcon from '@mui/icons-material/RateReview';
import IconButton from '@mui/material/IconButton';

interface Props {
  onClick: () => void;
}

export const FeedbackButton: FC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <IconButton
      sx={{
        padding: '12px',
        color: '#29b6f6',
        backgroundColor: 'rgba(144, 202, 249, 0.04)',
        borderRadius: '50%',
      }}
      color="primary"
      onClick={onClick}
    >
      <RateReviewIcon fontSize="large" />
    </IconButton>
  );
});
