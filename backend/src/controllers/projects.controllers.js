import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Main controllers

export const getProjects = async (req, res) => {
    try{
        const projects = await prisma.project.findMany();
        res.send(projects);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}

export const createProject = async (req, res) => {
    try{
        const files = req.files ? req.files.map(file => process.env.PUBLIC_URL+file.destination+file.filename) : []
        console.log(files);
        const newProject = await prisma.project.create({data: {...req.body, uploadedContent: files}});
        res.send(newProject);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error creating project" });
    }
}

export const getProject = async (req, res) => {
    try{
        const { id } = req.params;
        const project = await prisma.project.findUnique({where: {id: id}});
        res.send(project);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting project" });
    }
}

export const updateProject = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedProject = await prisma.project.update({where: {id: id}, data: req.body});
        res.send(updatedProject);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error updating project" });
    }
}

export const deleteProject = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedProject = await prisma.project.delete({where: {id: id}});
        res.send(deletedProject);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error deleting project" });
    }
}

// Controllers for searching projects

export const getProjectByUser = async (req, res) => {
    try{
        const { userId } = req.params;
        const projects = await prisma.project.findMany({where: {impliedStudentsIDs: userId}});
        res.send(projects);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}

export const getProjectByCategory = async (req, res) => {
    try{
        const { category } = req.params;
        const projects = await prisma.project.findMany({where: {category: category}});
        res.send(projects);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}

export const getProjectByStatus = async (req, res) => {
    try{
        const { status } = req.params;
        const projects = await prisma.project.findMany({where: {status: status}});
        res.send(projects);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}

export const getProjectByDate = async (req, res) => {
    try{
        const { date } = req.params;
        const projects = await prisma.project.findMany({where: {date: date}});
        res.send(projects);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}

export const getProjectByTitle = async (req, res) => {
    try{
        const { title } = req.params;
        const projects = await prisma.project.findMany({where: {title: title}});
        res.send(projects);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}