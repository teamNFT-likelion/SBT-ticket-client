import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { walletConnectError } from '@utils/toastMessages';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

export const ButtonWrapper = styled('button')`
  background-color: ${(props) => props.color};
  color: white;
  width: 100px;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
`;

const LinkButton = ({
  to = '/',
  name = '홈으로',
  connectCheck = false,
  prePossible = false,
  color = '#526600',
}) => {
  const { account } = useRecoilValue(userState);

  function handleClick(e) {
    e.preventDefault();
    walletConnectError();
  }

  if (connectCheck && !account) {
    return (
      <ButtonWrapper onClick={handleClick} color={color}>
        {name}
      </ButtonWrapper>
    );
  }
  return (
    <Link to={to} state={prePossible}>
      <ButtonWrapper color={color}>{name}</ButtonWrapper>
    </Link>
  );
};

export default LinkButton;
