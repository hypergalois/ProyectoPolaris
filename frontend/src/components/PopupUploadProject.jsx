import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import CloseProjectFormDialog from "./Dialogs/CloseProjectFormDialog";

const PopupUploadProject = ({ title, openPopup, renderStep, onClose }) => {
	const [showHelp, setShowHelp] = useState(false);
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const helpRef = useRef(null);

	const handleCloseClick = (event) => {
		// En Headless UI, puedes manejar el cierre debido a clics fuera o presionar Esc directamente en el componente Dialog
		setShowConfirmDialog(true); // Mostrar diálogo de confirmación
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (helpRef.current && !helpRef.current.contains(event.target)) {
				setShowHelp(false);
			}
		};

		if (showHelp) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showHelp]);

	return (
		<>
			<Transition appear show={openPopup} as={React.Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleCloseClick}>
					<Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
						<div className="fixed inset-0 bg-gray-500 bg-opacity-55 transition-opacity" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={React.Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all mt-16">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center">
										<span className="text-4xl font-bold text-center text-blue-600">{title}</span>
										<div>
											<button onClick={() => setShowHelp(!showHelp)}>
												<QuestionMarkCircleIcon className="h-6 w-6 text-blue-600" />
											</button>
											<button onClick={onClose}>
												<XMarkIcon className="h-6 w-6 text-blue-600" />
											</button>
										</div>
									</Dialog.Title>
									<div className="mt-2">
										{renderStep()}
										{showHelp && (
											<div ref={helpRef} className="absolute top-16 right-10 bg-white shadow-lg rounded-md p-4 z-10">
												<p className="text-sm text-gray-700">¡Simplemente rellena los campos! Puedes usar las flechas para avanzar por los campos y guardar un borrador para no perder tu progreso.</p>
											</div>
										)}
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Diálogo de confirmación */}
			<CloseProjectFormDialog open={showConfirmDialog} setOpen={setShowConfirmDialog} onCloseParentDialog={onClose} />
		</>
	);
};

export default PopupUploadProject;
