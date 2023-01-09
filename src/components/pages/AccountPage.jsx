import React, { useState, useEffect } from 'react';
import Layout from '@articles/Layout';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { APP_MAX_W } from '@constants/styleConst';
import metamaskImageUrl from '@assets/icon/MetaMask.png';
import MyTickets from './account/MyTickets';
import { useNavigate } from 'react-router-dom';
import { walletConnectError } from '@utils/toastMessages';
import { BiPencil } from 'react-icons/bi';
import useMyTickets from '@hooks/useMyTickets';

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
  margin: 50px 0 0 0;
`;

const TabButton = styled('button')`
  width: 15.6%;
  height: 64px;
  font-size: 20px;
  cursor: pointer;
  margin: 3px;
  color: ${({ isActive }) => (isActive ? colors.primary80 : null)};
  border-bottom: 3px solid ${({ isActive }) => (isActive ? colors.primary40 : colors.textWhite)};

  &:hover {
    color: ${colors.textSecondary};
    border-bottom: 3px solid ${colors.textSecondary};
  }
`;

const TicketContainer = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 30px;
  margin-top: 20px;
  border-radius: 30px;
`;

const BackLabelBox = styled('label')`
  display: flex;
  width: ${APP_MAX_W}px;
  height: 20vh;
  align-items: center;
  justify-content: center;
  color: ${colors.bgSecondary};
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: ${colors.bgSecondary};
  cursor: pointer;
  border-bottom: 3px solid ${colors.textWhite};

  &:hover {
    color: ${colors.textWhite};
    background-color: gray;
  }
`;

const ProfileLabelBox = styled('label')`
  position: absolute;
  top: -100px;
  display: flex;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  color: ${colors.bgSecondary};
  font-size: inherit;
  line-height: normal;
  vertical-align: middle;
  background-color: ${colors.bgSecondary};
  cursor: pointer;
  border-radius: 100px;
  border: 3px solid ${colors.textWhite};

  &:hover {
    color: ${colors.textWhite};
    background-color: gray;
  }
`;

const ImgBox = styled('img')`
  display: flex;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const ProfileImgBox = styled(ImgBox)`
  border-radius: 100px;
`;

const InputBox = styled('input')`
  position: absolute;
  width: 100%;
  height: 20px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
`;

const AccountPage = () => {
  const navigate = useNavigate();

  // 지금 로그인한 지갑 정보 저장 state
  const [account, setAccount] = useState('');
  const [walletType, setWalletType] = useState('');

  const sbtList = useMyTickets();

  // tap 키 저장 state
  const [tab, setTab] = useState('ALL');

  const [backImageFile, setBackImageFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);

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

  return (
    <Layout>
      <div>
        <BackLabelBox for="fileBack">
          {backImageFile ? (
            <ImgBox for="fileBack" src={backImageFile} alt="preview image" />
          ) : (
            <BiPencil size="50px" />
          )}
        </BackLabelBox>
        <InputBox
          type="file"
          name="file"
          onChange={(e) => {
            setBackImageFile(URL.createObjectURL(e.target.files[0]));
          }}
          id="fileBack"
        />
      </div>
      <div
        style={{
          width: '100vw',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          zIndex: '3',
        }}
      >
        <ProfileLabelBox for="fileProfile">
          {profileImageFile ? (
            <ProfileImgBox for="fileProfile" src={profileImageFile} alt="preview image" />
          ) : (
            <BiPencil size="50px" />
          )}
        </ProfileLabelBox>
        <InputBox
          type="file"
          name="file"
          onChange={(e) => {
            setProfileImageFile(URL.createObjectURL(e.target.files[0]));
          }}
          id="fileProfile"
        />
      </div>
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
        <TabButton
          isActive={tab === 'DONE'}
          value="DONE"
          onClick={(newTab) => {
            setTab(newTab.target.value);
          }}
        >
          DONE
        </TabButton>
      </TabNavigation>
      <TicketContainer>
        {tab === 'ALL' ? (
          <MyTickets tickets={sbtList} type="all" />
        ) : tab === 'ACTIVE' ? (
          <MyTickets tickets={sbtList} type="active" />
        ) : tab === 'INACTIVE' ? (
          <MyTickets tickets={sbtList} type="inactive" />
        ) : tab === 'DONE' ? (
          <MyTickets tickets={sbtList} type="done" />
        ) : null}
      </TicketContainer>
    </Layout>
  );
};

export default AccountPage;
