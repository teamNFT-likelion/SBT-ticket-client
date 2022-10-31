import React from "react";
import LinkButton from "@atoms/LinkButton";
import Header from "@articles/Header";
import { TempWrapper } from "@components/atoms/Wrapper.style";

const MainPage = () => {
	return (
		<TempWrapper>
			<div>랜딩페이지~</div>
			<Header />
			<div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid black" }}>
				section 1
				<LinkButton to="/list" name="다음페이지" />
			</div>
			<div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid black" }}>section 2</div>
			<div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid black" }}>section 3</div>
		</TempWrapper>
	);
};

export default MainPage;
