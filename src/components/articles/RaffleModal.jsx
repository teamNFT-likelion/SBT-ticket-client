import { useState } from 'react';
import styled from 'styled-components';
import * as colors from '@styles/colors';
import { Column } from '@components/atoms/wrapper.style';
import { useRaffleContract } from '@hooks/useRaffleContract';
import useWeb3 from '@hooks/useWeb3';
import raffle1 from '@assets/img/raffle_1.png';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';

export default function RaffleModal({ setRaffleModal, tokenId }) {
  const [value, setValue] = useState('');
  const { account } = useRecoilValue(userState);
  const { web3 } = useWeb3();
  const { join } = useRaffleContract(web3);

  return (
    <ModalTempBox>
      <img src={raffle1} alt="raffle1" style={{ width: '300px' }} />
      <Input
        type="text"
        placeholder="참여코드를 입력 하세요."
        onChange={(e) => setValue(e.target.value)}
      />
      <TicketButtonWrapper>
        <TicketButton
          buttonColor={`#fa0800c5`}
          onClick={() => {
            join(value, tokenId, { from: account }, () => {
              setRaffleModal(false);
              setValue('');
              window.location.reload();
            });
          }}
        >
          응모
        </TicketButton>
      </TicketButtonWrapper>
    </ModalTempBox>
  );
}

const TicketButtonWrapper = styled('div')`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: center;
  align-items: center;
  gap: 10px;
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
  width: 300px;
  align-items: center;
`;

const Input = styled('input')`
  width: 100%;
  height: 36px;
  margin-top: 16px;
  margin-bottom: 32px;
  outline: none;
  font-size: 20px;
  background-color: ${colors.bgBlack};
  border: 2px solid ${colors.primary40};
  color: white;
  border-radius: 6px;
  padding-left: 12px;
`;
