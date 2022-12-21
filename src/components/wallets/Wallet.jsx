import React, { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { toast } from 'react-toastify';
import metamaskImageUrl from '@assets/icon/MetaMask.png';
import { BiWalletAlt } from 'react-icons/bi';
import CustomModal from '@articles/CustomModal';
import { formatAddress } from '@utils/parser';
import { useRecoilState } from 'recoil';
import { userAccount, userNetworkId, userWalletType } from '@states/userState';
import { networks } from '@constants/NetworkInfo';

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

const ethereum = window.ethereum;

export default function Wallet() {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [showDisconnectWallet, setShowDisconnectWallet] = useState(false);
  const [account, setAccount] = useRecoilState(userAccount);
  const [walletType, setWalletType] = useRecoilState(userWalletType);
  const [networkId, setNetworkId] = useRecoilState(userNetworkId);

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

      if (networkId !== networks['goerli'].chainId) {
        setTimeout(() => window.location.reload(), 1500);
      } else {
        toast.success(`${formatAddress(accounts[0])}님 환영합니다.`, {
          autoClose: 1500,
        });
      }
    } catch {
      toast.error('로그인 실패. 브라우저를 끄고 다시 켜주세요.', {
        autoClose: 1500,
      });
    }
  }

  // 메타마스크 로그인 핸들러
  function handleMetamaskLogin() {
    loginWithMetamask();
    setShowWalletOptions(false);
  }

  // 지갑 로그아웃 핸들러
  function handleDisconnect() {
    toast.warn('로그아웃 되었습니다.', {
      autoClose: 1500,
    });
    setAccount('');
    setWalletType('');
    setNetworkId('');
    localStorage.removeItem('_user');
    localStorage.removeItem('_wallet');
    setShowDisconnectWallet(false);
    setTimeout(() => window.location.reload(), 1500);
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
      ) : null}

      <CustomModal
        show={showWalletOptions}
        toggleModal={() => setShowWalletOptions(false)}
      >
        이더리움과 폴리곤 네트워크에서 사용이 가능합니다. 확인해주세요.
        <StyledButton onClick={handleMetamaskLogin}>
          <ImageWrapper src={metamaskImageUrl} />
          Metamask
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
