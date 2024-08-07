import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { loginUrl } from "../utils";
import ErrorCard from "../components/ErrorCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function LoginPage() {
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const { signIn } = useAuth();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setLoading(true);

		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		const credentials = {
			email,
			password,
		};

		axios
			.post(loginUrl, credentials)
			.then((res) => {
				if (res.status === 200) {
					console.log("Logged in");
					setError("");
					signIn(res.data.token);
					console.log(res.data.token);
					window.location.href = "/";
				}
			})
			.catch((err) => {
				console.log(err);
				setError(err.response.data.error);
				setLoading(false);
			});
	}

	if (loading) {
		return (
			<section className="min-h-screen bg-gray-900 overflow-auto">
				<div className="flex flex-col items-center justify-center px-6 py-10 mx-auto">
					<p className="flex items-center mb-6 text-2xl font-semibold text-white">
						<img
							className="w-8 h-8 mr-2"
							src="/logo.svg"
							alt="logo"
						/>
						BlockHealth
					</p>
					<div className="w-full bg-gray-800 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
								Signing in to your account
							</h1>
							<LoadingSpinner />
						</div>
					</div>
				</div>
			</section>
		);
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
						<h1 className="text-2xl font-bold leading-tight tracking-tight text-white">
							Sign in to your account
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={handleSubmit}
						>
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
									className="bg-gray-700 border border-gray-600 text-white sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									required
									ref={passwordRef}
								/>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-400">
								Need a patient account?{" "}
								<Link
									className="font-medium text-primary-500 hover:underline"
									to="/patient-signup"
								>
									Patient Sign Up
								</Link>
							</p>
							<span className="text-sm font-light text-gray-400">
								Need a medic account?{" "}
								<Link
									className="font-medium text-primary-500 hover:underline"
									to="/medic-signup"
								>
									Medic Sign Up
								</Link>
							</span>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
