import React, { useState, useEffect } from 'react';
import * as colors from '@styles/colors';
import styled from 'styled-components';
import { useNavigate, useSearchParams } from 'react-router-dom';

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

const CategoryNav = () => {
  // for 카테고리 버튼
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramType = searchParams.get('type');
  const [type, setType] = useState('concert');

  useEffect(() => {
    //TODO: 페이지타입별로 데이터 바꿔 줘야됨 setData 바꿔줘야댐
    if (paramType === null) {
      setType('concert');
    } else if (paramType === 'exhibit' || paramType === 'sports') {
      setType(paramType);
    } else {
      navigate('/list');
    }
  }, [paramType, navigate]);

  return (
    <PageTypeWrapper>
      <PageTypeText
        isActive={type === 'concert'}
        onClick={() => navigate('/list')}
      >
        공연
      </PageTypeText>
      <PageTypeText
        isActive={type === 'exhibit'}
        onClick={() => navigate('/list?type=exhibit')}
      >
        전시
      </PageTypeText>
      <PageTypeText
        isActive={type === 'sports'}
        onClick={() => navigate('/list?type=sports')}
      >
        스포츠
      </PageTypeText>
    </PageTypeWrapper>
  );
}

export default CategoryNav;
