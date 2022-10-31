import { Routes, Route } from "react-router-dom";
import GlobalStyle from "@styles/GlobalStyle";
import MainPage from "@pages/MainPage";
import TListPage from "@pages/TListPage";
import TDetailPage from "@pages/TDetailPage";
import TSearchPage from "@pages/TSearchPage";
import APaymentPage from "@pages/APaymentPage";
import AccountPage from "@pages/AccountPage";

function App() {
	return (
		<>
			<GlobalStyle />
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/list" element={<TListPage />} />
				<Route path="/detail" element={<TDetailPage />} />
				<Route path="/search" element={<TSearchPage />} />
				<Route path="/payment" element={<APaymentPage />} />
				<Route path="/account" element={<AccountPage />} />
			</Routes>
		</>
	);
}

export default App;
