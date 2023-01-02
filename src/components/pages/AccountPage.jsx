import React, { useState, useEffect } from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import metamaskImageUrl from '@assets/icon/MetaMask.png';
import axios from 'axios';
import { MUMBAI_TTOTMAIN_ADDR } from '@contracts/ContractAddress';
import { TTOT_MAIN_ABI } from '@contracts/ABI';
import MyTickets from './account/MyTickets';
import { useNavigate } from 'react-router-dom';
import { walletConnectError } from '@utils/toastMessages';
import useWeb3 from '@hooks/useWeb3';

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
  width: 100%;
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

const AccountPage = () => {
  const navigate = useNavigate();

  // 지금 로그인한 지갑 정보 저장 state
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  // 컨트랙트와 통신을 위한 객체 저장
  const { web3 } = useWeb3();

  // tap 키 저장 state
  const [tab, setTab] = useState('ALL');

  // 내 sbt 저장
  const [sbtList, setSbtList] = useState([]);

  // account와 walletType 불러오기
  useEffect(() => {
    setAccount(localStorage.getItem('_user'));
    setWalletType(localStorage.getItem('_wallet'));
  }, []);

  // url조작으로 들어오려는 경우 block
  useEffect(() => {
    if (!localStorage.getItem('_user')) {
      walletConnectError();
      navigate(-1);
    }
  }, [account, navigate]);

  // 내 토큰들 불러오기
  useEffect(() => {
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
          let metadata = await axios.get(i.sbtTokenURI);
          let price = web3.utils.fromWei(i.price.toString(), 'ether');
          let item = {
            tokenId: Number(i.sbtTokenId),
            tokenURI: i.sbtTokenURI,
            tokenDL: Number(i.deadline) * 1000,
            tokenPrice: price,
            tokenSeats: i.seats,
            tokenImage: metadata.data.image,
            tokenTitle: metadata.data.name,
            tokenUserEmail: metadata.data.email,
            tokenIsActive: i.isActive,
          };
          return item;
        }),
      );
      setSbtList(items);
    }
    saveMyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, walletType]); //TODO: 린트 체크필요

  console.log(sbtList);

  return (
    <Layout>
      <AddressWrapper>
        {walletType === 'eth' ? <ImageWrapper src={metamaskImageUrl} /> : null}
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
          <MyTickets tickets={sbtList} type="all" />
        ) : tab === 'ACTIVE' ? (
          <MyTickets tickets={sbtList} type="active" />
        ) : tab === 'INACTIVE' ? (
          <MyTickets tickets={sbtList} type="inactive" />
        ) : null}
      </TicketContainer>
    </Layout>
  );
};

export default AccountPage;
