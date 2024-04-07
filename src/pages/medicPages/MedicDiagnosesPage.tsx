import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { diagnosesUrl, authUrl, medicNavbarPages } from "../../utils";
import Navbar from "../../components/Navbar";
import { Diagnosis } from "../../types";
import LoadingSpinner from "../../components/LoadingSpinner";
import DiagnosisCard from "../../components/DiagnosisCard";

export default function MedicDiagnosesPage() {
	const { user } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();

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
			<div className="flex justify-between p-5">
				<div className="flex flex-col">
					<h1 className="text-lg text-white pb-2">
						Patient Name:{" "}
						<span className="font-bold"> {patientName} </span>
					</h1>
					<h2 className="text-lg text-white">
						Patient Email:{" "}
						<span className="font-bold"> {patientMail} </span>
					</h2>
				</div>
				<button
					type="submit"
					className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 
					font-medium rounded-lg text-sm px-5 py-2.5 text-center"
					onClick={() => {
						navigate(`/create-diagnosis/${id}`);
					}}
				>
					Add Diagnosis
				</button>
			</div>
			<div className="flex flex-col flex-grow items-center justify-center p-5 pt-0">
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
