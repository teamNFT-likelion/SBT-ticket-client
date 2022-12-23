import { GOERLI_TTOT } from '@contracts/ContractAddress';
import { TTOT_ABI } from '@contracts/ABI';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import useWeb3 from '@hooks/useWeb3';
import { useState } from 'react';
import axios from 'axios';

export default function useGetUri() {
  const { web3 } = useWeb3(); // 컨트랙트와 통신을 위한 객체 저장
  const { walletType } = useRecoilValue(userState);
  const [tokenEmail, setTokenEmail] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  // sbtURI 가져오기
  async function getTokenUri() {
    let tokenContract;
    try {
      if (walletType === 'eth') {
        tokenContract = await new web3.eth.Contract(TTOT_ABI, GOERLI_TTOT);
      } else return;

      const uri = await tokenContract.methods
        .tokenURI(17) //id값 넣어줘야됨
        .call();

      const email = await axios
        .get(uri)
        .then((res) => setTokenEmail(res.data.email));

      return email;
    } catch (err) {
      console.log('sbt uri 불러오기 실패 : ', err);
    }
  }
  return { getTokenUri, tokenEmail };
}
