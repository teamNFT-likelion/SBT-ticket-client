import React,{useState} from 'react';
import * as colors from '@styles/colors';
import styled from 'styled-components';
import LinkButton from '@atoms/LinkButton';
import { Column, Row } from '@components/atoms/wrapper.style';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import PosterItems from './ticketList/PosterItems';
import { mainItems } from 'src/mock/items';
import { useLocation} from 'react-router-dom';
import { TabButton } from '@components/atoms/AAP_styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import verticalLine from '@assets/img/verticalLine.png';
import {parse} from 'query-string';


const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  font-size: 32px;
  flex: 7;
  gap: 4px;
`;
const ContentsInfoBody = styled(Row)`
  // HEADER 높이 5rem + 여분 9rem
  color: white;
  display: flex;
  justify-content: center;
  margin: 5rem;
`;

const SelectInfo = styled('div')`
  display: flex;
  background-color: #d9d9d915;
  border: 0.75px #eaecd9 solid;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  width:800px;
  font-size: 17px;
`;

const PartButtonContainer = styled(Row)`
  margin: 24px 5px 50px 5px;
`;
const SelectInfoBox = styled(Column)`
  display: flex;
  width: 300px;
  height: 300px;
  margin: 0px 15px;
  padding: 20px 0px;
`;

const CalendarStyle = styled.div`
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
    color:${colors.primary80}
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

const TDetailPage = ({ onNavClick }) => {
  const location = useLocation();
  const [partState, setPartState] = useState(0);
  const [value, onChange] = useState(new Date());

  const parsed = parse(location.search);

  const dataId = parsed.id;
  let data = mainItems.filter((item)=>item.id === dataId)[0];

  return (
    <Layout>
      <CategoryNav />
      <DetailInfo dataId={dataId} />
      <ContentsInfoBody>
        <SelectInfo>
          <CalendarStyle>
            <Calendar
              onChange={onChange}
              value={value}
              minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
              maxDetail="month"
              calendarType="US"
              formatDay={(locale, date) =>
                date.toLocaleString('en', { day: 'numeric' })
              }
            />
          </CalendarStyle>
          <img src={verticalLine} alt="verticalLine" height="260px" />
          <SelectInfoBox>
            회차
            <PartButtonContainer>
              {data.dateInfo.map((_, index) => (
                <TabButton
                  value={index}
                  onClick={(newTab) => {
                    setPartState(newTab.target.value);
                  }}
                  style={{ width: '70px', height: '30px', fontSize: '15px' }}
                  key={index}
                >
                  {index + 1}회차
                </TabButton>
              ))}
            </PartButtonContainer>
            CAST
            <span style={{ paddingTop: '10px' }}>{data.cast}</span>
          </SelectInfoBox>
          <img src={verticalLine} alt="verticalLine" height="260px" />
          <SelectInfoBox>
            잔여석
            <span
              style={{ padding: '10px', fontSize: '20px', color: colors.bgRed }}
            >
              {data.dateInfo[partState].seatCount}석
            </span>
            <ButtonsWrapper>
              <LinkButton
                // to={`/payment?id=${dataId}`}
                to={`/getInfo?id=${dataId}`}
                name="결제"
              />
            </ButtonsWrapper>
          </SelectInfoBox>
        </SelectInfo>
      </ContentsInfoBody>
      Relative
      <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
        <PosterItems type="concert" items={mainItems} />
      </div>
      공연정보
      <ContentsInfoBody>
        <img src={data.detailInfoImg} alt="detailInfo" width={'800px'} />
      </ContentsInfoBody>
    </Layout>
  );
};

export default TDetailPage;
