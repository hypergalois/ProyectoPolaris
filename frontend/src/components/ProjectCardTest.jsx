import * as React from "react";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import GroupIcon from "@mui/icons-material/Group";

function ProjectCard() {
	return (
		<Card sx={{ minHeight: "280px", width: 320 }}>
			<CardCover>
				<img src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320" srcSet="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320&dpr=2 2x" loading="lazy" alt="" />
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
					Titulo del proyecto
				</Typography>
				<Typography startDecorator={<GroupIcon />} textColor="neutral.300">
					Nombre de los alumnos
				</Typography>
			</CardContent>
		</Card>
	);
}

export default ProjectCard;
