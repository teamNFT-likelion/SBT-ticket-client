import React,{useState} from 'react';
import styled from 'styled-components';
import LinkButton from '@atoms/LinkButton';
import { Column, Row } from '@components/atoms/wrapper.style';
import Layout from '@articles/Layout';
import DetailInfo from '@components/atoms/DetailInfo';
import CategoryNav from '@components/articles/CategoryNav';
import PosterItems from './ticketList/PosterItems';
import { mainItems } from 'src/mock/items';
import { useLocation } from 'react-router-dom';
import { TabButton } from '@components/atoms/AAP_styles';


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

const ContentsInfo = styled(Column)`
  width: 273px;
  height: 345px;
  border: 3px solid white;
  justify-content: center;
  align-items: center;
`;

const CalenderInfo = styled(Column)`
  display: flex;
  border: 3px solid white;
  width: 300px;
  height: 300px;
`;

const TDetailPage = ({ onNavClick }) => {
  const location = useLocation();
  const dataId= location.state.dataId;
  const data = mainItems.filter((item)=>item.id===dataId)[0];
  const [partState, setPartState] = useState(0);

  return (
    <Layout>
      <CategoryNav />
      <DetailInfo dataId={dataId} />
      <Row justifyContent={"center"}>
        <CalenderInfo>달력</CalenderInfo>
        <CalenderInfo>
          회차
          <Row marginBottom={'50px'} marginTop={'24px'}>
            {data.dateInfo.map((_, index) => (
              <TabButton
                value={index}
                onClick={(newTab) => {
                  setPartState(newTab.target.value);
                }}
                style={{ width: '90px', height: '40px' }}
              >
                {index + 1}회차
              </TabButton>
            ))}
          </Row>
          CAST
          <div>{data.cast}</div>
        </CalenderInfo>
        <CalenderInfo>
          잔여석
          {data.dateInfo[partState].seatCount}
          <ButtonsWrapper>
            <LinkButton to="/payment" name="결제" />
          </ButtonsWrapper>
        </CalenderInfo>
      </Row>
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
