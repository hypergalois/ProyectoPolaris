import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Main controllers

export const getRequests = async (req, res) => {
    try{
        const requests = await prisma.request.findMany();
        res.send(requests);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting requests" });
    }
}

export const getRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const request = await prisma.request.findUnique({where: {id: id}});
        res.send(request);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting request" });
    }
}

export const createRequest = async (req, res) => {
    try{
        const newRequest = await prisma.request.create({data: req.body});
        res.send(newRequest);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error creating request" });
    }
}

export const updateRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedRequest = await prisma.request.update({where: {id: id}, data: req.body});
        res.send(updatedRequest);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error updating request" });
    }
}

export const deleteRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedRequest = await prisma.request.delete({where: {id: id}});
        res.send(deletedRequest);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error deleting request" });
    }
}