import { Event } from '../../src/components/Event/Event';
import { Header } from '../../src/components/Header/Header';
import { PageContainer } from '../../src/components/UI/Container/PageContainer';

export default function EventPage() {
  return (
    <>
      <Header />

      <PageContainer>
        <Event />
      </PageContainer>
    </>
  );
}
