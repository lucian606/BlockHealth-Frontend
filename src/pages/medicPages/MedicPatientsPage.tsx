import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { whitelistUrl, medicNavbarPages } from "../../utils";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Patient } from "../../types";
import PatientCard from "../../components/PatientCard";

export default function MedicPatientsPage() {
	const { user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [patients, setPatients] = useState<Patient[]>([]);

	const medicPatientsUrl = `${whitelistUrl}/medic`;

	useEffect(() => {
		axios
			.get(medicPatientsUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setPatients(response.data.patients);
				setLoading(false);
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
			<div className="p-5 flex flex-wrap gap-4 justify-center sm:justify-start items-start text-white">
				{patients.length > 0 ? (
					patients.map((patient) => {
						return (
							<PatientCard
								key={patient.uid}
								displayName={patient.name}
								email={patient.email}
								uid={patient.id}
								clickable={true}
							/>
						);
					})
				) : (
					<div className="flex items-center justify-center">
						<p>
							For the moment you don't have access to any
							patient's record.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
