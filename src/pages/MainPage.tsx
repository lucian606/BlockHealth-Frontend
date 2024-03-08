import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import PatientMainPage from "./patientPages/PatientMainPage";

export default function MainPage() {
	const { isMedic } = useAuth();

	if (isMedic()) {
		return <h1>Medic Main Page</h1>;
	} else {
		return <PatientMainPage />;
	}
}
