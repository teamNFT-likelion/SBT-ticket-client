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
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Page404 from '@components/pages/Page404';
import GetInfoPage from '@pages/GetInfoPage';
import PaySuccess from '@pages/PaySuccess';
import RafflePage from '@pages/RafflePage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<TListPage />} />
        <Route path="/raffle" element={<RafflePage />} />
        <Route path="/detail" element={<TDetailPage />} />
        <Route path="/getInfo" element={<GetInfoPage />} />
        <Route path="/search" element={<TSearchPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/payment" element={<APaymentPage />}>
          <Route path="success" element={<PaySuccess />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
