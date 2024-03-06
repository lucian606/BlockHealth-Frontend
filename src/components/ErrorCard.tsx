interface ErrorCardProps {
	boldMessage: string;
	infoMessage: string;
}

export default function ErrorCard(props: ErrorCardProps) {
	return (
		<div
			className="p-2 mb-4 text-s rounded-lg  dark:text-red-400"
			role="alert"
		>
			<span className="font-medium">{props.boldMessage}</span>{" "}
			{props.infoMessage}
		</div>
	);
}
