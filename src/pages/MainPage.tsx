import { useAuth } from "../contexts/AuthContext";
import PatientMainPage from "./patientPages/PatientMainPage";
import MedicMainPage from "./medicPages/MedicMainPage";

export default function MainPage() {
	const { isMedic, user } = useAuth();

	if (isMedic()) {
		return <MedicMainPage />;
	} else {
		return <PatientMainPage />;
	}
}
