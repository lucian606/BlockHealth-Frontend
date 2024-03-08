import { Link } from "react-router-dom";

interface NavbarPageInterface {
	name: string;
	route: string;
	onClickHandler: () => void;
}

interface NavbarProps {
	pages: NavbarPageInterface[];
	currentPage: string;
}

function navbarPage(page: NavbarPageInterface, currentPage: string) {
	let onClickHandler = page.onClickHandler ? page.onClickHandler : () => {};

	if (page.name === currentPage) {
		return (
			<Link
				to={page.route}
				className="block py-2 px-3 rounded hover:bg-gray-700 
				hover:text-blue-500
				md:hover:bg-transparent
				md:border-0 md:p-0 text-blue-700
				aria-current=page"
				onClick={onClickHandler}
			>
				{page.name}
			</Link>
		);
	} else {
		return (
			<Link
				to={page.route}
				className="block py-2 px-3 text-white rounded hover:bg-gray-700 hover:text-blue-500 md:hover:bg-transparent md:border-0 md:p-0 aria-current=page"
				onClick={onClickHandler}
			>
				{page.name}
			</Link>
		);
	}
}

export default function Navbar(props: NavbarProps) {
	console.log(props.pages);
	return (
		<nav className="border-gray-200 bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex items-center space-x-3 rtl:space-x-reverse">
					<img className="w-8 h-8" src="/logo.svg" alt="logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
						BlockHealth
					</span>
				</div>
				<button
					data-collapse-toggle="navbar-default"
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
					aria-controls="navbar-default"
					aria-expanded="false"
				>
					<span className="sr-only">Open main menu</span>
					{/* <svg
						className="w-5 h-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 17 14"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M1 1h15M1 7h15M1 13h15"
						/>
					</svg> */}
				</button>
				<div
					className="hidden w-full md:block md:w-auto"
					id="navbar-default"
				>
					<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-700 rounded-lg bg-gray-80 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-900">
						{props.pages.map((page, index) => (
							<li key={index}>
								{navbarPage(page, props.currentPage)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}
