interface PatientCardProps {
	displayName: string;
	email: string;
	uid: string;
}

export default function PatientCard(props: PatientCardProps) {
	return (
		<div className="bg-gray-900 p-2 rounded-lg my-2 flex justify-between items-center">
			<div className="flex flex-col">
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./patient.svg" />
					<p className="mt-2 text-xl font-bold">
						{props.displayName}
					</p>
				</div>
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./mail.svg" />
					<p className="mt-2 text-xl font-bold">{props.email}</p>
				</div>
			</div>
		</div>
	);
}
