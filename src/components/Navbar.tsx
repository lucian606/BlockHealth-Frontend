import { Link } from "react-router-dom";

interface NavbarProps {
	pages: string[];
	routes: string[];
	currentPage: string;
}

export default function Navbar(props: NavbarProps) {
	return (
		<nav className="border-gray-200 bg-gray-900">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex items-center space-x-3 rtl:space-x-reverse">
					<img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo" />
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
					{/* <span className="sr-only">Open main menu</span>
					<svg
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
						{props.pages.map(
							(page, index) => (
								console.log(page),
								console.log(props.currentPage === page),
								(
									<li key={index}>
										<Link
											to={props.routes[index]}
											className={`
											"block py-2 px-3 text-white rounded hover:bg-gray-700 
											hover:text-blue-500
											md:hover:bg-transparent
											md:border-0 md:p-0 "${
												props.currentPage === page
													? "bg-blue-700 text-blue-600"
													: ""
											}`}
											aria-current="page"
										>
											{page}
										</Link>
									</li>
								)
							)
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
