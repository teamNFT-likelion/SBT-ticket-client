const naverState = 'naver';
const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const naverRedirectUri = window.origin.includes('localhost')
  ? 'http://localhost:3000/payment'
  : 'https://ttot.netlify.app/payment';
export const naverOauthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverState}&redirect_uri=${naverRedirectUri}`;

const kakaoState = 'kakao';
const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
const kakaoRedirectUri = window.origin.includes('localhost')
  ? 'http://localhost:3000/payment'
  : 'https://ttot.netlify.app/payment';
export const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code&state=${kakaoState}`;
