import { Link } from "react-router-dom";

function NavBarNoAuth() {
	return (
		<nav className="fixed top-0 w-full z-50 bg-blue-600">
			<div className="mx-auto px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex-1 flex items-center justify-end">
						<div className="flex space-x-4">
							<Link to="/" className="text-white bg-blue-500 hover:bg-blue-300 px-3 py-2 rounded-md text-sm font-bold">
								LOGIN
							</Link>
							<Link to="/register" className="text-gray-100 bg-blue-500 hover:bg-blue-300 px-3 py-2 rounded-md text-sm font-bold">
								REGISTER
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBarNoAuth;
