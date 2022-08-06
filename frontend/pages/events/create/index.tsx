import {
  CreateEvent,
} from '../../../src/components/Events/CreateEvent/CreateEvent';
import { Header } from '../../../src/components/Header/Header';
import {
  PageContainer,
} from '../../../src/components/UI/Container/PageContainer';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <Header />
      <PageContainer style={{ paddingBottom: 0 }}>
        <CreateEvent />
      </PageContainer>
    </>
  );
}
