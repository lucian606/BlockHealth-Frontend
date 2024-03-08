import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function MainPage() {
	const { user } = useAuth();
	// Cast user to the correct type
	const newUser = user as User;

	const pages = [
		{
			name: "Home",
			route: "/home",
		},
		{
			name: "Page 1",
			route: "/medic-signup",
		},
		{
			name: "Page 2",
			route: "/patient-signup",
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
		<div>
			<Navbar pages={pages} currentPage="Home" />
			<h1>Main Page</h1>
			<p>
				{" "}
				You are logged in as: {user?.name} {user?.role}{" "}
			</p>
			{user?.role === "medic" && (
				<div>
					<p>License Number: {(user as Medic).licenseNumber}</p>
					<p>Specialty: {(user as Medic).specialty}</p>
				</div>
			)}
		</div>
	);
}
