import React, {
  FC, memo, useCallback, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { FeedbackButton } from '../UI/Buttons/FeedbackButton';
import { useCreateFeedbackMutation } from '../../controllers/graphql/generated';
import { TextFieldVariant } from '../UI/Inputs/input.typdefs';
import { ModalWindow } from '../UI/Modal/ModalWindow';

export const Feedback: FC = memo(() => {
  const { route } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const [create, { loading }] = useCreateFeedbackMutation({
    onCompleted: () => {
      setIsModalOpen(false);
      setFeedback('');
      enqueueSnackbar('Ваш відгук відправлено, дякуємо!', { variant: 'success' });
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

      <ModalWindow isOpen={isModalOpen} onClose={showModalHandler}>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        >
          <Typography
            sx={{
              fontSize: { md: 24 },
              paddingBottom: '1.5rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.7)',
            }}
            variant="h6"
            component="p"
          >
            Є ідеї як покращити продукт?
          </Typography>

          <Typography
            sx={{
              fontSize: { md: 16 },
              marginBottom: '1.5rem',
            }}
            variant="caption"
            component="p"
          >
            Напиши, будь ласка, що саме пішло не так. Ми щодня працюємо над
            вдосконаленням нашого сайту, тому нам важливий твій коментар 😉
          </Typography>

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
            rows={7}
            required
            disabled={loading}
            autoFocus
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
      </ModalWindow>

    </>
  );
});
