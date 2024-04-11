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

		// const files = req.files ? req.files.map((file) => path.join(process.env.PUBLIC_URL, file.destination, file.filename)) : [];

		const files = req.files ? req.files.map((file) => process.env.PUBLIC_URL + "/" + file.destination + "/" + file.filename) : [];

		const thumbnail = files.find((file) => file.includes("thumbnail")) ?? "http://localhost:5173/full-logo-utad.webp";

		const projectFiles = files.filter((file) => !file.includes("thumbnail"));

		(JSON.parse(req.body.impliedStudents)[0]!==undefined) ? req.body.impliedStudents = JSON.parse(req.body.impliedStudents) : delete req.body.impliedStudents;
		if(req.body.impliedStudents){
			if (req.body.impliedStudents.length > 1) {
				req.body.impliedStudents = await prisma.user.findMany({
					where: {
						email: {
							in: req.body.impliedStudents,
						},
					},
					select: {
						id: true,
					},
				});
				req.body.impliedStudents = req.body.impliedStudents.map((student) => {
					console.log(student)
					return { connect: { id: student.id } };
				});
			}else{
				req.body.impliedStudents = await prisma.user.findUnique({ where: { email: req.body.impliedStudents[0] } });
				req.body.impliedStudents = { connect: { id: req.body.impliedStudents.id }};
			}
		}

		if (req.body.impliedTeachers) {
            const impliedTeachersData = JSON.parse(req.body.impliedTeachers);
        
            if (Array.isArray(impliedTeachersData)) {
                req.body.impliedTeachers = [];
        
                for (const teacherData of impliedTeachersData) {
                    if (teacherData.professor) {
                        const professorEmail = teacherData.professor;

                        const professor = await prisma.user.findUnique({
                            where: { email: professorEmail },
                        });
        
                        // Si el profesor existe, conectarlo al proyecto
                        if (professor) {
                            req.body.impliedTeachers.push({ connect: { id: professor.id } });
                        } else {
                            // Manejar el caso en el que el profesor no existe
                            console.log(`El profesor con el correo electrónico ${professorEmail} no fue encontrado.`);
                        }
                    } else {
                        // Manejar el caso en el que no se proporcionó el correo electrónico del profesor
                        console.log('No se proporcionó el correo electrónico del profesor.');
                    }
                }
            } else {
                // Manejar el caso en el que impliedTeachersData no es un array válido
                console.log('El campo impliedTeachers debe ser un array válido.');
                delete req.body.impliedTeachers;
            }
        }

        if (req.body.awards) {
            const awardsData = JSON.parse(req.body.awards);
        
            if (Array.isArray(awardsData)) {
                // Si awardsData es un array, se procede a procesar cada elemento
                req.body.awards = [];
        
                for (const awardId of awardsData) {
                    // Realizar las operaciones necesarias con el ID del premio
                    // Por ejemplo, conectar el premio al proyecto
                    req.body.awards.push({ connect: { id: awardId } });
                }
            }
        }

		req.body.subject = { connect: { id: req.body.subject }};
		req.body.degree = { connect: { id: req.body.degree }};

		req.body.externalLinks = req.body.externalLinks ? req.body.externalLinks.split(",") : [];
		req.body.keywords = req.body.keywords ? req.body.keywords.split(",") : [];

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

    console.log("getProject req.params.id",id);

	try {
		const project = await prisma.project.findUnique({ where: { id: id } });
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
