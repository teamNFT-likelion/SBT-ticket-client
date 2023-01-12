import { userAccount, userWalletType } from '@states/userState';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { formatAddress } from '@utils/parser';
import { useNavigate } from 'react-router-dom';

const ethereum = window.ethereum;

export default function CheckWallet() {
  const [account, setAccount] = useRecoilState(userAccount);
  const setWalletType = useSetRecoilState(userWalletType);
  const navigate = useNavigate();

  // Metamask 잠금 동작 인식 + 계정 변경 인식
  useEffect(() => {
    if (!ethereum) {
      toast.error('metamask 설치 필요', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    ethereum
      .request({ method: 'eth_accounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        console.error(err);
      });

    function handleAccountsChanged(accounts) {
      if (!account) {
        return;
      }
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
        setAccount('');
        setWalletType('');
        localStorage.removeItem('_user');
        localStorage.removeItem('_wallet');
        toast.warn(`계정이 잠겼습니다. 다시 로그인 해주세요.`, {
          autoClose: 1500,
        });
        // setTimeout(() => window.location.reload(), 1500);
      } else if (accounts[0] !== account) {
        console.log(accounts[0]);
        toast.success(`${formatAddress(accounts[0])}으로 계정이 바뀌었습니다.`, {
          autoClose: 1500,
        });
        setAccount(accounts[0]);
        localStorage.setItem('_user', accounts[0]);
        setTimeout(() => {
          navigate('/list');
          window.location.reload();
        }, 1000);
      }
    }

    ethereum?.on('accountsChanged', handleAccountsChanged);
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [account, setAccount, setWalletType, navigate]);

  return;
}
