import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { NFTStorage } from 'nft.storage';
import { GOERLI_TTOT, NFTStorageAPI } from '@contracts/ContractAddress';
import { TTOT_ABI } from '@contracts/ABI';

const ethereum = window.ethereum;

export default function useWeb3() {
  const [web3, setWeb3] = useState({}); // 컨트랙트와 통신을 위한 객체 저장
  const [account, setAccount] = useState(''); // 지금 로그인한 계정 정보 저장
  const [walletType, setWalletType] = useState(''); // 지금 로그인한 지갑 정보 저장
  const [network, setNetwork] = useState(''); // 내 잔고 확인을 위한 state
  const [balance, setBalance] = useState(0);

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

  // account와 walletType 불러오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

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

  return { createSBT, createTokenUri, network, balance };
}
