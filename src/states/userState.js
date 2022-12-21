import { atom, selector } from 'recoil';

// docs: https://recoiljs.org/docs/introduction/getting-started
//TODO: 활용에 맞게 수정 or 추가

// naming 패턴은 통일 필요함
// 변수명 ~~State ,,
export const userEmail = atom({
  key: 'userState/userEmail',
  default: '',
});
export const userAccount = atom({
  key: 'userState/userAccount',
  default: localStorage.getItem('_user'),
});
export const userIsConnectWallet = atom({
  key: 'userState/userIsConnectWallet',
  default: false,
});
export const userNetworkId = atom({
  key: 'userState/userNetworkId',
  default: '',
});
export const userWalletType = atom({
  key: 'userState/userWalletType',
  default: localStorage.getItem('_wallet'),
});

export const userState = selector({
  key: 'userState/user', // key : 파일명/~~(유니크해야함 id 역할)
  get: ({ get }) => {
    const email = get(userEmail);
    const account = get(userAccount);
    const isConnectWallet = get(userIsConnectWallet);
    const walletType = get(userWalletType);
    const networkId = get(userNetworkId);

    return { email, account, isConnectWallet, walletType, networkId };
  },
  //default : initialState 지정
});
