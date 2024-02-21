import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const navigation = [
	{ name: "Dashboard", href: "#", current: true },
	{ name: "Team", href: "#", current: false },
	{ name: "Projects", href: "#", current: false },
	{ name: "Calendar", href: "#", current: false },
];

function NavBar() {
	return (
		<Disclosure as="nav" className="bg-[#858585]">
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
											<a
												key={item.name}
												href={item.href}
												className={`${item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} px-3 py-2 rounded-md text-sm font-medium`}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<Menu as="div" className="ml-3 relative">
									<Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
										<BellIcon className="h-6 w-6" aria-hidden="true" />
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
													<a href="#" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>
														Your Profile
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a href="#" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>
														Settings
													</a>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<a href="#" className={`${active ? "bg-gray-100" : ""} block px-4 py-2 text-sm text-gray-700`}>
														Sign out
													</a>
												)}
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							</div>
						</div>
					</div>

					<Disclosure.Panel className="sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<Disclosure.Button
									key={item.name}
									as="a"
									href={item.href}
									className={`${item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"} block px-3 py-2 rounded-md text-base font-medium`}
								>
									{item.name}
								</Disclosure.Button>
							))}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}

export default NavBar;
