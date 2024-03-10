import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { diagnosesUrl } from "../../utils";
import axios from "axios";
import { Diagnosis } from "../../types";
import { useState } from "react";
import DiagnosisCard from "../../components/DiagnosisCard";

export default function PatientDiagnosesPage() {
	const { user } = useAuth();

	const pages = [
		{
			name: "Welcome",
			route: "/",
		},
		{
			name: "Diagnoses",
			route: "/diagnoses",
		},
		{
			name: "Whitelist",
			route: "/whitelist",
		},
		{
			name: "Requests",
			route: "/requests",
		},
		{
			name: "Sign Out",
			route: "/login",
			onClickHandler: () => {
				console.log("Signing out");
				localStorage.removeItem("token");
				sessionStorage.removeItem("token");
			},
		},
	];

	const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

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
				console.log(response.data);
				setDiagnoses(response.data);
			});
	}, []);

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={pages} currentPage="Diagnoses" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white">
				{diagnoses.map((diagnosis, index) => (
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
