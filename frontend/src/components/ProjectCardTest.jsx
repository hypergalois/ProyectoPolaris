import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import GroupIcon from "@mui/icons-material/Group";

const ProjectCard = ({ project }) => {
	return (
		<Card sx={{ minHeight: "650px"}}>
			<CardCover>
				<img src="http://localhost:5173/thumbnail_default.jpeg" srcSet="http://localhost:5173/thumbnail_default.jpeg" loading="lazy" alt="" />
			</CardCover>
			<div
				style={{
					position: "absolute",
					top: 6,
					left: 6,
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
				<Typography level="title-lg" textColor="#fff">
                    {project.title}
				</Typography>
				<Typography startDecorator={<GroupIcon />} textColor="neutral.300">
					Nombre de los alumnos
				</Typography>
			</CardContent>
		</Card>
	);
}

export default ProjectCard;
