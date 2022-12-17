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
import Page404 from '@components/pages/Page404';
import GetInfoPage from '@pages/GetInfoPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<TListPage />} />
        <Route path="/detail" element={<TDetailPage />} />
        <Route path="/getInfo" element={<GetInfoPage />} />
        <Route path="/search" element={<TSearchPage />} />
        <Route path="/payment" element={<APaymentPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
