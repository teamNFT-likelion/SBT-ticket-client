const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID;
const naverRedirectUri = 'http://localhost:5000/naver/callback'; //TODO: 환경고려 코드수정필요
const naverState = window.origin.includes('localhost') ? 'local' : 'dev'; //TODO: 환경고려 코드수정필요
export const naverOauthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClientId}&state=${naverState}&redirect_uri=${naverRedirectUri}`;

const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
const kakaoRedirectUri = 'http://localhost:5000/kakao/callback'; //TODO: 환경고려 코드수정필요
const kakaoState = window.origin.includes('localhost') ? 'local' : 'dev'; //TODO: 환경고려 코드수정필요
export const kakaoOauthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoClientId}&redirect_uri=${kakaoRedirectUri}&response_type=code&state=${kakaoState}`;