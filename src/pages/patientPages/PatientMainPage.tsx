import Navbar from "../../components/Navbar";
import { useAuth, Patient } from "../../contexts/AuthContext";

export default function PatientMainPage() {
	const { user } = useAuth();
	let patient = user as Patient;

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

	return (
		<div className="flex flex-col h-screen">
			<Navbar pages={pages} currentPage="Home" />
			<div className="p-5 flex flex-col flex-grow bg-gray-800 overflow-auto text-white items-center justify-center">
				<img className="w-40 h-40" src="/care.svg" alt="logo" />
				<p className="text-2xl md:text-4xl font-bold">
					Hello {user?.name}👋
				</p>
				<p className="text-2xl md:text-4xl font-bold pb-1">
					Welcome to BlockHealth!
				</p>
				<p className="text-sm md:text-md">
					Below you can find more details about how to use our
					platform
				</p>
			</div>
		</div>
	);
}
