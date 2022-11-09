import React from 'react';
import Header from '@articles/Header';
import LinkButton from '@atoms/LinkButton';
import { TempWrapper } from '../atoms/wrapper.style';

const TListPage = () => {
  return (
    <TempWrapper>
      <div>티켓리스트페이지~</div>
      <Header />
      <div
        style={{
          flex: 1,
          display: 'flex',
          border: '2px solid white',
          flexDirection: 'column',
        }}
      >
        <div
          style={{ width: '100%', height: '100px', backgroundColor: 'yellow' }}
        >
          카테고리 분류 영역
        </div>
        <div>
          리스트 1
          <LinkButton to="/detail" name="예매1" />
        </div>
        <div>
          리스트 2
          <LinkButton to="/detail" name="예매2" />
        </div>
        <div>
          리스트 3
          <LinkButton to="/detail" name="예매3" />
        </div>
      </div>
    </TempWrapper>
  );
};

export default TListPage;
