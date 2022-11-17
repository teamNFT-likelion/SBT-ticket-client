import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const klaytn = window.klaytn;
const ethereum = window.ethereum;

export default function CheckWallet() {
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // 유저 정보와 지갑 정보 받아오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

  // Kaikas 권한 확인 -> 잠금 동작 인식 불가
  useEffect(() => {
    if (!klaytn) {
      return;
    }

    async function checkPermission() {
      const results = await Promise.all([
        klaytn._kaikas.isApproved(),
        klaytn._kaikas.isEnabled(),
        klaytn._kaikas.isUnlocked(),
      ]);
      return results.every((res) => res);
    }

    checkPermission()
      .then((a) => {
        return;
      })
      .catch((b) => {
        setAccount('');
        setWalletType('');
        localStorage.removeItem('_user');
        localStorage.removeItem('_wallet');
        toast.warn('계정이 잠겼습니다.');
        window.location.reload();
      });
  }, [account]);

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
        return;
      })
      .catch((b) => {
        setAccount('');
        setWalletType('');
        localStorage.removeItem('_user');
        localStorage.removeItem('_wallet');
        toast.warn('계정이 잠겼습니다.');
        window.location.reload();
      });
  }, [account]);

  // Kaikas 계정 변경
  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const handleChangeAccounts = () => {
      if (!account) {
        return;
      }
      const changedAccount = klaytn?.selectedAddress;
      if (account !== changedAccount) {
        toast.success(`${changedAccount.slice(0, 5)}.. 계정이 바뀌었습니다.`);
        setAccount(changedAccount);
        localStorage.setItem('_user', changedAccount);
        window.location.reload();
      }
    };

    klaytn?.on('accountsChanged', handleChangeAccounts);
    return () => {
      klaytn.removeListener('accountsChanged', handleChangeAccounts);
    };
  }, [account]);

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

  // Kaikas 체인 변경
  useEffect(() => {
    if (!klaytn) {
      return;
    }

    const networkObj = {
      1001: '바오밥 테스트넷',
      8217: '클레이튼 메인넷',
    };

    const handleNetworkChanged = () => {
      setAccount('');
      setWalletType('');
      localStorage.removeItem('_user');
      localStorage.removeItem('_wallet');
      toast.warn(
        `네트워크가 ${
          networkObj[klaytn.networkVersion]
        }으로 바뀌었습니다. 다시 로그인 해주세요.`,
      );
      window.location.reload();
    };

    klaytn?.on('networkChanged', handleNetworkChanged);
    return () => {
      klaytn?.removeListener('networkChanged', handleNetworkChanged);
    };
  }, []);

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
