import { useEffect, useState } from 'react';
import Web3 from 'web3';

const ethereum = window.ethereum;

export default function useWeb3() {
  const [web3, setWeb3] = useState({}); // 컨트랙트와 통신을 위한 객체 저장

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

  return { web3, setWeb3 };
}
