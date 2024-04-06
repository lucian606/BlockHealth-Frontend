import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { diagnosesUrl, authUrl, medicNavbarPages } from "../../utils";
import Navbar from "../../components/Navbar";
import { Diagnosis } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";
import DiagnosisCard from "../../components/DiagnosisCard";

export default function MedicDiagnosesPage() {
	const { user } = useAuth();
	const { id } = useParams();

	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [patientName, setPatientName] = useState<String>("");
	const [patientMail, setPatientMail] = useState<String>("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(`${authUrl}/${id}`).then((response) => {
			console.log(response.data);
			setPatientName(response.data.displayName);
			setPatientMail(response.data.email);
		});
		axios
			.get(`${diagnosesUrl}/${id}`, {
				headers: {
					Authorization: `Bearer ${user?.jwt}`,
				},
			})
			.then((response) => {
				console.log(response.data.diagnoses);
				setDiagnoses(response.data.diagnoses);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-800">
				<Navbar pages={medicNavbarPages} currentPage="Patients" />
				<div className="flex flex-col flex-grow items-center justify-center">
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={medicNavbarPages} currentPage="Patients" />
			<div className="flex flex-col justify-start">
				<h1 className="text-2xl text-center text-white py-5">
					Patient Name: {patientName}
				</h1>
				<h2 className="text-2xl text-center text-white">
					Patient Email: {patientMail}
				</h2>
			</div>
			<div className="flex flex-col flex-grow items-center justify-center p-5">
				{diagnoses.length > 0 ? (
					diagnoses.map((diagnosis, index) => (
						<DiagnosisCard
							key={index}
							diagnosisDetails={diagnosis.diagnosisDetails}
							specialty={diagnosis.specialty}
							location={diagnosis.location}
							timestamp={diagnosis.timestamp.replace(",", " at")}
							medicId={diagnosis.medicId}
						/>
					))
				) : (
					<div className="flex items-center justify-center">
						<p> No diagnoses found </p>
					</div>
				)}
			</div>
		</div>
	);
}
