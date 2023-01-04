import { NFTStorage } from 'nft.storage';
import { MUMBAI_TTOTMAIN_ADDR, NFTStorageAPI } from '@contracts/ContractAddress';
import { TTOT_MAIN_ABI } from '@contracts/ABI';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import useWeb3 from '@hooks/useWeb3';

export default function useMint() {
  const { web3 } = useWeb3(); // 컨트랙트와 통신을 위한 객체 저장
  const { account, walletType } = useRecoilValue(userState);

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
  async function createSBT(_tokenUri, _ticketInfo, _payType) {
    const { tDeadline, tPerformId, tTokenPrice, tSeat } = _ticketInfo;

    if (walletType === 'eth') {
      const tokenContract = await new web3.eth.Contract(TTOT_MAIN_ABI, MUMBAI_TTOTMAIN_ADDR, {
        from: account,
      });
      tokenContract.options.address = MUMBAI_TTOTMAIN_ADDR;

      // 컨트랙트에 들어갈 값들 변환
      const tokenDeadline = tDeadline / 1000;
      let tokenValue;
      if (_payType === 'COIN') {
        // coin으로 결제시
        tokenValue = String(tTokenPrice * 10 ** 18);
      } else if (_payType === 'COIN') {
        // cash로 결제시
        tokenValue = String(0);
      }
      console.log(_tokenUri, tokenDeadline, tTokenPrice, tPerformId, tSeat, tokenValue);

      await tokenContract.methods
        .mintSbt(_tokenUri, tokenDeadline, tPerformId, tokenValue, tSeat)
        .send({ from: account, value: tokenValue });
    }
  }

  // 환불
  async function refundSBT(_tokenId) {
    if (walletType === 'eth') {
      const tokenContract = await new web3.eth.Contract(TTOT_MAIN_ABI, MUMBAI_TTOTMAIN_ADDR, {
        from: account,
      });
      tokenContract.options.address = MUMBAI_TTOTMAIN_ADDR;
      
      await tokenContract.methods.refundSbtToken(_tokenId).send({ from: account });
    }
  }

  // 소각
  async function burnSBT(_tokenId) {
    if (walletType == 'eth') {
      const tokenContract = await new web3.eth.Contract(TTOT_MAIN_ABI, MUMBAI_TTOTMAIN_ADDR, {
        from: account,
      });
      tokenContract.options.address = MUMBAI_TTOTMAIN_ADDR;

      await tokenContract.methods.burnSbtToken(_tokenId).send({from: account});
    }
  }

  return { createSBT, createTokenUri, refundSBT, burnSBT };
}
