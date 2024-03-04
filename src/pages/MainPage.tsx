import Navbar from "../components/Navbar";

export default function MainPage() {
	return (
		<Navbar
			pages={["Home", "Page 1", "Page 2", "Page 3"]}
			routes={["/home", "/", "patient-signup", "doctor-signup"]}
			currentPage="Home"
		/>
	);
}
