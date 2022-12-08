import { toast } from 'react-toastify';

export const walletConnectError = () => {
  toast.error('지갑 연결 필요', {
    position: toast.POSITION.TOP_CENTER,
  });
};
