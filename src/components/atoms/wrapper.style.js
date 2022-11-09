import styled from 'styled-components';
import { lg, sm } from '@styles/GlobalStyle';

export const TempWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 48.16px;

  ${lg`
    font-size: 38px;
  `}

  ${sm`
    font-size: 25px;
  `}
`;

export const Column = styled('div').attrs((props) => ({
  marginBottom: props.marginBottom || '0',
  marginTop: props.marginTop || '0',
  justifyContent: props.justifyContent || 'flex-start',
  alignItems: props.alignItems || 'flex-start',
  gap: props.gap || '0',
}))`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  gap: ${(props) => props.gap};
`;

export const Row = styled('div').attrs((props) => ({
  marginBottom: props.marginBottom || '0',
  marginTop: props.marginTop || '0',
  justifyContent: props.justifyContent || 'flex-start',
  alignItems: props.alignItems || 'flex-start',
  gap: props.gap || '0',
}))`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
  gap: ${(props) => props.gap};
`;
