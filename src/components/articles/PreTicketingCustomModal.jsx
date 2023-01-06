import styled from 'styled-components';
import * as colors from '@styles/colors';

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
  width: 600px;
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

const PreTicketingCustomModal = ({ show, toggleModal, styles, children }) => {
  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <ModalContainer show={show} onMouseDown={handleClickOutside} style={{ ...styles }}>
      <ModalContent>{children}</ModalContent>
    </ModalContainer>
  );
};

export default PreTicketingCustomModal;
