import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirect() {
	const navigate = useNavigate();

	useEffect(() => {
		const auth = window.localStorage.getItem("auth");

		if (!JSON.parse(auth)) {
			navigate("/");
		}
	});
}

export default Redirect;
