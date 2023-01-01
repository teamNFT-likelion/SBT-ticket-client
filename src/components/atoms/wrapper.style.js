import styled from 'styled-components';
import { lg, sm } from '@styles/GlobalStyle';

export const TempWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Title = styled('span')`
  font-family: 'Shrikhand', cursive;
  font-size: 3rem;

  ${lg`
    font-size: 2.9rem;
  `}

  ${sm`
    font-size: 2.5rem;
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
  width: 100%;
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
  width: 100%;
`;
