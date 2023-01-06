import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column, Row } from '@components/atoms/wrapper.style';
import { mainItems, restItems } from '@mock/items';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import PreTicketingPeriod from '@utils/PreTicketingPeriod';

export default function PreTicketingModal({ setPreTicketModal, hostAddr }) {
  const navigate = useNavigate();
  const items = [...mainItems, ...restItems];
  const pre_ticket_list = items.filter(
    (item) =>
      item.preTicketingList.includes(hostAddr) &&
      PreTicketingPeriod(item.preTicketing) === '진행중',
  );
  const PreTicketingList = ({ item }) => {
    return (
      <ModalTempBox>
        <Row justifyContent={'space-between'} alignItems={'center'}>
          <img src={item.posterImgUrl} alt="WATSON전시" style={{ width: '150px' }} />
          <Column justifyContent={'center'} alignItems={'flex-end'} gap={'10px'}>
            <p style={{ fontSize: '25px' }}>{item.title}</p>
            <p style={{ fontSize: '20px' }}>
              {format(new Date(item.startDate), 'yyyy.MM.dd')} ~
              {format(new Date(item.endDate), 'yyyy.MM.dd')}
            </p>
            {item.preTicketing[0] && (
              <p style={{ fontSize: '18px', color: colors.bgRed }}>
                {'사전예매기간 : ' + format(new Date(item.preTicketing[0]), 'yyyy.MM.dd')} ~
                {format(new Date(item.preTicketing[1]), 'yyyy.MM.dd')}
              </p>
            )}
            <TicketButtonWrapper>
              <TicketButton
                buttonColor={`#fa0800c5`}
                onClick={() => {
                  setPreTicketModal(false);
                  navigate({
                    pathname: '/detail',
                    search: `?id=${item.id}`,
                  });
                }}
              >
                사전예매
              </TicketButton>
            </TicketButtonWrapper>
          </Column>
        </Row>
      </ModalTempBox>
    );
  };

  return (
    <>
      <Column justifyContent={'center'} alignItems={'center'} marginBottom={'40px'}>
        현재 진행 중인 사전예매
      </Column>
      <ModalWrapper>
        {pre_ticket_list.length === 0 ? (
          <p style={{ fontSize: '20px', color: colors.bgRed }}>
            해당 토큰과 관련된 공연이 없습니다.
          </p>
        ) : (
          pre_ticket_list.map((item, i) => <PreTicketingList item={item} key={i} />)
        )}
      </ModalWrapper>
    </>
  );
}

const TicketButtonWrapper = styled(Column)`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: flex-end;
  margin-top: 20px; ;
`;

const TicketButton = styled('button')`
  background-color: ${(props) => props.buttonColor};
  width: 100px;
  height: 36px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
`;

const ModalTempBox = styled(Column)`
  width: 536px;
  max-height: 400px;
  align-items: center;
  background-color: #3b3b40;
  padding: 20px;
  border-radius: 12px;
  justify-content: center;
  border: 2px solid ${colors.primary80};
`;

const ModalWrapper = styled(Column)`
  display: flex;
  align-items: center;
  width: 600px;
  max-height: 600px;
  gap: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #a2a2a2;
  }
`;
