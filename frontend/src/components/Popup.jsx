import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Popup = ({ title, openPopup, closePopup, children }) => {
	return (
		<Transition appear show={openPopup} as={React.Fragment}>
			<Dialog as="div" className="relative z-10" onClose={closePopup}>
				<Transition.Child
					as={React.Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mt-16">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
									<div className="flex justify-between items-center">
										<h1 className="text-4xl font-bold flex-grow">{title}</h1>
										<button onClick={closePopup} className="ml-auto">
											<XMarkIcon className="h-6 w-6" />
										</button>
									</div>
								</Dialog.Title>
								<div className="mt-2">
									{children}
									{/* Aquí puedes poner tus acciones del dialog o cualquier otro contenido */}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Popup;
