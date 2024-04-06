import * as React from "react";

import { useNavigate } from "react-router-dom";
import { useProjects } from "../../context/ProjectsContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { rolesEnum } from "../../config/util.js";

import ProjectDetails from "../ProjectDetails.jsx";
import Popup from "../Dialogs/PopupDetalleProyecto.jsx";

import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import GroupIcon from "@mui/icons-material/Group";

const ProjectCard = ({ project }) => {
	const [openPopup, setOpenPopup] = useState(false);

	const handleClosePopup = () => {
		setOpenPopup(false);
	};

	const { pinProjectRequest } = useProjects();
	const { userRole, getUserRole } = useAuth();

	useEffect(() => {
		getUserRole();
	}, []);

	// if (userRole === null) return null;

	const navigate = useNavigate();

	const handleClick = (project) => {
		// Navegar a otra página al hacer clic
		// navigate(`/projects/${projectId}`);
		// Ya no es una pagina nueva sino un modal
	};

	const handlePin = () => {
		pinProjectRequest(project.id);
	};

	return (
		<>
			<Card
				sx={{ maxWidth: 545, minHeight: "300px", cursor: "pointer" }}
				onClick={() => {
					console.log("Click en el card");
					console.log("project", project);
					setOpenPopup(true);
					// console.log(event.target);
				}}
			>
				<CardCover>
					<img src="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800" srcSet="https://images.unsplash.com/photo-1502657877623-f66bf489d236?auto=format&fit=crop&w=800" loading="lazy" alt="" />
				</CardCover>
				<div
					style={{
						position: "absolute",
						top: 8,
						left: 8,
						backgroundColor: "red",
						color: "white",
						padding: "4px 8px",
						borderRadius: "8px",
					}}
				>
					Animación
				</div>
				<CardCover
					sx={{
						background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
					}}
				/>
				<CardContent sx={{ justifyContent: "flex-end" }}>
					<Typography level="h3" textColor="#fff">
						{project.title}
					</Typography>
					<Typography startDecorator={<GroupIcon />} textColor="neutral.300">
						Nombre de los alumnos
					</Typography>
				</CardContent>
			</Card>
			{/* El title a lo mejor hasta lo quito */}
			<Popup project={project} openPopup={openPopup} closePopup={handleClosePopup}>
				{/* // Aqui va el ProjectDetail */}
				<ProjectDetails project={project} />
			</Popup>
		</>
	);
};

export default ProjectCard;
