import React from "react";
import { useState, useEffect } from "react";
import { useRequests } from "../../context/RequestsContext.jsx";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import GroupIcon from "@mui/icons-material/Group";
import Button from "@mui/joy/Button";

function RequestCard({ request }) {
	const { acceptRequestData, rejectRequestData } = useRequests();

	const handleAccept = () => {
		acceptRequestData(request.id);
	};

	const handleReject = () => {
		rejectRequestData(request.id);
	};

	return (
		<Card sx={{ maxWidth: 545, minHeight: "300px", position: "relative" }}>
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
					<Button onClick={handleAccept} variant="solid" color="success" sx={{ flex: 1, borderRadius: "8px", mr: 0.5, fontWeight: "bold" }}>
						Aceptar
					</Button>
					<Button onClick={handleReject} variant="solid" color="danger" sx={{ flex: 1, borderRadius: "8px", ml: 0.5, fontWeight: "bold" }}>
						Rechazar
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default RequestCard;
