import {
  InfoWrapper,
  Title,
  Info,
  PreTicketingInfo,
} from '@components/pages/ticketList/BigPoster.style';
import { format } from 'date-fns';
import * as colors from '@styles/colors';

export const BigPosterInfo = ({ Item }) => {
  return (
    <InfoWrapper>
      <Title>
        {Item.preTState && (
          <PreTicketingInfo style={{ color: colors.bgRed }}>
            {`[사전예매 ${Item.preTState}]`}
          </PreTicketingInfo>
        )}
        {Item.title}
      </Title>
      {Item.preTicketing[0] && (
        <PreTicketingInfo marginTop="30px">
          {'사전예매기간 : ' + format(new Date(Item.preTicketing[0]), 'yyyy.MM.dd')} ~
          {format(new Date(Item.preTicketing[1]), 'yyyy.MM.dd')}
        </PreTicketingInfo>
      )}
      <Info marginTop="50px">
        {format(new Date(Item.startDate), 'yyyy.MM.dd')} ~
        {format(new Date(Item.endDate), 'yyyy.MM.dd')}
      </Info>
      <Info>{Item.place}</Info>
      <Info marginTop="50px">{Item.viewAgeName} 관람가능</Info>
      <Info marginTop="30px">CAST : {Item.cast}</Info>
    </InfoWrapper>
  );
};
