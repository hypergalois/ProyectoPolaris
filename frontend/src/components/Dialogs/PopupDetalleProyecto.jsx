import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Es como el popup normal pero lo cambiaremos un poco
// A lo mejor no hace falta cambiar mucho, más que la parte de la imagen y el tituto o
// a lo mejor eso se puede hacer en el propio proyecto details
const Popup = ({ project, openPopup, closePopup, children }) => {
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
					<div className="flex min-h-full items-center justify-center p-0 text-center">
						<Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
							<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-0 text-left align-middle shadow-xl transition-all mt-16">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                <div className="flex justify-between items-center">
										<button onClick={closePopup} className="absolute top-0 right-0 m-6 z-10">
											<XMarkIcon className="h-6 w-6 text-white" />
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
