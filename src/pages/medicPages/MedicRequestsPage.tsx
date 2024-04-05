import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { requestsUrl, patientNavbarPages, medicNavbarPages } from "../../utils";
import { Patient } from "../../types";
import Navbar from "../../components/Navbar";
import PatientCard from "../../components/PatientCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function MedicRequestsPage() {
	const { user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [patientRequests, setPatientRequests] = useState<Patient[]>([]);

	const userRequestsUrl = requestsUrl + `/medic/${user?.id}`;

	const patientEmailRef = useRef<HTMLInputElement>(null);

	function sendRequest() {
		const patientMail = patientEmailRef.current?.value;
		console.log(patientMail);
		if (patientMail) {
			axios
				.post(
					requestsUrl + "/medic",
					{
						patientMail,
					},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${user?.jwt}`,
						},
					}
				)
				.then((res) => {
					console.log(res.data.newRequest);
					let newRequest = res.data.newRequest;
					setPatientRequests((prevRequests) => [
						...prevRequests,
						newRequest,
					]);
				})
				.catch((err) => {
					alert(err.response.data.message);
				});
		}
	}

	useEffect(() => {
		axios
			.get(userRequestsUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
			})
			.then((response) => {
				console.log(response.data.requests);
				setPatientRequests(response.data.requests);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-800">
				<Navbar pages={medicNavbarPages} currentPage="Requests" />
				<div className="flex flex-col flex-grow items-center justify-center">
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={medicNavbarPages} currentPage="Requests" />
			<div className="p-5 pb-2 flex items-center justify-center text-white">
				<p className="text-lg font-bold overflow-auto">
					To request access to a patient's record, please enter their
					email in the box bellow
				</p>
			</div>
			<div className="p-5 text-white flex flex-row justify">
				<input
					type="email"
					name="email"
					id="email"
					className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
					ref={patientEmailRef}
				/>
				<img
					className="mt-2 w-7 h-7 ml-3 cursor-pointer hover:scale-110 transition ease-in-out"
					src="./send.svg"
					onClick={sendRequest}
				/>
			</div>
			<div className="p-5 pt-2 flex flex-col flex-grow  overflow-auto text-white">
				{patientRequests.length > 0 ? (
					patientRequests.map((patient) => (
						<PatientCard
							key={patient.id}
							displayName={patient.name}
							email={patient.email}
							uid={patient.id}
						/>
					))
				) : (
					<div className="flex items-center justify-center">
						<p> You didn't make any access requests </p>
					</div>
				)}
			</div>
		</div>
	);
}
