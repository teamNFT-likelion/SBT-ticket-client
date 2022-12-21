import React from 'react';
import { SubTitle } from '@styles/ApaymentStyles';
import styled from 'styled-components';
import { kakaoOauthUrl, naverOauthUrl } from '@constants/urlConst';
import kakaoIcon from '@assets/icon/kakaoIcon.png';
import naverIcon from '@assets/icon/naverIcon.png';
import { Row } from '@atoms/wrapper.style';
import useOauth from '@hooks/useOauth';

const OrdererInfo = ({ address, setPopup }) => {
  const { email: userEmail } = useOauth();

  const onClickOauth = (_url) => {
    const width = '650';
    const height = '700';
    const left = Math.ceil((window.screen.width - width) / 2);
    const top = Math.ceil((window.screen.height - height) / 2);
    const oauthPopup = window.open(
      _url,
      'popup-oauth',
      `popup=yes, width=${width}, height=${height}, left=${left}, top=${top}`,
    );
    setPopup(oauthPopup);
  };

  return (
    <OrdererInfoContainer>
      <SubTitle>| 주문자 정보 |</SubTitle>
      <Row alignItems="center" marginBottom="12px">
        <Label htmlFor="address">지갑주소</Label>
        <Input
          id="address"
          type="text"
          defaultValue={address}
          placeholder="지갑주소를 불러오세요"
          autoComplete="off"
        />
      </Row>
      <Row alignItems="center">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="text"
          defaultValue={userEmail}
          autoComplete="off"
          placeholder="이메일 정보를 불러오세요"
        />
        <IconWrapper
          src={kakaoIcon}
          onClick={() => onClickOauth(kakaoOauthUrl)}
        />
        <IconWrapper
          src={naverIcon}
          onClick={() => onClickOauth(naverOauthUrl)}
        />
      </Row>
    </OrdererInfoContainer>
  );
};

// TODO: 900은 상수화해도 괜찮을듯
const OrdererInfoContainer = styled('div')`
  width: 900px;
  margin-bottom: 80px;
`;

const IconWrapper = styled('img')`
  cursor: pointer;
  object-fit: contain;
  width: auto;
  height: 40px;
  margin-right: 8px;
`;

const Label = styled('label')`
  min-width: 100px;
  font-size: 20px;
`;
const Input = styled('input')`
  height: 40px;
  width: 400px;
  border-radius: 5px;
  border: none;
  outline: none;
  padding-left: 12px;
  margin-right: 20px;
`;

export default OrdererInfo;
