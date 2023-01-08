import styled from 'styled-components';
import * as colors from '@styles/colors';

export const ImgCard = styled('img')`
  height: 500px;
  width: auto;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`;

export const InfoWrapper = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: gray;
  padding: 120px 40px 40px;
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  gap: 28px;
  margin-top: 40px;

  & button {
    font-size: 24px;
    border: 1px solid white;
    padding: 12px 32px;
    border-radius: 24px;
  }
`;

export const Title = styled('div')`
  position: relative;
  font-size: 48px;
  color: white;
  overflow-wrap: break-word;
  word-break: keep-all
  max-width: 600px;
`;

export const Info = styled('div')`
  font-size: 24px;
  align-self: ${({ alignSelf }) => alignSelf || 'start'};
  margin-top: ${({ marginTop }) => marginTop || 0};
`;

export const Tag = styled('span')`
  color: white;
  background-color: ${colors.bgRed};
  display: inline;
  position: absolute;
  top: -44px;
  font-size: 24px;
  padding: 6px 20px;
  border-radius: 15px;
`;
