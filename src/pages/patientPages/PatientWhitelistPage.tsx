import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { whitelistUrl, patientNavbarPages } from "../../utils";
import axios from "axios";
import WhitelistCard from "../../components/WhitelistCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { WhitelistItem } from "../../types";

export default function PatientWhitelistPage() {
	const { user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [whitelist, setWhitelist] = useState<WhitelistItem[]>([]);

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
					setWhitelist(
						whitelist.filter((medic) => medic.uid !== medicId)
					);
				}
				setLoading(false);
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
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-800">
				<Navbar pages={patientNavbarPages} currentPage="Whitelist" />
				<div className="flex flex-col flex-grow items-center justify-center">
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={patientNavbarPages} currentPage="Whitelist" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white">
				{whitelist.length > 0 ? (
					whitelist.map((whitelistItem, index) => {
						return (
							<WhitelistCard
								key={index}
								displayName={whitelistItem.displayName}
								specialty={whitelistItem.specialty}
								email={whitelistItem.email}
								uid={whitelistItem.uid}
								onClickHandler={() => {
									console.log("Delete whitelist item");
									removeMedicFromWhitelist(whitelistItem.uid);
								}}
							/>
						);
					})
				) : (
					<div className="flex items-center justify-center">
						<p>No medics found in your whitelist.</p>
					</div>
				)}
			</div>
		</div>
	);
}
