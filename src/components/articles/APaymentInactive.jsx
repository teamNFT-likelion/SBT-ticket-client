import * as colors from '@styles/colors';
import styled from 'styled-components';

const TicketContainer = styled('div')`
  display: grid;
  /* grid-template-columns: repeat(4, 2fr); */
  width: 200px;
  gap: 10px;
  margin: 24px;
`;

const TicketWrapper = styled('div')`
  width: auto;
  height: 150px;
  border: 3px solid ${colors.primary40};
  border-radius: 5%;
`;

const TicketImage = styled('div')`
  height: 80%;
  background-color: #ffffff97;
`;

const TicketContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  background-color: gray;
`;

const TextWrapper = styled('span')`
  display: block;
`;

export const Ticket = ({ id, image, title, date }) => {
  return (
    <TicketContainer>
      <TicketWrapper key={id}>
        <TicketImage>{image}</TicketImage>
        <TicketContent>
          <TextWrapper>{title}</TextWrapper>
          <TextWrapper>{date}</TextWrapper>
        </TicketContent>
      </TicketWrapper>
    </TicketContainer>
  );
};
