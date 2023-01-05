import { networks } from '@constants/NetworkInfo';
import { userAccount, userNetworkId, userWalletType } from '@states/userState';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { formatAddress } from '@utils/parser';

const ethereum = window.ethereum;

export default function CheckWallet() {
  const [account, setAccount] = useRecoilState(userAccount);
  const setWalletType = useSetRecoilState(userWalletType);
  const [networkId, setNetworkId] = useRecoilState(userNetworkId);
  const mumbaiNetwork = networks['mumbai'].chainId;

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
        setNetworkId('');
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
        // setTimeout(() => window.location.reload(), 1500);
      }
    };

    ethereum?.on('accountsChanged', handleAccountsChanged);
    return () => {
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [account, setAccount, setWalletType]);


  // Metamask 체인 변경
  useEffect(() => {
    if (!ethereum) {
      toast.error('metamask 설치 필요', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    async function getChainId() {
      await ethereum.request({ method: 'eth_chainId' }).then((res) => setNetworkId(res));
    }

    const handleSwitchChain = async () => {
      try {
        if (account) {
          await window.ethereum.enable();
        }
        // switch 네트워크
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: mumbaiNetwork }],
        });
      } catch (switchError) {
        // 네트워크가 존재하지 않으면 새로 추가
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networks['mumbai']],
            });
          } catch (addError) {
            // handle "add" error
            console.error('Add new network FAILED', addError);
          }
        }
        // handle other "switch" errors
        console.error('Switch network FAILED', switchError);
      }
    };

    const handleNetworkChanged = (chainId) => {
      if (chainId !== mumbaiNetwork) {
        setAccount('');
        setWalletType('');
        setNetworkId('');
        localStorage.removeItem('_user');
        localStorage.removeItem('_wallet');
        toast.warn(`네트워크가 바뀌었습니다. 다시 로그인 해주세요.`, {
          autoClose: 1500,
        });
      } else {
        setNetworkId(chainId);
        toast.success(`Mumbai, polygon 테스트 네트워크로 변경되었습니다.`, {
          autoClose: 1500,
        });
      }
    };

    getChainId();

    if (networkId !== mumbaiNetwork) {
      handleSwitchChain();
    }

    ethereum?.on('chainChanged', handleNetworkChanged);
    return () => {
      ethereum?.removeListener('chainChanged', handleNetworkChanged);
    };
    // eslint-disable-next-line
  }, [setAccount, setWalletType]);

  return;
}
