import {
  FC, memo, useCallback, useMemo, useState,
} from 'react';
import { Box, Tab, useMediaQuery } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useRouter } from 'next/router';
import { PageContainer } from '../UI/Container/PageContainer';
import { EventsTabs } from '../../helpers/events/events.typedefs';
import styles from './Events.module.scss';
import { tabsConfig } from '../../helpers/events/events.constans';
import { getUrl } from '../../helpers/getUrl';
import { ROUTES } from '../../../routes/routes';
import { getEventsPageByTab } from '../../helpers/events/events.helpers';

interface Props {
  activeTab?: EventsTabs;
}

export const Events: FC<Props> = memo((props) => {
  const { activeTab: defaultTab = EventsTabs.All } = props;

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [isLoading, setIsLoading] = useState(true);

  const matches = useMediaQuery('(min-width:900px)');
  const router = useRouter();

  const changeTabHandler = useCallback((tab: EventsTabs) => {
    setActiveTab(tab);
    router.push(getUrl(ROUTES.events.index, tab));
  }, [router]);

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
        <EventsList setIsLoading={setIsLoading} />
      </>
    </PageContainer>
  );
});
