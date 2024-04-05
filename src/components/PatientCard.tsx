interface PatientCardProps {
	displayName?: string;
	email: string;
	uid: string;
	clickable?: boolean;
	onClick?: () => void;
}

export default function PatientCard(props: PatientCardProps) {
	let divClassName: string =
		"bg-gray-900 p-2 rounded-lg my-2 flex justify-between items-center h-21 overflow-auto w-64 flex-grow-0 flex-shrink-0 basis-auto";
	if (props.clickable) {
		divClassName +=
			" cursor-pointer hover:scale-105 transition ease-in-out";
	}

	return (
		<div className={divClassName} onClick={props.onClick}>
			<div className="flex flex-col">
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./patient.svg" />
					<p className="mt-2 text-xl font-bold truncate">
						{props.displayName}
					</p>
				</div>
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./mail.svg" />
					<p className="mt-2 text-xl font-bold truncate">
						{props.email}
					</p>
				</div>
			</div>
		</div>
	);
}
