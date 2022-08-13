import { EventsTabs } from '../../../src/helpers/events/events.typedefs';
import { Events } from '../../../src/components/Events/Events';
import { Header } from '../../../src/components/Header/Header';

export default function EventPage() {
  return (
    <>
      <Header />

      <Events activeTab={EventsTabs.Archived} />
    </>
  );
}
