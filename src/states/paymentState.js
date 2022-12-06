import { atom } from 'recoil';

//TODO: 활용에 맞게 수정 or 추가
//변수명 은 이후 필요한곳에서 useRecoilState(itemIdState) 형태로 사용

export const itemIdState = atom({
  key: 'paymentState/item',
  default: 0,
});

export const startDateState = atom({
  key: 'paymentState/startDate',
  default: new Date(),
});
