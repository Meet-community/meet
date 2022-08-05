import { useMediaQuery } from '@mui/material';
import {
  CreateEvent,
} from '../../../src/components/Events/CreateEvent/CreateEvent';
import { Header } from '../../../src/components/Header/Header';
import {
  PageContainer,
} from '../../../src/components/UI/Container/PageContainer';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matches = useMediaQuery('(min-width:1000px)');

  return (
    <>
      <Header />
      <PageContainer pageTitle={matches ? 'Create event' : ''}>
        <CreateEvent />
      </PageContainer>
    </>
  );
}
