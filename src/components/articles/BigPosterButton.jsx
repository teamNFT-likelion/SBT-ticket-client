import { useNavigate } from 'react-router-dom';
import { ButtonWrapper } from '@components/pages/ticketList/BigPoster.style';
import { walletConnectError } from '@utils/toastMessages';
import { useRecoilValue } from 'recoil';
import { userState } from '@states/userState';
import * as colors from '@styles/colors';

export const BigPosterButton = ({ Item }) => {
  const navigate = useNavigate();

  const { account } = useRecoilValue(userState);
  let Button;

  switch (Item.preTState) {
    case '전':
      Button = (
        <button
          style={{ backgroundColor: colors.primary40, opacity: '0.5' }}
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
          disabled
        >
          사전예매
        </button>
      );
      break;
    case '진행중':
      if (Item.prePossible) {
        Button = (
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
        );
      } else {
        Button = (
          <button
            style={{ backgroundColor: colors.primary40, opacity: '0.5' }}
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
            disabled
          >
            사전예매
          </button>
        );
      }
      break;
    case '종료':
      Button = (
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
      );
      break;
    default:
      Button = (
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
      );
  }

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
      {Button}
    </ButtonWrapper>
  );
};
