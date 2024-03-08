import React from "react";
import PatientRegisterPage from "./pages/PatientRegisterPage";
import MedicRegisterPage from "./pages/MedicRegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<div>
			<Routes>
				<Route
					path="/patient-signup"
					element={<PatientRegisterPage />}
				/>
				<Route path="/medic-signup" element={<MedicRegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/"
					element={
						<PrivateRoute>
							<MainPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
