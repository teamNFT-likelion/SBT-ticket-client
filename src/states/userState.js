import { atom } from 'recoil';

// docs: https://recoiljs.org/docs/introduction/getting-started
//TODO: 활용에 맞게 수정 or 추가

// naming 패턴은 통일 필요함
// 변수명 ~~State ,,
export const userState = atom({
  key: 'userState/user', // key : 파일명/~~(유니크해야함 id 역할)
  default: {
    email: '',
    address: '',
    isConnectWallet: false,
  },
  //default : initialState 지정
});
