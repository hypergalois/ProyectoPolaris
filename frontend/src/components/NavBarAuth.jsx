import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ArrowRightEndOnRectangleIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon, DocumentPlusIcon, BellIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar() {
	const { logout, userRole, getUserRole } = useAuth();

	useEffect(() => {
		getUserRole();
	}, []);

	if (userRole === null) return null;

	//console.log("NAVBARAUTH -> ", userRole)

	// TODO TAMBIEN HAY QUE HACERLO PARA NO ADMIN, POSIBLEMENTE HACIENDO APPEND A LA RUTA DEL DASHBOARD
	let navigation = [
		{ name: "TODOS", href: "/home", current: false },
		{ name: "ANIMACIÓN", href: "/animation", current: false },
		{ name: "DISEÑO DIGITAL", href: "/digital-design", current: false },
		{ name: "INGENIERÍA Y CIENCIAS", href: "/engineering", current: false },
		{ name: "VIDEOJUEGOS", href: "/videogames", current: false },
	];

	// TODO: CAMBIAR LAS RUTAS SEGUN SE HAGAN
	if (userRole === "ADMIN") {
		navigation.push({ name: "DASHBOARD", href: "/dashboard", current: false });
	}

	navigation.forEach((item) => {
		item.current = location.pathname === item.href;
	});

	return (
		<Disclosure as="nav" className="bg-blue-600 fixed z-50 w-full top-0">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="inset-y-0 left-0 flex items-center sm:hidden mr-2">
								<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
									{open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-between">
								<div className="flex-shrink-0 flex items-center">
									<h1 className="text-2xl font-[950] text-white">U-PROJECTS</h1>
								</div>
								<div className="hidden sm:block sm:ml-6">
									<div className="flex space-x-1 justify-center flex-1">
										{navigation.map((item) => (
											<Link to={item.href} key={item.name} className={`${item.current ? "bg-white text-white" : "text-white font-semibold hover:bg-white hover:text-blue-600"} px-3 py-2 rounded-md text-sm font-medium`}>
												{item.name}
											</Link>
										))}
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									<Link to="/projects/new" className="inline-flex items-center bg-white px-4 py-2 mr-2 rounded-full text-white hover:bg-blue-400 focus:outline-none">
										<DocumentPlusIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
									</Link>

									<Link to="/projects/new" className="inline-flex items-center bg-white px-4 py-2 mr-2 rounded-full text-white hover:bg-blue-400 focus:outline-none">
										<BellIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
									</Link>

									<Menu as="div" className="ml-3 relative">
										<Menu.Button className="bg-white px-4 py-2 mr-2 rounded-full text-gray-100 hover:text-white focus:outline-none">
											<UserCircleIcon className="h-5 w-5 text-blue-600" aria-hidden="true" />
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
														<Link to="/profile" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>
															Profile
														</Link>
													)}
												</Menu.Item>
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
					</div>
				</>
			)}
		</Disclosure>
	);
}

export default NavBar;
