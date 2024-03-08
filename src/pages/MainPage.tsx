import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";

export default function MainPage() {
	const { user } = useAuth();
	// Cast user to the correct type
	const newUser = user as User;

	return (
		<div>
			<Navbar
				pages={["Home", "Page 1", "Page 2", "Sign Out"]}
				routes={["/home", "/medic-signup", "patient-signup", "/login"]}
				currentPage="Home"
			/>
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
