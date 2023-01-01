import React, { useRef } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import Layout from '@articles/Layout';
import { Row, Column } from '@atoms/wrapper.style';
import Guide from './raffle/Guide';
import Readmore from './raffle/Readmore';
import Raffle from './raffle/Raffle';
import Anchor from '@atoms/Anchor';

const RafflePage = () => {
  const faqRef = useRef(null);

  const handleScrollByRef = () => {
    faqRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Layout page="list-page">
      <Column gap="72px" marginTop="44px" marginBottom="44px">
        <Column>
          <BlockTitle>Raffle</BlockTitle>
          <Raffle handleScrollByRef={handleScrollByRef} />
        </Column>
        <div>
          <BlockTitle>Guide</BlockTitle>
          <Guide />
        </div>
        <div style={{ position: 'relative' }}>
          <Anchor ref={faqRef} />
          <BlockTitle>ReadMore</BlockTitle>
          <Readmore />
        </div>
      </Column>
    </Layout>
  );
};

const BlockTitle = styled('div')`
  margin-bottom: 24px;
  font-size: 40px;
  color: ${colors.primary80};
  color: orange;
`;

export default RafflePage;
