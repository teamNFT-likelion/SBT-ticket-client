import { userState } from '@states/userState';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Web3 from 'web3';

const ethereum = window.ethereum;

export default function useWeb3() {
  const [web3, setWeb3] = useState({}); // 컨트랙트와 통신을 위한 객체 저장
  const { account } = useRecoilValue(userState);

  const [chainId, setChainId] = useState('');
  const [balance, setBalance] = useState(0); // 내 잔고 확인을 위한 state

  // 시작 시 메타마스크와 연결이 되어있는 지 확인하고 객체를 생성.
  useEffect(() => {
    if (typeof ethereum !== 'undefined') {
      try {
        const web3 = new Web3(ethereum);
        setWeb3(web3);
      } catch (err) {
        console.log(err);
      }
    } else return;
  }, []);

  // 내 잔고 가져오기
  useEffect(() => {
    async function myBalance() {
      const _chainId = await web3.eth?.getChainId();
      setChainId(_chainId);
      web3.eth?.getBalance(account).then((bal) => {
        // 잔액을 일반적인 통화 단위로 변환하고 상태 변수에 저장|
        const convertedBal = web3.utils.fromWei(bal);
        setBalance(convertedBal);
      });
    }
    myBalance();
  }, [account, web3.eth, web3.utils]);

  return { web3, setWeb3, chainId, balance };
}
