import prisma from '../config/prisma.client.js';

// Main controllers

export const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        if (!projects) return res.status(404).send({ message: "No projects found" });

        return res.status(200).send(projects);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

// Si un usuario crea un proyecto, se crea una request
// Si lo hace un admin no se crea una request
export const createProject = async (req, res) => {

    console.log(req.role);
    console.log(req.body);

    try {
        const files = req.files ? req.files.map(file => process.env.PUBLIC_URL + file.destination + file.filename) : []
        console.log(files);

        const { id } = await prisma.area.findFirst({ where: { name: req.body.name }, select: { id: true } });
        console.log(id);
        if (!id) return res.status(404).send({ message: "Department not found" });

        // TODO: No me gusta esto de borrar, prefiero especificar los campos que quiero
        delete req.body.departmentName;

        if (req.role === "USER" || "CREATOR") {
            const newProject = await prisma.project.create({ data: { ...req.body, uploadedContent: files, departmentId: id } });
            if (!newProject) return res.status(404).send({ message: "Project not created" });

            const newRequest = await prisma.request.create({
                data: {
                    projectId: newProject.id,
                    requesterId: req.userId,
                    projectTitle: newProject.title,
                    description: newProject.description,
                    academicCourse: newProject.academicCourse
                }
            });
            if (!newRequest) return res.status(404).send({ message: "Request not created" });

            return res.status(200).send(newProject);

        } else if (req.role === "ADMIN") {
            // TODO Poner status en ACCEPTED
            const newProject = await prisma.project.create({ data: { ...req.body, uploadedContent: files, departmentId: id, status: "ACCEPTED" } });
            if (!newProject) return res.status(404).send({ message: "Project not created" });

            return res.status(200).send(newProject);

        } else {
            return res.status(403).send({ message: "You are not allowed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await prisma.project.findUnique({ where: { id: id } });
        if (!project) return res.status(404).send({ message: "Project not found" });

        return res.status(200).send(project);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const updateProject = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.role === "USER" || "CREATOR") {
            // Si un proyecto se actualiza, se cambia su estado a "PENDING" y se crea una request
            const updatedProject = await prisma.project.update({ where: { id: id }, data: { ...req.body, state: "PENDING" } });

            await prisma.request.create({
                data: {
                    projectId: updatedProject.id,
                    requesterId: req.userId,
                    projectTitle: updatedProject.title,
                    description: updatedProject.description,
                    academicCourse: updatedProject.academicCourse
                }
            });

            return res.status(200).send(updatedProject);
        } else if (req.role === "ADMIN") {
            // Si es admin no se crea una request ni se cambia el estado
            // Si un proyecto se actualiza, se cambia su estado a "PENDING" y se crea una request
            const updatedProject = await prisma.project.update({ where: { id: id }, data: { ...req.body } });

            return res.status(200).send(updatedProject);
        } else {
            return res.status(403).send({ message: "You are not allowed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

// Solo admin puede borrar proyectos
export const deleteProject = async (req, res) => {
    if (req.role === "ADMIN") {
        try {
            const { id } = req.params;
            const deletedProject = await prisma.project.delete({ where: { id: id } });
            return res.status(200).send(deletedProject);
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error.message });
        }
    } else {
        return res.status(403).send({ message: "You are not allowed" });
    }
}

// Controllers for searching projects

export const getProjectByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const projects = await prisma.project.findMany({ where: { impliedStudentsIDs: userId } });
        return res.status(200).send(projects);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getProjectByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const projects = await prisma.project.findMany({ where: { category: category } });
        return res.status(200).send(projects);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getProjectByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const projects = await prisma.project.findMany({ where: { status: status } });
        return res.status(200).send(projects);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getProjectByDate = async (req, res) => {
    try {
        const { date } = req.params;
        const projects = await prisma.project.findMany({ where: { date: date } });
        return res.status(200).send(projects);
    } catch (err) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

export const getProjectByTitle = async (req, res) => {
    try {
        const { title } = req.params;
        const projects = await prisma.project.findMany({ where: { title: title } });
        return res.status(200).send(projects);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}