import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { requestsUrl, whitelistUrl, patientNavbarPages } from "../../utils";
import { RequestItem } from "../../types";
import Navbar from "../../components/Navbar";
import RequestCard from "../../components/RequestCard";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function PatientRequestsPage() {
	const { user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [requests, setRequests] = useState<RequestItem[]>([]);

	const userRequestsUrl = requestsUrl + `/${user?.id}`;

	function deleteRequestByMedic(uid: string) {
		axios
			.delete(userRequestsUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
				data: {
					medicId: uid,
				},
			})
			.then((response) => {
				console.log(response);
				setRequests(requests.filter((request) => request.uid !== uid));
			});
	}

	function approveRequestByMedic(uid: string) {
		deleteRequestByMedic(uid);
		axios
			.post(
				whitelistUrl,
				{
					medicId: uid,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${user?.jwt}`,
					},
				}
			)
			.then((response) => {
				console.log(response);
			});
	}

	function rejectRequestByMedic(uid: string) {
		deleteRequestByMedic(uid);
	}

	useEffect(() => {
		axios
			.get(userRequestsUrl, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user?.jwt}`,
				},
			})
			.then((response) => {
				setRequests(response.data.requests);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex flex-col min-h-screen bg-gray-800">
				<Navbar pages={patientNavbarPages} currentPage="Requests" />
				<div className="flex flex-col flex-grow items-center justify-center">
					<LoadingSpinner />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Navbar pages={patientNavbarPages} currentPage="Requests" />
			<div className="p-5 flex flex-col flex-grow  overflow-auto text-white">
				{requests.length > 0 ? (
					requests.map((requestItem, index) => {
						return (
							<RequestCard
								key={index}
								displayName={requestItem.name}
								specialty={requestItem.specialty}
								email={requestItem.email}
								uid={requestItem.uid}
								approveClickHandler={() => {
									approveRequestByMedic(requestItem.uid);
								}}
								rejectClickHandler={() => {
									rejectRequestByMedic(requestItem.uid);
								}}
							/>
						);
					})
				) : (
					<div className="flex items-center justify-center">
						<p> No access requests found </p>
					</div>
				)}
			</div>
		</div>
	);
}
