import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ButtonWrapper = styled('button')`
  background-color: #526600;
  color: white;
  width: 100px;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
`;

const LinkButton = ({ to = '/', name = '홈으로', dataId}) => {
  return (
    <Link to={to} state={{dataId: dataId}} >
      <ButtonWrapper>{name}, {dataId}</ButtonWrapper>
    </Link>
  );
};

export default LinkButton;
