import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@articles/Layout';
import PosterItems from './ticketList/PosterItems';
import BigPoster from './ticketList/BigPoster';

const PageTypeWrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 28px;

  & span:last-child {
    border-right: none;
  }
`;

const PageTypeText = styled('span')`
  border-right: 2px solid white;
  width: 130px;
  text-align: center;
  color: ${({ isActive }) => (isActive ? colors.primary80 : colors.textWhite)};
`;

const TListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramType = searchParams.get('type');
  const [type, setType] = useState(0);

  React.useEffect(() => {
    //TODO: 페이지타입별로 데이터 바꿔 줘야됨 setData 바꿔줘야댐
    if (paramType === null) setType(0);
    if (paramType === 'exhibit') setType(1);
    if (paramType === 'sports') setType(2);
  }, [paramType]);

  return (
    <Layout page="list-page">
      {/* //TODO: 컴포넌트로 뺄까 */}
      <PageTypeWrapper>
        <PageTypeText isActive={type === 0} onClick={() => navigate('/list')}>
          공연
        </PageTypeText>
        <PageTypeText
          isActive={type === 1}
          onClick={() => navigate('/list?type=exhibit')}
        >
          전시
        </PageTypeText>
        <PageTypeText
          isActive={type === 2}
          onClick={() => navigate('/list?type=sports')}
        >
          스포츠
        </PageTypeText>
      </PageTypeWrapper>
      <BigPoster />
      {/* //TODO: 래퍼 리팩토링 필요 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <PosterItems />
      </div>
    </Layout>
  );
};

export default TListPage;
