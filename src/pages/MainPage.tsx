import Navbar from "../components/Navbar";

export default function MainPage() {
	return (
		<Navbar
			pages={["Home", "Page 1", "Page 2", "Sign Out"]}
			routes={["/home", "/medic-signup", "patient-signup", "/sign-out"]}
			currentPage="Home"
		/>
	);
}
