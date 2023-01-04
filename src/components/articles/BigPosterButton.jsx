import { useNavigate } from 'react-router-dom';
import { ButtonWrapper } from '@components/pages/ticketList/BigPoster.style';
import { walletConnectError } from '@utils/toastMessages';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import * as colors from '@styles/colors';

export const BigPosterButton = (Item) => {
  const navigate = useNavigate();

  const { account } = useRecoilValue(userState);

  return (
    <ButtonWrapper>
      <button
        onClick={() => {
          navigate({
            pathname: '/detail',
            search: `?id=${Item.id}`,
          });
        }}
      >
        상세정보
      </button>
      {Item.preTState === '중' ? (
        <button
          style={{ backgroundColor: colors.primary40 }}
          onClick={() => {
            if (account) {
              navigate({
                pathname: '/payment',
                search: `?id=${Item.id}`,
              });
            } else {
              walletConnectError();
            }
          }}
        >
          사전예매
        </button>
      ) : (
        <button
          onClick={() => {
            if (account) {
              navigate({
                pathname: '/payment',
                search: `?id=${Item.id}`,
              });
            } else {
              walletConnectError();
            }
          }}
        >
          예매하기
        </button>
      )}
    </ButtonWrapper>
  );
};
