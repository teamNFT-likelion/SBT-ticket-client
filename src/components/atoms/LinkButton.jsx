import React from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ to = "/", name = "홈으러" }) => {
	return (
		<Link to={to}>
			<button>{name}</button>
		</Link>
	);
};

export default LinkButton;
