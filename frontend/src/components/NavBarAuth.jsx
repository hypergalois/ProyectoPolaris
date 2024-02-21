import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ArrowRightEndOnRectangleIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

// Hay que manejar el estado de la navegacion, para saber en que pagina estamos, ya veremos como
const navigation = [
	{ name: "Projects", href: "/home", current: false },
	{ name: "Dashboard", href: "/dashboard", current: false },
];

function NavBar() {
	const { logout } = useAuth();

	return (
		<Disclosure as="nav" className="bg-[#6a6767]">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
								<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
									{open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<img className="h-8 w-auto" src="/small-logo.png" alt="Your Company" />
								</div>
								<div className="hidden sm:ml-6 sm:block">
									<div className="flex space-x-4">
										{navigation.map((item) => (
											<Link
												to={item.href}
												key={item.name}
												className={`${item.current ? "bg-gray-900 text-white" : "text-gray-100 hover:bg-gray-700 hover:text-white"} px-3 py-2 rounded-md text-sm font-medium`}
											>
												{item.name}
											</Link>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<Link to="/projects/new" className="inline-flex items-center bg-blue-600 px-4 py-2 mr-2 rounded-full text-white hover:bg-blue-400 focus:outline-none">
									Nuevo Proyecto
									<PlusIcon className="ml-2 h-5 w-5" aria-hidden="true" />
								</Link>

								<Menu as="div" className="ml-3 relative">
									<Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-100 hover:text-white focus:outline-none">
										<ArrowRightEndOnRectangleIcon className="h-6 w-6" aria-hidden="true" />
									</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											<Menu.Item>
												{({ active }) => (
													<Link to="/settings" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>
														Settings
													</Link>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<Link
														to="/"
														className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}
														onClick={() => {
															console.log("Logout.");
															logout();
														}}
													>
														Sign out
													</Link>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>
				</>
			)}
		</Disclosure>
	);
}

export default NavBar;
