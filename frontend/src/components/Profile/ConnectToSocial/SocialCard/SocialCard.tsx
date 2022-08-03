import React, {
  FC, useEffect, useMemo, useState,
} from 'react';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import styles from './SociaCard.module.scss';

interface Props {
  Icon: FC<any>
  title: string,
  link?: string,
  onUpdate: (link: string | null) => void,
  isLoading: boolean,
}

export const SocialCard: FC<Props> = React.memo((props) => {
  const {
    title, Icon, link, onUpdate, isLoading: loading,
  } = props;

  const [isEdit, setIsEdit] = useState(false);
  const [linkToAdd, setLinkToAdd] = useState('');
  const [isError, setIsError] = useState(false);

  const isLoading = useMemo(() => loading && isEdit, [loading, isEdit]);

  const submitHandler = async () => {
    if (!linkToAdd.startsWith('https://') || linkToAdd.length < 9) {
      setIsError(true);

      return;
    }

    setIsError(false);

    onUpdate(linkToAdd);
  };

  useEffect(() => {
    setIsEdit(false);
    setLinkToAdd('');
    setIsError(false);
  }, [link]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.infoContainer}>
          <Icon fontSize='large' />
          <div style={{ marginLeft: '16px' }}>
            <Typography
              variant='overline'
              component='h3'
            >
              {title}
            </Typography>
            {link && (
              <Typography
                variant='caption'
                component='p'
                color='silver'
                sx={{ marginTop: '-8px' }}
                maxWidth='250px'
                noWrap
              >
                <a style={{ color: 'inherit' }} href={link} target='_blank' rel="noreferrer">
                  {link}
                </a>
              </Typography>
            )}
          </div>
        </div>

        {/* eslint-disable-next-line no-nested-ternary */}
        {link
          ? (
            <LoadingButton
              loading={isLoading}
              variant="outlined"
              color="error"
              onClick={() => onUpdate(null)}
              sx={{ width: 100 }}
            >
              remove
            </LoadingButton>
          )
          : (isEdit
            ? (
              <div className={styles.infoContainer}>
                <LoadingButton
                  variant="outlined"
                  disabled={isLoading}
                  color="error"
                  sx={{ marginRight: 2, width: 100 }}
                  onClick={() => {
                    setIsEdit(false);
                    setIsError(false);
                    setLinkToAdd('');
                  }}
                >
                  cancel
                </LoadingButton>
                <LoadingButton
                  loading={isLoading}
                  onClick={submitHandler}
                  variant="outlined"
                  color="success"
                  sx={{ width: 100 }}
                >
                  save
                </LoadingButton>
              </div>
            )
            : (
              <LoadingButton
                loading={isLoading}
                variant="contained"
                color="success"
                sx={{ width: 100 }}
                onClick={() => setIsEdit(true)}
              >
                add
              </LoadingButton>
            )
          )}

      </div>
      <div className={cn(styles.accordion, { [styles.accordionOpen]: isEdit })}>

        <TextField
          margin="none"
          id="linkToAdd"
          value={linkToAdd}
          onChange={(e) => setLinkToAdd(e.target.value)}
          label="Link"
          name="linkToAdd"
          placeholder='https://link/example.com'
          required
          fullWidth
          error={isError}
          helperText={isError && 'Should be a link'}
        />
      </div>
    </>
  );
});
