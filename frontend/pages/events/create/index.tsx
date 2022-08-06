import {
  CreateEvent,
} from '../../../src/components/Events/CreateEvent/CreateEvent';
import { Header } from '../../../src/components/Header/Header';
import {
  PageContainer,
} from '../../../src/components/UI/Container/PageContainer';
import {
  CreateEventContextProvider,
} from '../../../src/components/Events/CreateEvent/CreateEventContext/CreateEventContextProvider';

export default function index() {
  return (
    <CreateEventContextProvider>
      <>
        <Header />
        <PageContainer style={{ paddingBottom: 0 }}>
          <CreateEvent />
        </PageContainer>
      </>
    </CreateEventContextProvider>

  );
}
