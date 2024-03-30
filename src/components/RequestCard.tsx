interface RequestCardProps {
	displayName: string;
	specialty: string;
	email: string;
	uid: string;
	approveClickHandler: () => void;
	rejectClickHandler: () => void;
}

export default function RequestCard(props: RequestCardProps) {
	return (
		<div className="bg-gray-900 p-2 rounded-lg my-2 flex justify-between items-center">
			<div className="flex flex-col">
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./medic.svg" />
					<p className="mt-2 text-xl font-bold">
						{props.displayName}
					</p>
				</div>
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./medicine.svg" />
					<p className="mt-2 text-xl font-bold">{props.specialty}</p>
				</div>
				<div className="p-1 flex items-center flex-row">
					<img className="mt-2 w-7 h-7 mr-2" src="./mail.svg" />
					<p className="mt-2 text-xl font-bold">{props.email}</p>
				</div>
			</div>
			<div className="flex flex-row justify-between">
				<img
					className="w-10 h-10 mr-2 cursor-pointer hover:scale-110 transition ease-in-out"
					src="./tick.svg"
					onClick={props.approveClickHandler}
				/>
				<img
					className="w-10 h-10 mr-2 ml-2 cursor-pointer hover:scale-110 transition ease-in-out"
					src="./reject.svg"
					onClick={props.rejectClickHandler}
				/>
			</div>
		</div>
	);
}
