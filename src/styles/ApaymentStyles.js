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
  font-size: 28px;
  margin-bottom: 16px;
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

export const CompletedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 34px;
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 3;
`;
