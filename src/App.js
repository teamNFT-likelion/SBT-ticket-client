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
import AAPP from '@components/pages/AAP_STEP/AAPP';

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/list" element={<TListPage />} />
        <Route path="/detail" element={<TDetailPage />} />
        {/*<<중요>>   꼭 지우거나 바꿔줘야됨 (/getInfo <-> /detail)   <<중요>>*/}
        <Route path="/payment" element={<AAPP />} />
        <Route path="/search" element={<TSearchPage />} />
        <Route path="/getInfo" element={<APaymentPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </>
  );
}

export default App;
