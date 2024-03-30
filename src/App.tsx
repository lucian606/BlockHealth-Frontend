import React from "react";
import PatientRegisterPage from "./pages/patientPages/PatientRegisterPage";
import MedicRegisterPage from "./pages/medicPages/MedicRegisterPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import PatientDiagnosesPage from "./pages/patientPages/PatientDiagnosesPage";
import PatientWhitelistPage from "./pages/patientPages/PatientWhitelistPage";
import PatientRequestsPage from "./pages/patientPages/PatientRequestsPage";

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
				<Route
					path="/diagnoses"
					element={
						<PrivateRoute>
							<PatientDiagnosesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/whitelist"
					element={
						<PrivateRoute>
							<PatientWhitelistPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/requests"
					element={
						<PrivateRoute>
							<PatientRequestsPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
