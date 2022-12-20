import React, { useMemo } from 'react';
import styled from 'styled-components';
import ethereumImage from '@assets/icon/ethereum.svg';
import polygonImage from '@assets/icon/polygon.svg';
import useMint from '@hooks/useMint';

const MyBalance = () => {
  const { network, balance } = useMint();

  const { iconSrc, symbol } = useMemo(() => {
    //TODO : private network 구분
    if (network === 'main' || network === 'goerli')
      return { iconSrc: ethereumImage, symbol: 'ETHER' };
    return { iconSrc: polygonImage, symbol: 'MATIC' };
  }, [network]);

  return (
    <MyBalanceWrapper>
      <p>My Balance : </p>
      <ImageWrapper src={iconSrc} />
      <p>{`${balance} ${symbol}`}</p>
    </MyBalanceWrapper>
  );
};

const MyBalanceWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 24px;
`;

const ImageWrapper = styled('img')`
  width: 28px;
  height: 28px;
  border-radius: 15px;
  object-fit: contain;
  margin: 0 10px;
`;

export default MyBalance;
