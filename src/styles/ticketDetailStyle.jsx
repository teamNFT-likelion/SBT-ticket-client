import 'react-calendar/dist/Calendar.css';
import { Column, Row } from '@components/atoms/wrapper.style';
import styled from 'styled-components';
import * as colors from '@styles/colors';


export const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  font-size: 32px;
  flex: 7;
  gap: 4px;
`;
export const ContentsInfoBody = styled(Row)`
  // HEADER 높이 5rem + 여분 9rem
  color: white;
  display: flex;
  justify-content: center;
  margin: 5rem;
`;

export const SelectInfo = styled('div')`
  display: flex;
  background-color: #d9d9d915;
  border: 0.75px #eaecd9 solid;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  width: 800px;
  font-size: 17px;
`;

export const PartButtonContainer = styled(Row)`
  margin: 24px 5px 50px 5px;
`;
export const SelectInfoBox = styled(Column)`
  display: flex;
  width: 300px;
  height: 300px;
  margin: 0px 15px;
  padding: 20px 0px;
`;

export const CalendarStyle = styled.div`
  width: 250px;
  margin: 0px 15px;

  .react-calendar {
    background-color: #00000000;
    border: none;
  }

  .react-calendar__navigation {
    display: flex;
    height: 30px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
  }
  .react-calendar__navigation button:disabled {
    background-color: #00000000;
    border-radius: 10px;
    align-items: center;
    color: ${colors.primary80};
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #5151517e;
    align-items: center;
  }

  .react-calendar__tile {
    max-width: 100%;
    width: 30px;
    height: 30px;
    padding: 0px;
    background: none;
    text-align: center;
    line-height: 16px;
    border-radius: 50%;
  }

  .react-calendar__tile:disabled {
    background-color: #f0f0f0;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${colors.primary40};
  }
`;