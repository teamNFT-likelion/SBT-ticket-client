import styled from 'styled-components';

export const BigPosterWrapper = styled('div')`
  display: flex;
  gap: 40px;
  width: auto;
  height: 500px;
  justify-content: center;
  margin-bottom: 120px;
  white-space: nowrap;
`;

export const PosterCard = styled('div')`
  display: flex;
  background-color: white;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  overflow: hidden;
  max-width: ${({ isOpen }) => (isOpen ? '1000px' : '0')};
  transition: max-width 530ms ease-in;
  border-radius: 40px;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 500px;
    background-color: #0f0f0f;
    z-index: 2;
  }
`;

export const DescCard = styled('div')`
  width: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  color: black;
  flex: 1;
  overflow: hidden;
  transition: width 500ms ease-in;

  & .card-box {
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    display: flex;
    height: 100%;
    padding: 40px;
    flex-direction: column;
    box-sizing: border-box;
    justify-content: space-between;
    transition: opacity 200ms ease-in;
  }
`;
export const ImgCard = styled('img')`
  display: flex;
  height: 100%;
  height: 500px;
  width: auto;
  border-radius: 40px;
  z-index: 3;
`;

export const InfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const ButtonWrapper = styled('div')`
  display: flex;
  justify-self: self-end;
  justify-content: space-between;
  gap: 40px;

  & > button {
    background-color: black;
    flex: 1;
    height: 50px;
    font-size: 24px;
  }
`;

export const Title = styled('span')`
  align-self: center;
  font-size: 30px;
`;

export const Info = styled('span')`
  font-size: 24px;
  align-self: ${({ alignSelf }) => alignSelf || 'start'};
  opacity: ;
  margin-top: ${({ marginTop }) => marginTop || 0};
`;
