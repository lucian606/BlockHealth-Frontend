import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";

export default function PatientMainPage() {
	const { user } = useAuth();

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
				localStorage.removeItem("token");
				sessionStorage.removeItem("token");
			},
		},
	];

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={pages} currentPage="Welcome" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white items-center justify-center">
				<img className="w-40 h-40" src="./care.svg" alt="logo" />
				<p className="text-2xl md:text-4xl font-bold">
					Hello DR. {user?.name}👋
				</p>
				<p className="text-2xl md:text-4xl font-bold pb-1">
					Welcome to BlockHealth!
				</p>
				<p className="text-sm md:text-md">
					Below you can find more details about how to use our
					platform
				</p>
			</div>
			<div className="flex flex-col md:flex-row justify-center p-5 gap-5">
				<Card
					title="Diagnoses"
					description="Here you can view your medical record by being able to see your diagnoses and details about them"
					img="./medical-record.svg"
				/>
				<Card
					title="Whitelist"
					description="On this page you can see which medics have access to your medical record. You can also add or remove medics"
					img="./locked-file.svg"
				/>
				<Card
					title="Requests"
					description="Here you can see the requests that medics have made to access your medical record. You can accept or deny them"
					img="./request.svg"
				/>
			</div>
		</div>
	);
}
