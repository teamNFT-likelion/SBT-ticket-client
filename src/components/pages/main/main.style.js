import styled from 'styled-components';
import * as colors from '@styles/colors';

export const Title = styled('span')`
  font-size: 44px;
  line-height: 130%;
  letter-spacing: 0.511785px;
`;

export const TitleBold = styled(Title)`
  font-size: 64px;
  color: ${colors.primary80};
`;

//TODO: 색 변수 처리 필요
export const Desc = styled('span').attrs((props) => ({
  marginTop: props.marginTop || '0',
}))`
  font-size: 26.9768px;
  line-height: 130%;
  letter-spacing: 0.307529px;
  color: #bac0a3;
  margin-top: ${({ marginTop }) => marginTop};
`;
