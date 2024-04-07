import { Routes, Route } from "react-router-dom";
import PatientRegisterPage from "./pages/patientPages/PatientRegisterPage";
import MedicRegisterPage from "./pages/medicPages/MedicRegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import PatientDiagnosesPage from "./pages/patientPages/PatientDiagnosesPage";
import PatientWhitelistPage from "./pages/patientPages/PatientWhitelistPage";
import RequestPage from "./pages/RequestPage";
import MedicPatientsPage from "./pages/medicPages/MedicPatientsPage";
import MedicDiagnosesPage from "./pages/medicPages/MedicDiagnosesPage";
import CreateDiagnoisPage from "./pages/medicPages/CreateDiagnosisPage";

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
							<RequestPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/patients"
					element={
						<PrivateRoute>
							<MedicPatientsPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/patients/:id"
					element={
						<PrivateRoute>
							<MedicDiagnosesPage />
						</PrivateRoute>
					}
				/>
				<Route
					path="/create-diagnosis/:id"
					element={
						<PrivateRoute>
							<CreateDiagnoisPage />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
