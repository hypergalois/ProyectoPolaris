import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Popup = ({ title, children, openPopup, closePopup }) => {
	return (
		<Dialog open={openPopup} onClose={closePopup} maxWidth="md">
			<DialogTitle>
				<div className="flex justify-between items-center w-full">
					<h1 className="flex-1 text-5xl font-bold text-center">{title}</h1>
					<IconButton onClick={closePopup} className="flex-1 justify-end">
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};

export default Popup;
