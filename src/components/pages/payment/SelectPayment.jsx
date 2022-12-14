import React from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';
import { SubTitle, SmTabButton } from '@styles/ApaymentStyles';
import { Row } from '@atoms/wrapper.style';
import MyBalance from '../../articles/MyBalance';
import { Column } from '../../atoms/wrapper.style';

const SelectPayment = ({ onClickPayType, onClickCashPayType, onClickReCaptcha, payType, cashPayType }) => {

  return (
    <div style={{ width: '900px' }}>
      <SubTitle>| 결제수단 선택 |</SubTitle>
      <Row>
        <SmTabButton value="coin" onClick={onClickPayType} isActive={payType === 'coin'}>
          코인결제
        </SmTabButton>
        <SmTabButton value="cash" onClick={onClickPayType} isActive={payType === 'cash'}>
          일반결제
        </SmTabButton>
      </Row>
      <Column>
        {payType === 'coin' && <MyBalance />}
        {payType === 'cash' && (
          <Row marginTop="24px">
            <SmTabButton
              value="transfer"
              onClick={onClickCashPayType}
              isActive={cashPayType === 'transfer'}
            >
              계좌이체
            </SmTabButton>
            <SmTabButton
              value="easyPay"
              onClick={onClickCashPayType}
              isActive={cashPayType === 'easyPay'}
            >
              간편결제
            </SmTabButton>
          </Row>
        )}
        <ReCAPTCHAWrapper>
          <ReCAPTCHA
            theme="dark"
            sitekey={process.env.REACT_APP_reCAPTCHA_CLIENT_ID}
            onChange={onClickReCaptcha}
          />
        </ReCAPTCHAWrapper>
      </Column>
    </div>
  );
};

const ReCAPTCHAWrapper = styled('div')`
  margin-top: 32px;
`;

export default SelectPayment;
