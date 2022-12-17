import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ethereum = window.ethereum;

export default function CheckWallet() {
  const [account, setAccount] = useState('');
  // TODO
  // eslint-disable-next-line no-unused-vars
  const [walletType, setWalletType] = useState('');

  // 유저 정보와 지갑 정보 받아오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

  // Metamask 권한 확인 -> 잠금 동작 인식 불가
  useEffect(() => {
    if (!ethereum) {
      return;
    }

    async function checkPermission() {
      const results = await Promise.all([ethereum._metamask.isUnlocked()]);
      return results.every((res) => res);
    }

    checkPermission()
      .then((a) => {
        if (a === false) {
          setAccount('');
          setWalletType('');
          localStorage.removeItem('_user');
          localStorage.removeItem('_wallet');
          toast.warn('계정이 잠겼습니다.');
        } else {
          return;
        }
      })
      .catch((b) => {
        setAccount('');
        setWalletType('');
        localStorage.removeItem('_user');
        localStorage.removeItem('_wallet');
        toast.warn('계정이 잠겼습니다.');
      });
  }, []);

  // Metamask 계정 변경
  useEffect(() => {
    if (!ethereum) {
      return;
    }

    const changedAccount = async () => {
      const getAccount = await ethereum?.request({
        method: 'eth_accounts',
      });
      return getAccount;
    };

    const handleChangeAccounts = async () => {
      if (!account) {
        return;
      }
      if (account !== changedAccount) {
        toast.success(`${changedAccount.slice(0, 5)}.. 계정이 바뀌었습니다.`);
        setAccount(changedAccount);
        localStorage.setItem('_user', changedAccount);
        window.location.reload();
      }
    };

    ethereum?.on('accountsChanged', handleChangeAccounts);
    return () => {
      ethereum.removeListener('accountsChanged', handleChangeAccounts);
    };
  }, [account]);

  // Metamask 체인 변경
  useEffect(() => {
    if (!ethereum) {
      return;
    }

    const handleNetworkChanged = () => {
      setAccount('');
      setWalletType('');
      localStorage.removeItem('_user');
      localStorage.removeItem('_wallet');
      toast.warn(`네트워크가 바뀌었습니다. 다시 로그인 해주세요.`);
      window.location.reload();
    };

    ethereum?.on('chainChanged', handleNetworkChanged);
    return () => {
      ethereum?.removeListener('chainChanged', handleNetworkChanged);
    };
  }, []);

  return;
}
