import { useAuth } from "../contexts/AuthContext";
import PatientRequestsPage from "./patientPages/PatientRequestsPage";
import MedicRequestsPage from "./medicPages/MedicRequestsPage";

export default function RequestPage() {
	const { isMedic } = useAuth();

	if (isMedic()) {
		return (
			<div>
				<MedicRequestsPage />
			</div>
		);
	} else {
		return <PatientRequestsPage />;
	}
}
