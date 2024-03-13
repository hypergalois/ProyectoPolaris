import React from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = ({ title, children, openPopup, closePopup }) => {
	return (
		// OJO, con la anchura maximo, el div de dentro la puede hacer mas grande aunque tenga el maxWidht
		// Aparte que los popups de ordendador van a ser mas grandes asi que TODO
		<Dialog open={openPopup} onClose={closePopup} maxWidth="md" TransitionComponent={Transition}>
			<DialogTitle>
				<div className="flex justify-between items-center w-full">
					<h1 className="flex-1 text-4xl font-bold text-center">{title}</h1>
					<IconButton onClick={closePopup} className="flex-1 justify-end">
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>
				{children}
				<DialogActions></DialogActions>
			</DialogContent>
		</Dialog>
	);
};

export default Popup;
