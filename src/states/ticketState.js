import { atom } from 'recoil';

export const tDateState = atom({
  key: 'ticketState/tDate',
  default: null,
});

export const tPartState = atom({
  key: 'ticketState/tPart',
  default: 0,
});
