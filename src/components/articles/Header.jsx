import React from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import logo_ttot from '@assets/img/logo_ttot.png';
import { BiUser } from 'react-icons/bi';
import { APP_HEADER_H } from '@constants/styleConst';
import { Link } from 'react-router-dom';
import Wallet from '@components/wallets/Wallet';
import SearchBar from './SearchBar';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import { walletConnectError } from '@utils/toastMessages';

const Container = styled('div')`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${APP_HEADER_H};
  padding: 0 2.75rem;
  background-color: ${colors.bgBlack};
  z-index: 999;
`;

const LogoImage = styled('img')`
  width: 130px;
  margin-right: 24px;
`;

const SearchBarWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  gap: 15px;
`;

const Header = ({ page }) => {
  const { account } = useRecoilValue(userState);

  let accountBtn;

  function handleClick(e) {
    e.preventDefault();
    walletConnectError();
  }
  if (account) {
    accountBtn = (
      <Link to={'/account'}>
        <BiUser size="50" color={colors.primary40} />
      </Link>
    );
  } else {
    accountBtn = (
      <Link to={'/list'} onClick={handleClick}>
        <BiUser size="50" color={colors.primary40} />
      </Link>
    );
  }

  return (
    <Container>
      <Link to={'/list'}>
        <LogoImage src={logo_ttot} />
      </Link>
      <SearchBarWrapper>
        <SearchBar />
      </SearchBarWrapper>
      <ButtonsWrapper>
        <Wallet />
        {accountBtn}
      </ButtonsWrapper>
    </Container>
  );
};

export default Header;
