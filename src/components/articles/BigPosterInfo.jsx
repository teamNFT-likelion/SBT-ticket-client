import { InfoWrapper, Title, Info, Tag } from '@components/pages/ticketList/BigPoster.style';
import { format } from 'date-fns';
import { BigPosterButton } from './BigPosterButton';

export const BigPosterInfo = ({ Item }) => {
  return (
    <InfoWrapper>
      <Title>
        {Item.preTState && <Tag>{`사전예매 ${Item.preTState}`}</Tag>}
        {Item.title}
      </Title>
      <div>
        {Item.preTicketing[0] && (
          <Info>
            {'사전예매기간 : ' + format(new Date(Item.preTicketing[0]), 'yyyy.MM.dd')} ~
            {format(new Date(Item.preTicketing[1]), 'yyyy.MM.dd')}
            <div style={{ fontSize: '15px', fontStyle: 'oblique', marginTop: '8px' }}>
              {'※ 사전예매는 관련 SBT를 가진 사용자만 이용할 수 있는 서비스 입니다. ※'}
            </div>
          </Info>
        )}
        <Info marginTop="32px">
          {format(new Date(Item.startDate), 'yyyy. MM. dd. hh:mm')} (KST) ~{' '}
          {format(new Date(Item.endDate), 'yyyy. MM. dd. hh:mm')} (KST)
        </Info>
        <BigPosterButton Item={Item} />
      </div>
    </InfoWrapper>
  );
};
