import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { walletConnectError } from '@components/wallets/toastMessages';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

export const ButtonWrapper = styled('button')`
  background-color: #526600;
  color: white;
  width: 100px;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
`;

const LinkButton = ({ to = '/', name = '홈으로', connectCheck = false }) => {
  const { address } = useRecoilValue(userState);

  function handleClick(e) {
    e.preventDefault();
    walletConnectError();
  }

  if (connectCheck && !address) {
    return <ButtonWrapper onClick={handleClick}>{name}</ButtonWrapper>;
  }
  return (
    <Link to={to}>
      <ButtonWrapper>{name}</ButtonWrapper>
    </Link>
  );
};

export default LinkButton;
