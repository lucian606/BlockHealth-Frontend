import Navbar from "../../components/Navbar";
import { useAuth, Patient } from "../../contexts/AuthContext";

export default function PatientMainPage() {
	const { user } = useAuth();
	let patient = user as Patient;

	const pages = [
		{
			name: "Home",
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
			<div className="flex-grow bg-gray-800 overflow-auto text-white">
				<h1>Main Page</h1>
				<p>
					{" "}
					You are logged in as: {user?.name} {user?.role}{" "}
				</p>
			</div>
		</div>
	);
}
