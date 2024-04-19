import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, ArrowRightEndOnRectangleIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon, DocumentPlusIcon, BellIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { motion } from "framer-motion";

import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationContext";
import NotificationCard from "../Cards/NotificationCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProjectFormOrchestrator from "../ProjectForm/ProjectFormOrchestrator";

function NavBar() {
	// SECCION DE CHECK DE ROLE
	const { logout, userRole, getUserRole } = useAuth();
    const { notifications, getNotificationsData } = useNotifications();

    useEffect(() => {
        getNotificationsData();
      }, []);

	useEffect(() => {
		getUserRole();
	}, []);

	// SECCION DE MOSTRAR POPUP DE NUEVO PROYECTO
	const [openProjectFormPopup, setOpenProjectFormPopup] = useState(false);

	const handleOpenProjectFormPopup = () => {
		setOpenProjectFormPopup(true);
	};

	const handleCloseProjectFormPopup = () => {
		setOpenProjectFormPopup(false);
	};

	if (userRole === null) return null;

	//console.log("NAVBARAUTH -> ", userRole)

	// TODO TAMBIEN HAY QUE HACERLO PARA NO ADMIN, POSIBLEMENTE HACIENDO APPEND A LA RUTA DEL DASHBOARD
	let navigation = [
		{ name: "TODOS", href: "/home", current: false },
		{ name: "ANIMACIÓN", href: "/home/animation", current: false },
		{ name: "DISEÑO DIGITAL", href: "/home/digital-design", current: false },
		{ name: "INGENIERÍA Y CIENCIAS", href: "/home/engineering", current: false },
		{ name: "VIDEOJUEGOS", href: "/home/videogames", current: false },
	];

	navigation.forEach((item) => {
		item.current = location.pathname === item.href;
	});

	return (
		<>
			<Disclosure as="nav" className="bg-blue-600 fixed z-50 w-full top-0">
				{({ open }) => (
					<>
						<div className="mx-auto px-2 sm:px-6 lg:px-8">
							<div className="relative flex items-center justify-between h-16">
								<div className="inset-y-0 left-0 flex items-center sm:hidden mr-2">
									<Disclosure.Button className="inline-flex items-center justify-center p-2 text-white hover:bg-blue-400">{open ? <XMarkIcon className="block h-6 w-6" /> : <Bars3Icon className="block h-6 w-6" />}</Disclosure.Button>
								</div>

								<div className="flex-1 flex items-center justify-between">
									<div className="flex-shrink-0 flex items-center">
										<Link to="/home" style={{ textDecoration: "none" }}>
											<motion.h1
												className="text-xl sm:text-2xl font-[950] text-white cursor-pointer"
												whileHover={{
													scale: 1.1,
													rotate: 5,
													textShadow: "0px 0px 8px rgba(255,255,255,1)",
													transition: { duration: 0.3 },
												}}
												whileTap={{ scale: 0.9 }}
											>
												U-PROJECTS
											</motion.h1>
										</Link>
									</div>
									<div className="hidden sm:block sm:ml-6">
										<div className="flex space-x-1 justify-center flex-1">
											<div className="flex space-x-1 justify-center flex-1">
												{/* TODO ARREGLAR QUE CUANDO DASHBOARD ESTA ACTIVO SE VE TEXTO EN BLANCO SOBRE FONDO BLANCO */}
												{navigation.map((item) => (
													<Link
														to={item.href}
														key={item.name}
														className={`
															${item.current ? (item.admin ? "bg-red-800 text-white font-semibold" : "text-blue-600 bg-white font-semibold") : ""}
															${!item.current && item.admin ? "bg-red-800 text-white font-semibold" : ""}
															${!item.current && !item.admin ? "text-white font-semibold hover:bg-white hover:text-blue-600" : ""}
															px-3 py-2 rounded-md text-sm font-medium
														`}
													>
														{item.name}
													</Link>
												))}
											</div>
										</div>
									</div>
									<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
										{/* Aqui va el disclosure */}

										{userRole === "ADMIN" && (
											<Link to={"/dashboard"} key={"DASHBOARD"} className={"bg-red-800 text-white font-semibold hover:bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm mx-6"}>
												DASHBOARD
											</Link>
										)}

										<button type="button" onClick={handleOpenProjectFormPopup} className="inline-flex items-center bg-white px-3 py-2 sm:px-4 sm:py-2 mr-2 rounded-md text-white hover:bg-blue-200 focus:outline-none">
											<DocumentPlusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" aria-hidden="true" />
										</button>

										<Menu as="div" className="relative">
											<Menu.Button className="inline-flex items-center bg-white px-3 py-2 sm:px-4 sm:py-2 mr-2 rounded-md text-white hover:bg-blue-200 focus:outline-none">
												<BellIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" aria-hidden="true" />
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
                                                    {notifications.length > 0 ? (
                                                        notifications.map((notification, index) => (
                                                            <Menu.Item key={index}>
                                                                <NotificationCard notification={notification} />
                                                            </Menu.Item>
                                                        ))
                                                    ) : (
                                                        <Menu.Item>
                                                            <span>No hay notificaciones</span>
                                                        </Menu.Item>
                                                    )}
                                                </Menu.Items>
											</Transition>
										</Menu>

										{/* @gonibix23 aqui es lo que tienes que cambiar para hacer el menú */}
										<Menu as="div" className="relative">
											<Menu.Button className="inline-flex items-center bg-white px-3 py-2 sm:px-4 sm:py-2 mr-2 rounded-md text-white hover:bg-blue-200 focus:outline-none">
												<UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" aria-hidden="true" />
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
															<Link to="/userProyects" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>
																My Proyects
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
							<Disclosure.Panel className="sm:hidden">
								<div className="px-2 pt-2 pb-3 space-y-1 bg-blue-600 shadow-lg">
									{navigation.map((item) => (
										<Disclosure.Button key={item.name} as={Link} to={item.href} className="text-white hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</Disclosure.Panel>
						</div>
					</>
				)}
			</Disclosure>

			<ProjectFormOrchestrator openPopup={openProjectFormPopup} closePopup={handleCloseProjectFormPopup} />
		</>
	);
}

export default NavBar;
