interface WhitelistCardProps {
	doctorName: string;
	specialty: string;
	onClickHandler: () => void;
}

export default function WhitelistCard(props: WhitelistCardProps) {
	return (
		<div className="bg-gray-700 p-5 rounded-lg my-2 flex justify-between items-center">
			<div className="flex flex-col">
				<div> Placeholder: {props.doctorName} </div>
				<div> Specialty: ORL </div>
			</div>
			<div>
				<img
					className="w-7 h-7 mr-2 cursor-pointer hover:scale-110 transition ease-in-out"
					src="./delete-button.svg"
					onClick={props.onClickHandler}
				/>
			</div>
		</div>
	);
}
