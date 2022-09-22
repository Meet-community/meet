import { FC, memo } from 'react';
import Box from '@mui/material/Box';
import { Modal, useMediaQuery } from '@mui/material';
import { CloseIcon } from '../icons/CloseIcon';
import styles from './ModalWindow.module.scss';

interface Props {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalWindow: FC<Props> = memo((props) => {
  const { children, isOpen, onClose } = props;

  const matches = useMediaQuery('(min-width:800px)');

  return (
    <Modal
      className={styles.modal}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches ? '40%' : '90%',
        backgroundColor: '#121212',
        borderRadius: '10px',
        padding: { xs: '20px', md: '28px' },
        color: '#fff',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))',
      }}
      >
        {isOpen && (
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            <CloseIcon width={16} height={16} />
          </button>
        )}

        {children}
      </Box>
    </Modal>
  );
});
