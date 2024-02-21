import { Link } from "react-router-dom";

function NavBarNoAuth() {
	return (
		<nav className="bg-[#6a6767]">
			<div className="mx-auto px-2 sm:px-6">
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex-1 flex items-center justify-end">
						<div className="flex space-x-4">
							<Link to="/" className="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
								Login
							</Link>
							<Link to="/register" className="text-gray-100 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
								Register
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

export default NavBarNoAuth;
