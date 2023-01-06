import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column, Row } from '@components/atoms/wrapper.style';
import { useEffect, useState } from 'react';
import useItems from '@hooks/useItems';

export default function PreTicketingInactiveModal({
  setPreTicketModal,
  hostAddr,
  sbtList,
  inactiveId,
  setInactiveId,
}) {
  const [inactiveTickets, setInactiveTickets] = useState([]);
  const [relativeTickets, setRelativeTickets] = useState([]);

  const { items } = useItems();

  useEffect(() => {
    if ((sbtList.length && !inactiveTickets.length) || !relativeTickets.length) {
      const hostPreTicketingList = items.filter((item) => item.id === hostAddr)[0].preTicketingList;
      setInactiveTickets(sbtList.filter((item) => !item.tokenIsActive));
      setRelativeTickets(
        inactiveTickets.filter((item) => hostPreTicketingList.includes(item.tokenHostAddr)),
      );
    }
  }, [sbtList, hostAddr, inactiveTickets, items, relativeTickets]);

  const PreTicketingList = ({ item }) => {
    return (
      <ModalTempBox>
        <Column justifyContent={'space-between'} alignItems={'center'}>
          <img
            src={item.tokenImage.data}
            alt="포스터img"
            style={{ width: '150px', margin: '10px' }}
          />
          <Column justifyContent={'center'} alignItems={'center'} gap={'10px'}>
            <p style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px' }}>
              {item.tokenTitle}
            </p>
            <p style={{ fontSize: '20px', marginBottom: '10px', color: colors.natural95 }}>
              token Id : {item.tokenId}
            </p>
            <TicketButtonWrapper>
              <TicketButton
                buttonColor={`#fa0800c5`}
                onClick={() => {
                  setInactiveId(item.tokenId);
                  setPreTicketModal(false);
                }}
              >
                사용하기
              </TicketButton>
            </TicketButtonWrapper>
          </Column>
        </Column>
      </ModalTempBox>
    );
  };

  return (
    <>
      <Column justifyContent={'center'} alignItems={'center'} marginBottom={'40px'}>
        소유 중인 관련 INACTIVE ticket
      </Column>
      <ModalWrapper>
        {inactiveTickets &&
          relativeTickets.map((item, i) => <PreTicketingList item={item} key={i} />)}
      </ModalWrapper>
    </>
  );
}

const TicketButtonWrapper = styled(Column)`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
`;

const TicketButton = styled('button')`
  background-color: ${(props) => props.buttonColor};
  width: 100px;
  height: 36px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 3px;
`;

const ModalTempBox = styled(Row)`
  width: 250px;
  max-height: 400px;
  align-items: center;
  background-color: #3b3b40;
  padding: 20px;
  border-radius: 12px;
  justify-content: center;
  border: 2px solid ${colors.primary80};
`;

const ModalWrapper = styled(Row)`
  display: flex;
  align-items: center;
  justify-content: center;
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
