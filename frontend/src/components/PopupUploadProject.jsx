import React, { useState, useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CloseIcon from "@mui/icons-material/Close";

import CloseProjectFormDialog from "./Dialogs/CloseProjectFormDialog";

const PopupUploadProject = ({ title, children, openPopup, renderStep, onClose }) => {
	const [showHelp, setShowHelp] = useState(false);
	const helpRef = useRef(null); // Referencia para el menú de ayuda

	// Cerrar el menú de ayuda si se hace clic fuera de él
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (helpRef.current && !helpRef.current.contains(event.target)) {
				setShowHelp(false);
			}
		};

		// Agregar el listener cuando el menú esté abierto
		if (showHelp) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// Limpiar el listener
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showHelp]);

	return (
		<Dialog open={openPopup} onClose={onClose} maxWidth="md" fullWidth={true}>
			<DialogTitle sx={{ backgroundColor: "#2563eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<h1 className="text-4xl font-bold text-center text-white">{title}</h1>
				<div>
					<IconButton onClick={() => setShowHelp(!showHelp)}>
						<HelpOutlineIcon sx={{ color: "white" }} />
					</IconButton>
					<IconButton onClick={onClose}>
						<CloseIcon sx={{ color: "white" }} />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>
				{renderStep()}
				{showHelp && (
					<div ref={helpRef} className="absolute top-16 right-10 bg-white shadow-lg rounded-md p-4 z-10">
						<p className="text-sm text-gray-700">Simplemente rellena los campos!</p>
						Puedes usar las flechas para avanzar por los campos y guardar un borrador para no perder tu progreso!
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default PopupUploadProject;
