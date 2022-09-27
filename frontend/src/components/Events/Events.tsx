import React, {
  FC, memo, useCallback, useMemo, useState,
} from 'react';
import {
  Box, Tab, useMediaQuery,
} from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { PageContainer } from '../UI/Container/PageContainer';
import { EventsTabs } from '../../helpers/events/events.typedefs';
import styles from './Events.module.scss';
import { tabsConfig } from '../../helpers/events/events.constans';
import { getUrl } from '../../helpers/getUrl';
import { ROUTES } from '../../../routes/routes';
import { getEventsPageByTab } from '../../helpers/events/events.helpers';
import { useEventsSwiper } from '../../hooks/useEventsSwiper';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';

interface Props {
  activeTab?: EventsTabs;
}

export const Events: FC<Props> = memo((props) => {
  const { activeTab: defaultTab = EventsTabs.All } = props;

  const user = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(false);

  const matches = useMediaQuery('(min-width:900px)');
  const router = useRouter();
  const swipHandler = useEventsSwiper();

  const changeTabHandler = useCallback((tab: EventsTabs) => {
    if (!user) {
      enqueueSnackbar('Спершу потрібно авторизуватись', {
        style: { cursor: 'pointer' },
        variant: 'info',
        onClick: () => router.push(`${ROUTES.signIn}`),
        action: (
          <Button
            variant="text"
            sx={{ color: 'white' }}
          >
            <LoginIcon />
          </Button>
        ),
      });

      return;
    }

    setActiveTab(tab);
    router.push(getUrl(ROUTES.events.index, tab));
  }, [enqueueSnackbar, router, user]);

  const EventsList = useMemo(() => (
    getEventsPageByTab(activeTab)
  ), [activeTab]);

  return (
    <PageContainer style={{ paddingTop: 0 }} isLoading={isLoading}>
      <>
        <div className={styles.container}>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={activeTab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={(_, tab) => changeTabHandler(tab)}
                  aria-label="lab API tabs example"
                  centered={!matches}
                >
                  {tabsConfig.map((tab) => {
                    const { label, value, Icon } = tab;

                    return (
                      <Tab
                        key={value}
                        value={value}
                        label={label}
                        icon={<Icon />}
                        iconPosition='start'
                      />
                    );
                  })}
                </TabList>
              </Box>
            </TabContext>
          </Box>
        </div>
        <div style={{ minHeight: '80vh' }} {...swipHandler}>
          <EventsList setIsLoading={setIsLoading} />
        </div>
      </>
    </PageContainer>
  );
});
