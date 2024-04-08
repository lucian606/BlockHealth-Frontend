import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { diagnosesUrl, authUrl, medicNavbarPages } from "../../utils";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import ErrorCard from "../../components/ErrorCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function CreateDiagnosisPage() {
	const { user } = useAuth();
	const { id } = useParams();
	const navigate = useNavigate();

	const [patientName, setPatientName] = useState<String>("");
	const [patientMail, setPatientMail] = useState<String>("");
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	const loactionRef = useRef<HTMLInputElement>(null);
	const diagnosisRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		axios
			.get(`${authUrl}/${id}`)
			.then((response) => {
				console.log(response.data);
				setPatientName(response.data.displayName);
				setPatientMail(response.data.email);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(error.message);
				setLoading(false);
			});
	}, []);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);
		const location = loactionRef.current?.value;
		const diagnosisDetails = diagnosisRef.current?.value;
		const jwt = user?.jwt;

		if (!location || !diagnosisDetails) {
			alert("Please fill all the fields");
		}

		axios
			.post(
				diagnosesUrl + `/${id}`,
				{
					location,
					diagnosisDetails,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${jwt}`,
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				setError("");
				navigate("/patients/" + id);
			})
			.catch((err) => {
				console.log(err);
				setError(err.message);
				setLoading(false);
			});
	}

	if (loading) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-800">
				<Navbar pages={medicNavbarPages} currentPage="Patients" />
				<div className="flex flex-col items-center justify-center px-6 py-10 mx-auto">
					<div className="w-full bg-gray-900 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
								Add diagnosis
							</h1>
							<LoadingSpinner />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={medicNavbarPages} currentPage="Patients" />
			<div className="flex flex-col items-center justify-center px-6 py-10 mx-auto">
				<div className="w-full bg-gray-900 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
							Add diagnosis
						</h1>
						{error !== "" && (
							<ErrorCard
								boldMessage="Error:"
								infoMessage={error}
							/>
						)}
						<form className="space-y-4 md:space-y-6">
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-white"
								>
									Patient Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-800 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-100"
									placeholder={patientName as string}
									disabled
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-white"
								>
									Patient Email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-800 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 disabled:opacity-100"
									placeholder={patientMail as string}
									disabled
								/>
							</div>
							<div>
								<label
									htmlFor="location"
									className="block mb-2 text-sm font-medium text-white"
								>
									Clinic Name
								</label>
								<input
									type="text"
									name="location"
									id="location"
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
									ref={loactionRef}
								/>
							</div>
							<div>
								<label
									htmlFor="location"
									className="block mb-2 text-sm font-medium text-white"
								>
									Diagnossis Details
								</label>
								<textarea
									name="location"
									id="location"
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
									ref={diagnosisRef}
								/>
							</div>
							<div className="flex justify-between space-x-6">
								<button
									type="submit"
									className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center p-5"
									onClick={() => navigate("/patients/" + id)}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
									onClick={handleSubmit}
								>
									Add Diagnosis
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
