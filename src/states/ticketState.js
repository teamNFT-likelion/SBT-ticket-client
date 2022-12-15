import { atom } from 'recoil';

export const tDateState = atom({
  key: 'ticketState/tDate',
  default: new Date(),
});

export const tPartState = atom({
  key: 'ticketState/tPart',
  default: 0,
});
