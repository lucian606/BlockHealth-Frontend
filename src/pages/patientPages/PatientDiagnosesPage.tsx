import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { diagnosesUrl, patientNavbarPages } from "../../utils";
import axios from "axios";
import { Diagnosis } from "../../types";
import { useState } from "react";
import DiagnosisCard from "../../components/DiagnosisCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function PatientDiagnosesPage() {
	const { user } = useAuth();

	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
	const [loading, setLoading] = useState(true);

	const userDiagnosesUrl = `${diagnosesUrl}/${user?.id}`;

	useEffect(() => {
		axios
			.get(userDiagnosesUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
			})
			.then((response) => {
				setDiagnoses(response.data.diagnoses);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-800">
				<Navbar pages={patientNavbarPages} currentPage="Diagnoses" />
				<div className="flex flex-col flex-grow items-center justify-center">
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={patientNavbarPages} currentPage="Diagnoses" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white">
				{diagnoses.length !== 0 &&
					diagnoses.map((diagnosis, index) => (
						<DiagnosisCard
							key={index}
							diagnosisDetails={diagnosis.diagnosisDetails}
							specialty={diagnosis.specialty}
							location={diagnosis.location}
							timestamp={diagnosis.timestamp.replace(",", " at")}
							medicId={diagnosis.medicId}
						/>
					))}
			</div>
		</div>
	);
}
