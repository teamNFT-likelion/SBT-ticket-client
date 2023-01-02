import React, { useRef } from 'react';
import Layout from '@articles/Layout';
import { Column } from '@atoms/wrapper.style';
import Guide from './raffle/Guide';
import Readmore from './raffle/Readmore';
import Raffle from './raffle/Raffle';

const RafflePage = () => {
  const faqRef = useRef(null);

  const handleScrollByRef = () => {
    faqRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout page="list-page">
      <Column gap="72px" marginTop="44px" marginBottom="44px">
        <Raffle handleScrollByRef={handleScrollByRef} />
        <Guide />
        <Readmore ref={faqRef} />
      </Column>
    </Layout>
  );
};

export default RafflePage;
