import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAuth } from "../../context/AuthContext.jsx";
import { useProjects } from "../../context/ProjectsContext.jsx";
import { useState, useEffect } from "react";
import ProjectCard from "../Cards/ProjectCard.jsx";

const ProfileProjects = ({ props }) => {
	const { profile, getProfile, errors: profileErrors } = useAuth();
	const { projects, getProjectsByUser, errors: proyectsErrors } = useProjects();
	const [loading, setLoading] = useState(true);
	const [clickEnabled, setClickEnabled] = useState(true);

	const settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 3,
		slidesToScroll: 3,
		beforeChange: () => {
			setClickEnabled(false);
		},
		afterChange: () => {
			setClickEnabled(true);
		}
	};

	const handleParentClick = (e) => {
		!clickEnabled && e.stopPropagation(); // Si clickEnabled es false, detiene la propagación del clic
	};

	useEffect(() => {
		getProfile();
	}, []);

	useEffect(() => {
		if (profile.id) {
			getProjectsByUser(profile.id).then(() => setLoading(false));
			setLoading(false)
		}
	}, [profile]);

	return (
		<div className="max-w rounded overflow-hidden shadow-lg">
			<h1>Projects</h1>
			{loading ? (
				<p>Cargando proyectos...</p>
			) : projects.length === 0 ? (
				<div className="container mx-auto px-4">
					<Slider {...settings}>
						<div>
							<p>No hay proyectos para mostrar</p>
						</div>
					</Slider>
				</div>
				
			) : (
				<div className="container mx-auto px-4">
					<Slider {...settings}>
					{projects.map((project) => (
						<div key={project.id} onClickCapture={handleParentClick}>
							<ProjectCard project={project} />
						</div>
					))}
					</Slider>
				</div>
			)}
		</div>
	);
};

export default ProfileProjects;
