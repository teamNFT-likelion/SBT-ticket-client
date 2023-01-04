import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column, Row } from '@components/atoms/wrapper.style';
import { mainItems } from '@mock/items';
import { format } from 'date-fns';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PreTickeingModal({ setPreTicketModal }) {
  const navigate = useNavigate();
  return (
    <>
      <Column justifyContent={'center'} alignItems={'center'} marginBottom={'40px'}>
        현재 진행 중인 사전예매
      </Column>
      <ModalTempBox>
        <Row justifyContent={'space-between'} alignItems={'center'}>
          <img src={mainItems[2].posterImgUrl} alt="WATSON전시" style={{ width: '150px' }} />
          <Column justifyContent={'center'} alignItems={'flex-end'} gap={'10px'}>
            <p style={{ fontSize: '25px' }}>{mainItems[2].title}</p>
            <p style={{ fontSize: '20px' }}>
              {format(new Date(mainItems[2].startDate), 'yyyy.MM.dd')} ~
              {format(new Date(mainItems[2].endDate), 'yyyy.MM.dd')}
            </p>
            <p style={{ fontSize: '18px', color: colors.bgRed }}>
              {'사전예매기간 : ' + format(new Date(mainItems[2].preTicketing[0]), 'yyyy.MM.dd')} ~
              {format(new Date(mainItems[2].preTicketing[1]), 'yyyy.MM.dd')}
            </p>
            <TicketButtonWrapper>
              <TicketButton
                buttonColor={`#fa0800c5`}
                onClick={() => {
                  setPreTicketModal(false);
                  navigate({
                    pathname: '/detail',
                    search: `?id=${mainItems[2].id}`,
                  });
                }}
              >
                사전예매
              </TicketButton>
            </TicketButtonWrapper>
          </Column>
        </Row>
      </ModalTempBox>
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
  width: 540px;
  align-items: center;
  background-color: #3b3b40;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid white;
`;
