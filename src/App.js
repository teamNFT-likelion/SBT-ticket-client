import { Routes, Route } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import GlobalStyle from '@styles/GlobalStyle';
import MainPage from '@pages/MainPage';
import TListPage from '@pages/TListPage';
import TDetailPage from '@pages/TDetailPage';
import TSearchPage from '@pages/TSearchPage';
import APaymentPage from '@pages/APaymentPage';
import AccountPage from '@pages/AccountPage';
import '@fontsource/shrikhand'; // title TODO: refactoring 필요
import '@fontsource/roboto-condensed'; // subtitle
import '@fontsource/do-hyeon';
import App3GetInfoPage from '@components/pages/payment/App3GetInfoPage';
import NullData from '@components/pages/NullData';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<TListPage />} />
        <Route path="/detail" element={<TDetailPage />} />
        <Route path="/getInfo" element={<App3GetInfoPage />} />
        <Route path="/search" element={<TSearchPage />} />
        <Route path="/payment" element={<APaymentPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/nullData" element={<NullData />} />
      </Routes>
    </>
  );
}

export default App;
