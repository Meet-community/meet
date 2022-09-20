import { SwipeableHandlers, useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { EventsTabs } from '../helpers/events/events.typedefs';
import { ROUTES } from '../../routes/routes';
import { getUrl } from '../helpers/getUrl';

const getActiveTabFromPath = (path: string): EventsTabs => {
  if (path.endsWith(ROUTES.events.all)) {
    return EventsTabs.All;
  }

  if (path.endsWith(ROUTES.events.planned)) {
    return EventsTabs.Planned;
  }

  if (path.endsWith(ROUTES.events.archived)) {
    return EventsTabs.Archived;
  }

  return EventsTabs.All;
};

export const useEventsSwiper = (): SwipeableHandlers => {
  const router = useRouter();

  const tabs = useMemo(() => (
    [EventsTabs.All, EventsTabs.Planned, EventsTabs.Archived]
  ), []);
  const activeTabIndex = tabs.indexOf(getActiveTabFromPath(router.asPath)) || 0;

  const onSwipedLeft = useCallback(() => {
    let targetIndex = activeTabIndex + 1;
    let targetTab = tabs[targetIndex];

    if (!targetTab) {
      targetIndex = 0;
      targetTab = tabs[targetIndex] || EventsTabs.All;
    }

    router.push(getUrl(ROUTES.events.index, targetTab));
  }, [activeTabIndex, router, tabs]);

  const onSwipedRight = useCallback(() => {
    let targetIndex = activeTabIndex - 1;
    let targetTab = tabs[targetIndex];

    if (!targetTab) {
      targetIndex = tabs.length - 1;
      targetTab = tabs[targetIndex] || EventsTabs.All;
    }

    router.push(getUrl(ROUTES.events.index, targetTab));
  }, [activeTabIndex, router, tabs]);

  return useSwipeable({
    onSwipedLeft,
    onSwipedRight,
  });
};
