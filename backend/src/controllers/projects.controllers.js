import prisma from "../config/prisma.client.js";
import { statusEnum, rolesEnum } from "../config/tags.js";
import path from "path";

// Main controllers

export const getProjects = async (req, res) => {
	try {
		const projects = await prisma.project.findMany();
		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getProjectsHome = async (req, res) => {
	try {
		const projects = await prisma.project.findMany({
			where: { status: statusEnum.ACCEPTED },
			orderBy: { createdAt: "desc" },
			select: {
				id: true,
				title: true,
				description: true,
				subject: true,
				degree: {
					select: {
						name: true,
					},
				},
			},
		});

		console.log(projects);

		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const createProject = async (req, res) => {
	try {
		console.log(req.files);

		// const files = req.files ? req.files.map((file) => path.join(process.env.PUBLIC_URL, file.destination, file.filename)) : [];

		const files = req.files ? req.files.map((file) => process.env.PUBLIC_URL + "/" + file.destination + "/" + file.filename) : [];

		const thumbnail = files.find((file) => file.includes("thumbnail")) ?? "http://localhost:5173/full-logo-utad.webp";

		const projectFiles = files.filter((file) => !file.includes("thumbnail"));

		console.log(files);

		// COMENTO POR EL MOMENTO, NO FUNCIONA DESDE FRONTEND
		// req.body.impliedStudentsIDs = JSON.parse(req.body.impliedStudentsIDs);
		// req.body.impliedTeachersIDs = JSON.parse(req.body.impliedTeachersIDs);

		// if (req.body.impliedStudentsIDs) {
		// 	req.body.impliedStudentsIDs = await prisma.user.findMany({
		// 		where: {
		// 			email: {
		// 				in: req.body.impliedStudentsIDs,
		// 			},
		// 		},
		// 		select: {
		// 			id: true,
		// 		},
		// 	});
		// 	req.body.impliedStudentsIDs = req.body.impliedStudentsIDs.map((student) => student.id);
		// }

		// if (req.body.impliedTeachersIDs) {
		// 	req.body.impliedTeachersIDs = await prisma.user.findMany({
		// 		where: {
		// 			email: {
		// 				in: req.body.impliedTeachersIDs,
		// 			},
		// 		},
		// 		select: {
		// 			id: true,
		// 		},
		// 	});
		// 	req.body.impliedTeachersIDs = req.body.impliedTeachersIDs.map((teacher) => teacher.id);
		// }

		// req.body.externalLinks = JSON.parse(req.body.externalLinks);
		// req.body.keywords = JSON.parse(req.body.keywords);
		// req.body.awards = JSON.parse(req.body.awards);

		if (req.role === rolesEnum.USER) {
			const newProject = await prisma.project.create({
				data: {
					...req.body,
					uploadedContent: projectFiles,
					status: statusEnum.PENDING,
					thumbnail: thumbnail,
				},
			});
			if (!newProject) return res.status(404).json({ message: "Project not created" });

			const newRequest = await prisma.request.create({
				data: {
					status: statusEnum.PENDING,
					projectId: newProject.id,
					requesterId: req.userId,
					projectTitle: newProject.title,
					description: newProject.description,
					academicCourse: newProject.academicCourse,
				},
			});
			if (!newRequest) return res.status(404).json({ message: "Request not created" });

			return res.status(200).json(newProject);
			// Si es admin, no se crea una request
		} else if (req.role === rolesEnum.ADMIN || req.role === rolesEnum.CREATOR) {
			const newProject = await prisma.project.create({
				data: {
					...req.body,
					uploadedContent: projectFiles,
					thumbnail: thumbnail,
					status: statusEnum.ACCEPTED,
				},
			});
			if (!newProject) return res.status(404).json({ message: "Project not created" });

			return res.status(200).json(newProject);
		} else {
			return res.status(403).json({ message: "You are not allowed" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getProject = async (req, res) => {
	const { id } = req.params;

	try {
		const project = await prisma.project.findUnique({ where: { id: id } });
		if (!project) return res.status(404).json({ message: "Project not found" });

		return res.status(200).json(project);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateProject = async (req, res) => {
	const { id } = req.params;

	try {
		if (req.role === rolesEnum.USER) {
			const updatedProject = await prisma.project.update({
				where: { id: id },
				data: { ...req.body, status: statusEnum.PENDING },
			});

			if (!updatedProject) return res.status(404).json({ message: "Project not found" });

			const newRequest = await prisma.request.create({
				data: {
					projectId: updatedProject.id,
					requesterId: req.userId,
					projectTitle: updatedProject.title,
					description: updatedProject.description,
					academicCourse: updatedProject.academicCourse,
				},
			});

			if (!newRequest) return res.status(404).json({ message: "Request not created" });

			return res.status(200).json(updatedProject);
		} else if (req.role === rolesEnum.ADMIN || req.role === rolesEnum.CREATOR) {
			const updatedProject = await prisma.project.update({
				where: { id: id },
				data: { ...req.body, status: statusEnum.ACCEPTED },
			});

			if (!updatedProject) return res.status(404).json({ message: "Project not found" });

			return res.status(200).json(updatedProject);
		} else {
			return res.status(403).json({ message: "You are not allowed" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

// Solo admin puede borrar proyectos
export const deleteProject = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedProject = await prisma.project.delete({
			where: { id: id },
		});
		if (!deletedProject) return res.status(404).json({ message: "Project not found" });
		return res.status(200).json(deletedProject);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

// Controllers for searching projects

export const getProjectByUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const projects = await prisma.project.findMany({
			where: { impliedStudentsIDs: { has: userId } },
		});

		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getProjectByCategory = async (req, res) => {
	try {
		const { category } = req.params;
		const projects = await prisma.project.findMany({
			where: { category: category },
		});

		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getProjectByStatus = async (req, res) => {
	try {
		const { status } = req.params;
		const projects = await prisma.project.findMany({
			where: { status: status },
		});

		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getProjectByDate = async (req, res) => {
	try {
		const { date } = req.params;
		const projects = await prisma.project.findMany({
			where: { date: date },
		});

		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getProjectByTitle = async (req, res) => {
	try {
		const { title } = req.params;
		const projects = await prisma.project.findMany({
			where: { title: title },
		});

		if (!projects) return res.status(404).json({ message: "No projects found" });

		return res.status(200).json(projects);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
