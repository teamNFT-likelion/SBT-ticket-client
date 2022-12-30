import React, { useMemo } from 'react';
import styled from 'styled-components';
import ethereumImage from '@assets/icon/ethereum.svg';
import polygonImage from '@assets/icon/polygon.svg';
import useWeb3 from '@hooks/useWeb3';

const MyBalance = () => {
  const { chainId, balance } = useWeb3();

  const { iconSrc, symbol } = useMemo(() => {
    if (chainId === 137 || chainId === 80001) {
      return { iconSrc: polygonImage, symbol: 'MATIC' };
    } else if (chainId === 1 || chainId === 5) {
      return { iconSrc: ethereumImage, symbol: 'ETHER' };
    }
  }, [chainId]);

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
