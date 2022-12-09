import React, { useState, useEffect } from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import metamaskImageUrl from '@assets/icon/MetaMask.png';
import Web3 from 'web3';
import axios from 'axios';
import { GOERLI_TTOT } from '@contracts/ContractAddress';
import { TTOT_ABI } from '@contracts/ABI';
import MyTickets from './account/MyTickets';

const AddressWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: ${colors.textWhite};
  margin-top: 20px;
`;

const ImageWrapper = styled('img')`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  object-fit: contain;
`;

const TabNavigation = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 50px 0;
`;

const TabButton = styled('button')`
  width: 15.6%;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;
  margin: 3px;
  border: 3px solid;
  color: ${({ isActive }) => (isActive ? colors.primary80 : null)};
  background-color: ${({ isActive }) => (isActive ? colors.primary40 : null)};
`;

const TicketContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ethereum = window.ethereum;

const AccountPage = () => {

  // 지금 로그인한 지갑 정보 저장 state
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // tap 키 저장 state
  const [tab, setTab] = useState('ALL');

  // 내 sbt 저장
  const [sbtList, setSbtList] = useState([]);

  // 컨트랙트와 통신을 위한 객체 저장
  const [web3, setWeb3] = useState({});

  // account와 walletType 불러오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

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

  // 내 토큰들 불러오기
  useEffect(() => {
    async function saveMyToken() {
      let tokenContract;
      if (walletType === 'eth') {
        tokenContract = await new web3.eth.Contract(TTOT_ABI, GOERLI_TTOT);
      } else return;

      const MyTokens = await tokenContract.methods.getSbtTokens(account).call();
      const items = await Promise.all(
        MyTokens.map(async (i) => {
          let metadata = await axios.get(i.sbtTokenURI);
          let price;
          if (walletType === 'eth') {
            price = web3.utils.fromWei(i.price.toString(), 'ether');
          } else return;
          let item = {
            tokenId: Number(i.nftTokenId),
            tokenURI: i.nftTokenURI,
            tokenDL: i.deadline,
            tokenIsActive: i.isActive,
            tokenPrice: price,
            tokenImage: metadata.data.image,
            tokenTitle: metadata.data.title,
            tokenUserEmail: metadata.data.userEmail,
          };
          return item;
        }),
      );
      setSbtList(items);
    }
    saveMyToken();
  }, [account]);

  return (
    <Layout>
      <AddressWrapper>
        {walletType === 'eth' ? (
          <ImageWrapper src={metamaskImageUrl} />
        ) : null}
        {account}
      </AddressWrapper>
      <TabNavigation>
        <TabButton
          isActive={tab === 'ALL'}
          value="ALL"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          ALL
        </TabButton>
        <TabButton
          isActive={tab === 'ACTIVE'}
          value="ACTIVE"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          ACTIVE
        </TabButton>
        <TabButton
          isActive={tab === 'INACTIVE'}
          value="INACTIVE"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          INACTIVE
        </TabButton>
      </TabNavigation>
      <TicketContainer>
        {tab === 'ALL' ? (
          <MyTickets tickets={sbtList} type="all"/>
        ) : tab === 'ACTIVE' ? (
          <MyTickets tickets={sbtList} type="active"/>
        ) : tab === 'INACTIVE' ? (
          <MyTickets tickets={sbtList} type="inactive"/>
        ) : null}
      </TicketContainer>
    </Layout>
  );
};

export default AccountPage;
