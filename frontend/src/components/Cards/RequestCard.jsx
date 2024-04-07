import React from "react";
import { useState, useEffect } from "react";
import { useRequests } from "../../context/RequestsContext.jsx";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import GroupIcon from "@mui/icons-material/Group";
import Button from "@mui/joy/Button";

import Popup from "../Dialogs/PopupDetalleProyecto.jsx";
import ProjectDetails from "../ProjectDetails.jsx";
import { useProjects } from "../../context/ProjectsContext.jsx";

function RequestCard({ request }) {
    const [openPopup, setOpenPopup] = useState(false);
    const { project, getProject } = useProjects();

	const handleClosePopup = () => {
		setOpenPopup(false);
	};

	const { acceptRequestData, rejectRequestData } = useRequests();

	return (
        <>
		<Card 
            sx={{ maxWidth: 545, minHeight: "300px", position: "relative" }}
            onClick={() => {
                getProject(request.projectId);
                console.log("request.project.id", request.projectId)
                console.log("projecto card", project);
                setOpenPopup(true);
            }}
        >
			<CardCover>
				<img
					src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
					srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800"
					alt={request.projectTitle}
					loading="lazy"
				/>
			</CardCover>
			<CardCover
				sx={{
					background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
				}}
			/>
			<CardContent sx={{ justifyContent: "flex-end" }}>
				<Typography level="h3" textColor="#fff" sx={{ mb: 1, fontWeight: "bold" }}>
					{request.projectTitle}
				</Typography>
				{/* Subido por:::: */}
				<Typography startDecorator={<GroupIcon />} textColor="neutral.300" sx={{ mb: 2 }}>
					{"No especificado"}
				</Typography>

				{/* Ajuste para que los botones ocupen toda una línea, pero llenándola completamente. */}
				<div className="flex w-full">
					<Button onClick={(event) => {event.stopPropagation(); acceptRequestData(request.id);}} variant="solid" color="success" sx={{ flex: 1, borderRadius: "8px", mr: 0.5, fontWeight: "bold" }}>
						Aceptar
					</Button>
					<Button onClick={(event) => {event.stopPropagation(); rejectRequestData(request.id);}} variant="solid" color="danger" sx={{ flex: 1, borderRadius: "8px", ml: 0.5, fontWeight: "bold" }}>
						Rechazar
					</Button>
				</div>
			</CardContent>
		</Card>
        <Popup project={project} openPopup={openPopup} closePopup={handleClosePopup}>
				<ProjectDetails project={project} />
        </Popup>
        </>
	);
}

export default RequestCard;
