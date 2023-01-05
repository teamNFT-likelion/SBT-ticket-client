import styled from 'styled-components';
import * as colors from '@styles/colors';
import { sm } from '@styles/GlobalStyle';

export const Title = styled('span')`
  font-size: 28px;
  line-height: 130%;
  letter-spacing: 0.511785px;

  ${sm`
    font-size: 25.5px;
  `}
`;

export const TitleBold = styled(Title)`
  font-size: 36px;
  color: ${colors.primary80};

  ${sm`
    font-size: 36px;
  `}
`;

//TODO: 색 변수 처리 필요, 글자 단어별로 줄바꿈 속성 추가해야댐
export const Desc = styled('span').attrs((props) => ({
  marginTop: props.marginTop || '0',
}))`
  font-size: 20px;
  line-height: 130%;
  letter-spacing: 0.307529px;
  color: ${colors.textTertiary};
  margin-top: ${({ marginTop }) => marginTop};

  ${sm`
    font-size: 15px;
  `}
`;
