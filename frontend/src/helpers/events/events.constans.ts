import FiberNewIcon from '@mui/icons-material/FiberNew';
import TodayIcon from '@mui/icons-material/Today';
import ArchiveIcon from '@mui/icons-material/Archive';
import { FC } from 'react';
import { EventsTabs } from './events.typedefs';

export const tabsConfig: {
  label: string,
  value: EventsTabs,
  Icon: FC<any>
}[] = [
  {
    label: 'Всі',
    value: EventsTabs.All,
    Icon: FiberNewIcon,
  },
  {
    label: 'Заплановані',
    value: EventsTabs.Planned,
    Icon: TodayIcon,
  },
  {
    label: 'Архівовані',
    value: EventsTabs.Archived,
    Icon: ArchiveIcon,
  },
];
