import prisma from '../config/prisma.client.js';

// Main controllers

export const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        if (!projects) res.status(404).send({ message: "No projects found" });

        res.status(200).send(projects);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const createProject = async (req, res) => {
    try {
        const files = req.files ? req.files.map(file => process.env.PUBLIC_URL+file.destination+file.filename) : []

        const { id } = await prisma.department.findFirst({where: {name: req.body.departmentName}, select: {id: true}});
        delete req.body.departmentName;

        const newProject = await prisma.project.create({data: {...req.body, uploadedContent: files, departmentId: id}});

        await prisma.request.create({
            data: {
                projectId: newProject.id,
                requesterId: req.userId,
                projectTitle: newProject.title,
                description: newProject.description,
                academicCourse: newProject.academicCourse
            }
        });

        res.status(200).send(newProject);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({where: {id: id}});
        if (!project) res.status(404).send({ message: "Project not found" });

        res.status(200).send(project);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await prisma.project.update({where: {id: id}, data: {...req.body, state: "PENDING"}});

        await prisma.request.create({
            data: {
                projectId: newProject.id,
                requesterId: req.userId,
                projectTitle: newProject.title,
                description: newProject.description,
                academicCourse: newProject.academicCourse
            }
        });

        res.status(200).send(updatedProject);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await prisma.project.delete({where: {id: id}});
        res.status(200).send(deletedProject);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

// Controllers for searching projects

export const getProjectByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await prisma.project.findMany({where: {impliedStudentsIDs: userId}});
        res.status(200).send(projects);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getProjectByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const projects = await prisma.project.findMany({where: {category: category}});
        res.status(200).send(projects);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getProjectByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const projects = await prisma.project.findMany({where: {status: status}});
        res.status(200).send(projects);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getProjectByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const projects = await prisma.project.findMany({where: {date: date}});
        res.status(200).send(projects);
    } catch(err) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getProjectByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const projects = await prisma.project.findMany({where: {title: title}});
        res.status(200).send(projects);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}