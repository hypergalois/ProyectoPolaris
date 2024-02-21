import React from "react";
import Navbar from "../components/Navbar";

function HomePage() {
	return (
		<div>
			<Navbar/>
			<h1>HomePage</h1>
		</div>
	);
}

// Ojo, esta es la home de despues de auth
export default HomePage;
