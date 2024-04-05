interface CardProps {
	img?: string;
	title: string;
	description: string;
	clickable?: boolean;
	onClick?: () => void;
}

export default function Card(props: CardProps) {
	let divClassName: string =
		"w-full h-72 bg-gray-900 rounded-lg shadow-md p-4 flex flex-col items-center text-white overflow-x-auto break-words";

	if (props.clickable) {
		divClassName +=
			" cursor-pointer hover:scale-105 transition ease-in-out";
	}

	return (
		<div className={divClassName} onClick={props.onClick}>
			<img className="w-20 h-20" src={props.img} alt="logo" />
			<p className="mt-2 text-xl font-bold text-center">{props.title}</p>
			<div className="h-full flex flex-col overflow-auto items-center justify-center">
				<p className="md:text-md text-center">{props.description}</p>
			</div>
		</div>
	);
}
