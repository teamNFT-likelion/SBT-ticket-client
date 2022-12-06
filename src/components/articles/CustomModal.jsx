import styled from 'styled-components';
// eslint-disable-next-line no-unused-vars
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as colors from '@styles/colors';
import { startDateState } from '@states/paymentState';

const ModalContainer = styled('div')`
  display: ${(props) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: auto;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  border-radius: 20px;
`;
const ModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: auto;
  font-size: 30px;
  font-weight: 400;
  background: ${colors.bgSecondary};
  border-radius: 8px;
  padding: 40px;
  margin: 0 auto;
  border: none;
  outline: none;
  overflow: none;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: 5px 6px 6px rgba(0, 0, 0, 0.15);
`;

const CustomModal = ({ show, toggleModal, styles, children }) => {
  // useState 사용이랑 같은 패턴 [value, setValue]
  // const [startDate, setStartDate] = useRecoilState(startDateState);

  // value 만 받아오면 될때
  const startDate = useRecoilValue(startDateState);

  // setValue 부분만 받아오면 될때
  // const setStartDate = useSetRecoilState(startDateState);

  console.log(startDate);

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <ModalContainer
      show={show}
      onMouseDown={handleClickOutside}
      style={{ ...styles }}
    >
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

export default CustomModal;
