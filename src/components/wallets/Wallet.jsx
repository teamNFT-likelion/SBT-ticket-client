import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { toast } from 'react-toastify';
import kaikasImageUrl from '@assets/icon/Kaikas.png';
import metamaskImageUrl from '@assets/icon/MetaMask.png';
import { BiWalletAlt } from 'react-icons/bi';
import CustomModal from '@articles/CustomModal';
import formatAddress from '@utils/formatAddress';

const AddressContainer = styled('button')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;
  min-width: 150px;
  margin: 0 20px;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.primary80};
  border: 3px solid ${colors.primary40};
  border-radius: 10px;
  cursor: pointer;
  z-index: 10;
`;
const ConnectWalletContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
`;
const WalletButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const StyledButton = styled('div')`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${colors.primary80};
  box-sizing: border-box;
  width: 180px;
  min-height: 50px;
  border-radius: 5px;
  font-size: 1.2rem;
  color: ${colors.primary40};
  border: none;
  outline: none;
  margin: 10px 20px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
`;
const ImageWrapper = styled('img')`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  object-fit: contain;
`;

const klaytn = window.klaytn;
const ethereum = window.ethereum;

export default function Wallet() {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // 유저 정보와 지갑 정보 받아오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

  // 메타마스크 로그인
  async function loginWithMetamask() {
    if (!ethereum) {
      toast.error('metamask 설치 필요', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const accounts = await toast.promise(
        ethereum.request({
          method: 'eth_requestAccounts',
        }),
        {
          pending: 'Metamask 지갑 연동 중',
        },
        { closeButton: true },
      );
      setAccount(accounts[0]);
      setWalletType('eth');
      localStorage.setItem('_user', accounts[0]);
      localStorage.setItem('_wallet', 'eth');
      toast.success(`${formatAddress(accounts[0])}님 환영합니다.`);
    } catch {
      toast.error('로그인 실패. 다시 시도해주세요.');
    }
  }

  // 카이카스 로그인
  async function loginWithKaikas() {
    if (!klaytn) {
      toast.error('Kaikas 설치 필요', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    try {
      const accounts = await toast.promise(
        klaytn.enable(),
        {
          pending: 'Kaikas 지갑 연동 중',
        },
        { closeButton: true },
      );
      setAccount(accounts[0]);
      setWalletType('klaytn');
      localStorage.setItem('_user', accounts[0]);
      localStorage.setItem('_wallet', 'klaytn');
      toast.success(`${formatAddress(accounts[0])}님 환영합니다.`);
    } catch {
      toast.error('로그인 실패. 다시 시도해주세요.');
    }
  }

  // 메타마스크 로그인 핸들러
  function handleMetamaskLogin() {
    loginWithMetamask();
    setShowWalletOptions(false);
    window.location.reload();
  }

  // 카이카스 로그인 핸들러
  function handleKaikasLogin() {
    loginWithKaikas();
    setShowWalletOptions(false);
    window.location.reload();
  }

  // 지갑 로그아웃 핸들러
  function handleDisconnect() {
    toast.warn('로그아웃 되었습니다.');
    setAccount('');
    setWalletType('');
    localStorage.removeItem('_user');
    localStorage.removeItem('_wallet');
    setShowDisconnectWallet(false);
    window.location.reload();
  }

  return (
    <ConnectWalletContainer>
      {!account ? (
        <WalletButton onClick={() => setShowWalletOptions(true)}>
          <BiWalletAlt size="50" color={colors.primary40} />
        </WalletButton>
      ) : walletType === 'eth' ? (
        <AddressContainer onClick={() => setShowDisconnectWallet(true)}>
          <ImageWrapper src={metamaskImageUrl} />
          {formatAddress(account)}
        </AddressContainer>
      ) : (
        <AddressContainer onClick={() => setShowDisconnectWallet(true)}>
          <ImageWrapper src={kaikasImageUrl} />
          {formatAddress(account)}
        </AddressContainer>
      )}

      <CustomModal
        show={showWalletOptions}
        toggleModal={() => setShowWalletOptions(false)}
      >
        <StyledButton onClick={handleMetamaskLogin}>
          <ImageWrapper src={metamaskImageUrl} />
          Metamask
        </StyledButton>
        <StyledButton onClick={handleKaikasLogin}>
          <ImageWrapper src={kaikasImageUrl} />
          Kaikas
        </StyledButton>
      </CustomModal>

      <CustomModal
        show={showDisconnectWallet}
        toggleModal={() => setShowDisconnectWallet(false)}
      >
        {formatAddress(account)}
        <StyledButton onClick={handleDisconnect}>
          <BiWalletAlt size="30" />
          Disconnect
        </StyledButton>
      </CustomModal>
    </ConnectWalletContainer>
  );
}
