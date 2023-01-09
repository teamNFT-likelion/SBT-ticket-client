import { atom, selector } from 'recoil';

export const tDateState = atom({
  key: `paymentState/tDate/${crypto.randomUUID()}`,
  default: new Date(),
});
export const tPartState = atom({
  key: 'paymentState/tPart',
  default: 0,
});

// 현재 사전예매 기간인지 APP_1부터 저장
export const preTicketState = atom({
  key: 'paymentState/preTicketState', // token에 deadline 저장
  default: false,
});

// mintSBT에 필요한 state
export const tDeadlineState = atom({
  key: 'paymentState/tDeadline', // token에 deadline 저장
  default: 0,
});
export const tPerformIdState = atom({
  key: 'paymentState/tPerformId', // token에 공연id 저장
  default: '',
});
export const tPriceState = atom({
  key: 'paymentState/tPrice', // token에 price 저장
  default: 0,
});
export const tPricePerTokenState = atom({ // 실시간 토큰 가격 저장
  key: 'paymentState/tPricePerToken',
  default: 0,
});
export const tTokenPriceState = atom({  // tPrice를 tPricePerToken으로 나눠서
  key: 'paymentState/tTokenPrice',
  default: 0,
});
export const tSeatState = atom({
  key: 'paymentState/tSeat', // token에 좌석정보 저장
  default: [],
});
export const tInfoState = selector({
  key: 'paymentState/tInfo', //token에 해당 전체 정보 형태로 변환
  get: ({ get }) => {
    const tDate = get(tDateState);
    const tPart = get(tPartState);
    const tDeadline = get(tDeadlineState);
    const tPerformId = get(tPerformIdState);
    const tPrice = get(tPriceState);
    const tPricePerToken = get(tPricePerTokenState);
    const tTokenPrice = get(tTokenPriceState);
    const tSeat = get(tSeatState);

    return { tDate, tPart, tDeadline, tPerformId, tPrice, tPricePerToken, tTokenPrice, tSeat };
  },
});

// tokenUri => ipfs 메타데이터를 위한 state
export const sbtImageState = atom({
  key: 'paymentState/sbtImage', // metadata 이미지 경로 저장
  default: null,
});
export const sbtNameState = atom({
  key: 'paymentState/sbtName', // metadata 이름 저장
  default: '',
});
export const sbtDescState = atom({
  key: 'paymentState/sbtDesc', // metadata 본문 저장
  default: '',
});
export const sbtInfoState = selector({
  key: 'paymentState/sbtInfo',
  get: ({ get }) => {
    const sbtImage = get(sbtImageState);
    const sbtName = get(sbtNameState);
    const sbtDesc = get(sbtDescState);

    return { sbtImage, sbtName, sbtDesc };
  },
});
