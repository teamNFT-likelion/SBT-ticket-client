import { NFTStorage } from 'nft.storage';
import { GOERLI_TTOT, NFTStorageAPI } from '@contracts/ContractAddress';
import { TTOT_ABI } from '@contracts/ABI';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import { useState, useEffect } from 'react';
import useWeb3 from '@hooks/useWeb3';

export default function useMint() {
  const { web3 } = useWeb3(); // 컨트랙트와 통신을 위한 객체 저장
  const { account, walletType } = useRecoilValue(userState);
  const [network, setNetwork] = useState('');
  const [balance, setBalance] = useState(0); // 내 잔고 확인을 위한 state

  const client = new NFTStorage({ token: NFTStorageAPI }); // NFTStorage 사용을 위해 객체 생성

  // ipfs URI 생성
  async function createTokenUri(_sbtInfo, _email) {
    const { sbtImage, sbtName, sbtDesc } = _sbtInfo;
    const fileCid = await client.storeBlob(new Blob([sbtImage]));
    const obj = {
      name: sbtName,
      description: sbtDesc,
      image: 'https://ipfs.io/ipfs/' + fileCid,
      email: _email,
    };
    const metadataCid = await client.storeBlob(new Blob([JSON.stringify(obj)]));

    return 'https://ipfs.io/ipfs/' + metadataCid;
  }

  // 새로운 SBT 생성
  async function createSBT(_tokenUri, _ticketInfo) {
    const { tDeadline, tPrice, tPerformId, tSeat, tSeatLimit } = _ticketInfo;

    if (walletType === 'eth') {
      const tokenContract = await new web3.eth.Contract(TTOT_ABI, GOERLI_TTOT, {
        from: account,
      });
      tokenContract.options.address = GOERLI_TTOT;
      console.log(tDeadline, tPrice, tPerformId, tSeat, tSeatLimit);
      await tokenContract.methods
        .mintSbt(_tokenUri, tDeadline, 0, tPerformId, tSeat.join(), tSeatLimit) // TODO: tPrice 값있으면 안됨, tsea배열일때 각각? 한번에?
        .send({ from: account });
    }
  }

  // 내 잔고 가져오기
  useEffect(() => {
    async function myBalance() {
      const _network = await web3.eth.net.getNetworkType();
      setNetwork(_network);
      web3.eth.getBalance(account).then((bal) => {
        // 잔액을 일반적인 통화 단위로 변환하고 상태 변수에 저장|
        const convertedBal = web3.utils.fromWei(bal);
        setBalance(convertedBal);
      });
    }
    myBalance();
  }, [account, web3.eth, web3.utils]);

  return { createSBT, createTokenUri, network, balance };
}
