import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { medicNavbarPages } from "../../utils";

export default function PatientMainPage() {
	const { user } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={medicNavbarPages} currentPage="Welcome" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white items-center justify-center">
				<img className="w-40 h-40" src="./care.svg" alt="logo" />
				<p className="text-2xl md:text-4xl font-bold">
					Hello DR. {user?.name}👋
				</p>
				<p className="text-2xl md:text-4xl font-bold pb-1">
					Welcome to BlockHealth!
				</p>
				<p className="text-sm md:text-md">
					Below you can find more details about how to use our
					platform
				</p>
			</div>
			<div className="flex flex-col md:flex-row justify-center p-5 gap-5">
				<Card
					title="Patients"
					description="Here you can see the patients to whom you have access to their medical record. You can see their medical history and create new diagnoses."
					img="./medical-record.svg"
					clickable={true}
					onClick={() => {
						navigate("/patients");
					}}
				/>
				<Card
					title="Requests"
					description="You can make a request to access a patient's medical record by providing the patient's email. You can also see the requests you have made."
					img="./request.svg"
					clickable={true}
					onClick={() => {
						navigate("/requests");
					}}
				/>
			</div>
		</div>
	);
}
