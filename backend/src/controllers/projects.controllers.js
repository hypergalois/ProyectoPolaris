import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// TODO
// Por favor, la validación tiene que ir aparte del controlador
// Se hace en middlewares, controller solo debe recibir los datos ya validados
export const getProjects = async (req, res) => {
    try{
        //const projects = await prisma.project.findMany();
        res.send({ message: "Get projects" });
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting projects" });
    }
}

export const createProject = async (req, res) => {
    try{
        // const { title, description, category, status, user_id } = matchedData(req);
        const newProject = await prisma.project.create({
            data: {
                title,
                description,
                subject,
                status
            }
        });
        res.send(newProject);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error creating project" });
    }
}

export const getProject = async (req, res) => {}

export const updateProject = async (req, res) => {}

export const deleteProject = async (req, res) => {}

// Controllers for searching projects

export const getProjectByUser = async (req, res) => {}

export const getProjectByCategory = async (req, res) => {}

export const getProjectByStatus = async (req, res) => {}

export const getProjectByDate = async (req, res) => {}

export const getProjectByTitle = async (req, res) => {}

