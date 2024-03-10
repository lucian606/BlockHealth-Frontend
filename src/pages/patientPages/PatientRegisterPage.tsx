import { useRef } from "react";
import { registerUrl } from "../../utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import ErrorCard from "../../components/ErrorCard";
import { useNavigate } from "react-router-dom";

export default function PatientRegisterPage() {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const displayName = nameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const confirmPassword = confirmPasswordRef.current?.value;

		if (password !== confirmPassword) {
			return alert("Passwords do not match");
		}

		const role = "patient";

		const newPatientData = {
			displayName,
			email,
			password,
			role,
		};

		axios
			.post(registerUrl, newPatientData)
			.then((res) => {
				if (res.status === 201) {
					setError("");
					navigate("/login");
				} else {
					console.log("Response not 201");
					console.log(res);
				}
			})
			.catch((err) => {
				console.log(err);
				setError(err.response.data.error);
			});
	}

	return (
		<section className="min-h-screen bg-gray-900 overflow-auto">
			<div className="flex flex-col items-center justify-center px-6 py-10 mx-auto">
				<p className="flex items-center mb-6 text-2xl font-semibold text-white">
					<img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
					BlockHealth
				</p>
				{error !== "" && (
					<ErrorCard boldMessage="Error:" infoMessage={error} />
				)}
				<div className="w-full bg-gray-800 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-white">
							Create a patient account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit}
						>
							<div>
								<label
									htmlFor="name"
									className="block mb-2 text-sm font-medium text-white"
								>
									Full name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="Patient Name"
									required
									ref={nameRef}
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-white"
								>
									Your email
								</label>
								<input
									type="email"
									name="email"
									id="email"
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									placeholder="patient@email.com"
									required
									ref={emailRef}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
									className="block mb-2 text-sm font-medium text-white"
								>
									Password
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
									ref={passwordRef}
								/>
							</div>
							<div>
								<label
									htmlFor="confirm-password"
									className="block mb-2 text-sm font-medium text-white"
								>
									Confirm password
								</label>
								<input
									type="password"
									name="confirm-password"
									id="confirm-password"
									placeholder="••••••••"
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
									ref={confirmPasswordRef}
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Create patient account
							</button>
							<p className="text-sm font-light text-gray-400">
								Already have an account?{" "}
								<Link
									className="font-medium text-primary-500 hover:underline"
									to="/login"
								>
									Login here
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
