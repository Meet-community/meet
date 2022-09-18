import { FC, memo } from 'react';
import AddCommentIcon from '@mui/icons-material/AddComment';
import IconButton from '@mui/material/IconButton';
import styles from './FeedbackButton.module.scss';

interface Props {
  onClick: () => void;
}

export const FeedbackButton: FC<Props> = memo((props) => {
  const { onClick } = props;

  return (
    <IconButton
      className={styles.mobile}
      color="primary"
      onClick={onClick}
    >
      <AddCommentIcon fontSize="large" />
    </IconButton>
  );
});
