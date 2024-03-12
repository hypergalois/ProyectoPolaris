import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Popup = ({ title, children, openPopup, closePopup, setOpenPopup, setClosePopup }) => {
	return (
		<Dialog open={openPopup} maxWidth="md">
			<DialogTitle>
				<div className="mb-4 text-5xl font-bold text-center">
					<h1>CREA TU CUENTA</h1>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default Popup;
