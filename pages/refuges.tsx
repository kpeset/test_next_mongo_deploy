import axios from "axios";
import { useEffect, useState } from "react";

export default function Refuges() {
	const [refuges, setRefuges] = useState([]);

	useEffect(() => {
		axios.get("/api/refuges").then((response) => console.info(response));
	}, []);

	return (
		<>
			<h2>Les reguges</h2>
		</>
	);
}
