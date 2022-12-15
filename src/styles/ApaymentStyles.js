import * as colors from '@styles/colors';
import styled from 'styled-components';
import { Column } from '@components/atoms/wrapper.style';

export const Container = styled(Column)`
  display: flex;
  align-items: center;
  width: 100%;
  flex: 1;
`;

export const PageTitle = styled('div')`
  font-size: 28px;
  margin-bottom: 30px;
  color: white;
`;
export const SubTitle = styled(PageTitle)`
  font-size: 30px;
  margin-bottom: 0px;
  color: ${colors.primary80};
`;

export const TabButton = styled('button')`
  background-color: ${(props) =>
    props.disabled ? colors.bgSecondary : colors.primary40};
  color: ${(props) =>
    props.disabled ? colors.textSecondary : colors.textWhite};
  width: 100px;
  height: 64px;
  font-size: 20px;
  cursor: ${(props) => (props.disabled ? null : 'pointer')};
  border-radius: 5px;
  margin: 3px;
`;

export const SmTabButton = styled(TabButton)`
  height: 36px;
  background-color: ${({ isActive }) =>
    isActive ? 'orange' : colors.primary40};
`;

export const TempBox = styled(Column)`
  height: 500px;
  width: 700px;
  border: white 4px solid;
`;
