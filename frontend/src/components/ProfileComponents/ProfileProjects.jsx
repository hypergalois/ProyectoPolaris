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
	//const { projects, getProjectsByUser, errors: proyectsErrors } = useProjects();
	const [ projects, setProjects ] = useState([]);
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
			console.log(profile.id);
			//getProjectsByUser(profile.id).then(() => setLoading(false));
			setProjects([{"id":"1","title":"prrueba1"},{"id":"2","title":"prrueba2"},{"id":"3","title":"prrueba3"},{"id":"4","title":"prrueba4"},{"id":"5","title":"prrueba5"}]);
			setLoading(false)
		}
	}, [profile]);

	useEffect(() => {
		if (projects) {
			console.log("Proyectos: ", projects);
		}
	}, [projects]);

	return (
		<div className="max-w rounded overflow-hidden shadow-lg">
			<h1>Projects</h1>
			{loading ? (
				<p>Cargando proyectos...</p>
			) : projects.length === 0 ? (
				<p>No hay proyectos para mostrar</p>
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
