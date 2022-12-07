import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { walletConnectError } from '@components/wallets/WalletConnectError';
import { useRecoilState } from 'recoil';
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
  const [walletAddress] = useRecoilState(userState);

  function handleClick(e) {
    e.preventDefault();
    walletConnectError();
  }

  if (connectCheck && !walletAddress.address) {
    return <ButtonWrapper onClick={handleClick}>{name}</ButtonWrapper>;
  }
  return (
    <Link to={to}>
      <ButtonWrapper>{name}</ButtonWrapper>
    </Link>
  );
};

export default LinkButton;
