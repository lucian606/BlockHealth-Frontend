import React from "react";
import PatientRegisterPage from "./pages/PatientRegisterPage";
import MedicRegisterPage from "./pages/MedicRegisterPage";
import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<div>
			<Routes>
				<Route
					path="/patient-signup"
					element={<PatientRegisterPage />}
				/>
				<Route path="/medic-signup" element={<MedicRegisterPage />} />
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;
