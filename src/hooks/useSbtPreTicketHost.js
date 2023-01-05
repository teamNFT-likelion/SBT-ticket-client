import { MUMBAI_TTOTMAIN_ADDR } from '@contracts/ContractAddress';
import { TTOT_MAIN_ABI } from '@contracts/ABI';
import useWeb3 from '@hooks/useWeb3';
import { useState, useEffect } from 'react';

export default function useSbtPreTicketHost() {
  // 지금 로그인한 지갑 정보 저장 state
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // 컨트랙트와 통신을 위한 객체 저장
  const { web3 } = useWeb3();

  // 내 sbt 저장
  const [sbtHostList, setSbtHostList] = useState([]);

  // account와 walletType 불러오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

  // 내 토큰들 불러오기
  useEffect(() => {
    if (localStorage.getItem('_user')) {
      async function saveMyToken() {
        let tokenContract;
        if (walletType === 'eth') {
          tokenContract = await new web3.eth.Contract(TTOT_MAIN_ABI, MUMBAI_TTOTMAIN_ADDR, {
            from: account,
          });
          tokenContract.options.address = MUMBAI_TTOTMAIN_ADDR;
        } else return;

        const MyTokens = await tokenContract.methods.getSbtTokens().call();
        const items = await Promise.all(
          MyTokens.map(async (i) => {
            let item = {
              tokenHostAddr: i.hostAddress,
            };
            return item;
          }),
        );
        setSbtHostList(items);
      }
      saveMyToken();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, walletType]); //TODO: 린트 체크필요

  return sbtHostList;
}
