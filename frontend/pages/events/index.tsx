import { Events } from '../../src/components/Events/Events';
import { Header } from '../../src/components/Header/Header';
import { EventsTabs } from '../../src/helpers/events/events.typedefs';

export default function EventPage() {
  return (
    <>
      <Header />

      <Events activeTab={EventsTabs.All} />
    </>
  );
}
