import React, {
  FC, memo, useCallback, useState,
} from 'react';
import { Modal, useMediaQuery } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import { FeedbackButton } from '../UI/Buttons/FeedbackButton';
import { useCreateFeedbackMutation } from '../../controllers/graphql/generated';
import { TextFieldVariant } from '../UI/Inputs/input.typdefs';

export const Feedback: FC = memo(() => {
  const matches = useMediaQuery('(min-width:800px)');
  const { route } = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const [create, { loading }] = useCreateFeedbackMutation({
    onCompleted: () => {
      setIsModalOpen(false);
      setFeedback('');
    },
    onError: () => { /* empty */ },
  });

  const showModalHandler = useCallback(() => {
    setIsModalOpen((isOpen) => !isOpen);
  }, []);

  const handleSubmit = useCallback(() => {
    create({ variables: { args: { feedback, route } } });
  }, [create, feedback, route]);

  return (
    <>
      <FeedbackButton onClick={showModalHandler} />

      <Modal
        open={isModalOpen}
        onClose={showModalHandler}
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
          padding: '32px',
          color: '#fff',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.11))',
        }}
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          >
            <TextField
              sx={{ marginBottom: '24px' }}
              margin="none"
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              label="Відгук"
              placeholder='Напишіть ваш відгук'
              fullWidth
              variant={TextFieldVariant.Standard}
              multiline
              rows={3.4}
              required
              disabled={loading}
            />

            <LoadingButton
              sx={{ margin: '0 auto', display: 'flex' }}
              color="success"
              variant="contained"
              size="large"
              type="submit"
              loading={loading}
            >
              Відправити
            </LoadingButton>
          </form>
        </Box>
      </Modal>
    </>
  );
});
