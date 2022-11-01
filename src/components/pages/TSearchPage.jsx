import React from 'react';
import Header from '@articles/Header';
import LinkButton from '@atoms/LinkButton';
import { TempWrapper } from '@components/atoms/Wrapper.style';

const TSearchPage = () => {
  return (
    <TempWrapper>
      <div>티켓검색결과페이지~</div>
      <Header />
      <div>
        검색결과 1
        <LinkButton to="/detail" name="예매하기" />
      </div>
      <div>
        검색결과 1
        <LinkButton to="/detail" name="예매하기" />
      </div>
      <div>
        검색결과 2
        <LinkButton to="/detail" name="예매하기" />
      </div>
    </TempWrapper>
  );
};

export default TSearchPage;
