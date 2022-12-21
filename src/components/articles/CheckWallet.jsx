import { networks } from '@constants/NetworkInfo';
import { userAccount, userNetworkId, userWalletType } from '@states/userState';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';

const ethereum = window.ethereum;

export default function CheckWallet() {
  const [account, setAccount] = useRecoilState(userAccount);
  const setWalletType = useSetRecoilState(userWalletType);
  const [networkId, setNetworkId] = useRecoilState(userNetworkId);
  const goerliNetwork = networks['goerli'].chainId;

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
  }, [setAccount, setWalletType]);

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
        toast.success(`${changedAccount.slice(0, 5)}.. 계정이 바뀌었습니다.`, {
          autoClose: 1500,
        });
        setAccount(changedAccount);
        localStorage.setItem('_user', changedAccount);
        setTimeout(() => window.location.reload(), 1500);
      }
    };

    ethereum?.on('accountsChanged', handleChangeAccounts);
    return () => {
      ethereum.removeListener('accountsChanged', handleChangeAccounts);
    };
  }, [account, setAccount]);

  // Metamask 체인 변경
  useEffect(() => {
    if (!ethereum) {
      return;
    }

    async function getChainId() {
      await ethereum
        .request({ method: 'eth_chainId' })
        .then((res) => setNetworkId(res));
    }

    getChainId();

    if (networkId !== goerliNetwork) {
      handleSwitchChain();
    }

    const handleNetworkChanged = (chainId) => {
      if (chainId !== goerliNetwork) {
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
        toast.success(`Goerli 네트워크로 변경되었습니다.`, {
          autoClose: 1500,
        });
      }
    };

    ethereum?.on('chainChanged', handleNetworkChanged);
    return () => {
      ethereum?.removeListener('chainChanged', handleNetworkChanged);
    };
    // eslint-disable-next-line
  }, [setAccount, setWalletType]);

  const handleSwitchChain = async () => {
    try {
      if (account) {
        await window.ethereum.enable();
      }
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: goerliNetwork }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${Number(5).toString(16)}`,
                chainName: 'Polygon Testnet Mumbai',
                nativeCurrency: {
                  name: 'GoerliETH',
                  symbol: 'GoerliETH',
                  decimals: 18,
                },
                rpcUrls: ['https://goerli.infura.io/v3/'],
                blockExplorerUrls: ['https://goerli.etherscan.io'],
              },
            ],
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
  return;
}
