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
                thumbnail: true,
				subject: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
				degree: {
					select: {
                        id: true,
						name: true,
					},
				},
                awards: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                personalProject: true,
                impliedStudentsIDs: true,
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

export const getProjectsHomeByArea = async (req, res) => {
    try {
        const { area } = req.params;

        // Encuentra los proyectos que pertenecen al área especificada
        const projects = await prisma.project.findMany({
            where: { 
                status: statusEnum.ACCEPTED, 
                areaId: area
            },
			orderBy: { createdAt: "desc" },
			select: {
				id: true,
				title: true,
				description: true,
                thumbnail: true,
				subject: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
				degree: {
					select: {
                        id: true,
						name: true,
					},
				},
                awards: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
			},
		});

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: "No projects found in the specified area" });
        }

        return res.status(200).json(projects);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const createProject = async (req, res) => {
	try {
		console.log(req.body);
        
		const files = req.files ? req.files.map((file) => process.env.PUBLIC_URL + "/" + file.destination + "/" + file.filename) : [];

		const thumbnail = files.find((file) => file.includes("thumbnail")) ?? "http://localhost:5173/full-logo-utad.webp";
        const summary = files.find((file) => file.includes("summary")) ?? null;

		const projectFiles = files.filter((file) => !file.includes("thumbnail") && !file.includes("summary")) ?? [];

        if (req.body.impliedProfessors) {
            req.body.impliedProfessorsIDs = Array.isArray(req.body.impliedProfessors) ? req.body.impliedProfessors : [req.body.impliedProfessors];
            delete req.body.impliedProfessors;
        }

        req.body.impliedStudentsIDs = req.body.impliedStudents ? (Array.isArray(req.body.impliedStudents) ? req.body.impliedStudents : [req.body.impliedStudents]) : [];
        delete req.body.impliedStudents;

        req.body.awardsId = req.body.awards ? (Array.isArray(req.body.awards) ? req.body.awards : [req.body.awards]) : [];
        delete req.body.awards;
        
        req.body.personalProject = req.body.personalProject === "true" ? true : false;
        // req.body.subject = req.body.subject ? { connect: { id: req.body.subject }} : null;
        req.body.subjectId = req.body.subject ? req.body.subject : null;
        delete req.body.subject;
        // req.body.degree = req.body.degree ? { connect: { id: req.body.degree }} : null;
        req.body.degreeId = req.body.degree ? req.body.degree : null;
        delete req.body.degree;

		req.body.externalLinks = req.body.externalLinks ? (Array.isArray(req.body.externalLinks) ? req.body.externalLinks : [req.body.externalLinks]) : [];
		req.body.keywords = req.body.keywords ? (Array.isArray(req.body.keywords) ? req.body.keywords : [req.body.keywords]) : [];

		if (req.role === rolesEnum.USER) {
			const newProject = await prisma.project.create({
				data: {
					...req.body,
					uploadedContent: projectFiles,
					thumbnail: thumbnail,
                    summary: summary,
                    status: statusEnum.PENDING,
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

            console.log(req.body)

			return res.status(200).json(newProject);
			// Si es admin, no se crea una request
		} else if (req.role === rolesEnum.ADMIN || req.role === rolesEnum.CREATOR) {
			const newProject = await prisma.project.create({
				data: {
					...req.body,
					uploadedContent: projectFiles,
					thumbnail: thumbnail,
                    summary: summary,
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

    console.log("getProject req.params.id",id);

	try {
        const project = await prisma.project.findUnique({ where: { id: id }, include: {
            subject: true,
            degree: true,
            awards: true
        }});
		if (!project) return res.status(404).json({ message: "Project not found" });

        console.log(project);

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
			where: {
        OR: [
            { impliedStudentsIDs: { has: userId } },
            { impliedProfessorsIDs: { has: userId } }
        ]
    }
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
