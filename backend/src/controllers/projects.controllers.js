import prisma from "../config/prisma.client.js";
import { statusEnum, rolesEnum } from "../config/tags.js";

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

export const createProject = async (req, res) => {
	try {
		const files = req.files ? req.files.map((file) => process.env.PUBLIC_URL + file.destination + file.filename) : [];
		console.log(files);

		if (req.role === rolesEnum.USER || req.role === rolesEnum.CREATOR) {
			const newProject = await prisma.project.create({
				// Especifico que status es PENDING, para no depender del valor por defecto
				data: { ...req.body, uploadedContent: files, status: statusEnum.PENDING},
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
		} else if (req.role === rolesEnum.ADMIN) {
			const newProject = await prisma.project.create({
				data: {
					...req.body,
					uploadedContent: files,
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
		if (req.role === rolesEnum.USER || req.role === rolesEnum.CREATOR) {
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
		} else if (req.role === rolesEnum.ADMIN) {
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
	if (req.role === rolesEnum.ADMIN) {
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
	} else {
		return res.status(403).json({ message: "You are not allowed" });
	}
};

// Controllers for searching projects

export const getProjectByUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const projects = await prisma.project.findMany({
			where: { impliedStudentsIDs: userId },
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
