interface DiagnosisCardProps {
	diagnosisDetails: string;
	specialty: string;
	location: string;
	timestamp: string;
	medicId: string;
}

export default function DiagnosisCard(props: DiagnosisCardProps) {
	return (
		<div className="w-full bg-gray-900 rounded-lg shadow-md p-2 mt-2 mb-2 flex flex-col text-white overflow-x-auto break-words">
			<div className="p-1 flex items-center flex-row">
				<img className="mt-2 w-7 h-7 mr-2" src="/medic.svg" />
				<p className="mt-2 text-lg font-bold">{props.medicId}</p>
			</div>
			<div className="p-1 flex items-center flex-row">
				<img className="mt-2 w-7 h-7 mr-2" src="/medicine.svg" />
				<p className="mt-2 text-lg font-bold">{props.specialty}</p>
			</div>

			<div className="p-1 flex items-center flex-row">
				<img className="mt-2 w-7 h-7 mr-2" src="/location.svg" />
				<p className="mt-2 text-lg font-bold">{props.location}</p>
			</div>
			<div className="p-1 flex items-center flex-row">
				<img className="mt-2 w-7 h-7 mr-2" src="/date.svg" alt="logo" />
				<p className="mt-2 text-lg font-bold">{props.timestamp}</p>
			</div>
			<div className="p-1 flex items-center flex-row">
				<img
					className="mt-2 w-7 h-7 mr-2"
					src="/stethoscope.svg"
					alt="logo"
				/>
				<p className="mt-2 text-lg font-bold">
					{props.diagnosisDetails}
				</p>
			</div>
		</div>
	);
}
