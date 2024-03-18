import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { whitelistUrl } from "../../utils";
import axios from "axios";
import WhitelistCard from "../../components/WhitelistCard";

export default function PatientWhitelistPage() {
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
				console.log("Signing out");
				localStorage.removeItem("token");
				sessionStorage.removeItem("token");
			},
		},
	];

	const [whitelist, setWhitelist] = useState([]);

	const userWhitelistUrl = `${whitelistUrl}`;

	function removeMedicFromWhitelist(medicId: string) {
		axios
			.delete(userWhitelistUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
				data: {
					medicId: medicId,
				},
			})
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					setWhitelist(whitelist.filter((item) => item !== medicId));
				}
			});
	}

	useEffect(() => {
		axios
			.get(userWhitelistUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
			})
			.then((response) => {
				setWhitelist(response.data.whitelist);
				console.log(response.data.whitelist);
			});
	}, []);

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={pages} currentPage="Whitelist" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white">
				{whitelist.length > 0 ? (
					whitelist.map((whitelistItem, index) => {
						return (
							<WhitelistCard
								key={index}
								doctorName={whitelistItem}
								specialty={"ORL"}
								onClickHandler={() => {
									console.log("Delete whitelist item");
									removeMedicFromWhitelist(whitelistItem);
								}}
							/>
						);
					})
				) : (
					<p>No whitelist items found</p>
				)}
			</div>
		</div>
	);
}
