import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

export const tDateState = atom({
  key: `paymentState/tDate/${v1()}`,
  default: new Date(),
});
export const tPartState = atom({
  key: 'paymentState/tPart',
  default: 0,
});

// mintSBT에 필요한 state
export const tDeadlineState = atom({
  key: 'paymentState/tDeadline', // token에 deadline 저장
  default: 0,
});
export const tPriceState = atom({
  key: 'paymentState/tPrice', // token에 price 저장
  default: 0,
});
export const tPerformIdState = atom({
  key: 'paymentState/tPerformId', // token에 공연id 저장
  default: 0,
});
export const tSeatState = atom({
  key: 'paymentState/tSeat', // token에 좌석정보 저장
  default: [],
});
export const tSeatLimitState = atom({
  key: 'paymentState/tSeatLimit', //token에 해당 공연의 총좌석수 저장
  default: 100,
});
export const tInfoState = selector({
  key: `paymentState/tInfo/${v1()}`, //token에 해당 전체 정보 형태로 변환
  get: ({ get }) => {
    const tPart = get(tPartState);
    const tDate = get(tDateState);
    const tDeadline = get(tDeadlineState);
    const tPrice = get(tPriceState);
    const tPerformId = get(tPerformIdState);
    const tSeat = get(tSeatState);
    const tSeatLimit = get(tSeatLimitState);

    return { tDate, tPart, tDeadline, tPrice, tPerformId, tSeat, tSeatLimit };
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
