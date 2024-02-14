import prisma from '../config/prisma.client.js';
import { status } from '../config/tags.js';

// Main controllers
// TODO. Esto me lo dejo para hacer mañana miercoles o jueves

// Solo van a tener request los admin, los user y creators solo pueden ver las que han hecho ellos
// Habria que hacer otro get, para respuestas de admin, y otro para respuestas de user y creator
// Otro get quizas para las aceptadas y las rechazadas y para las pendientes
export const getRequests = async (req, res) => {
    try{
        const requests = await prisma.request.findMany();
        if (!requests) return res.status(404).send({ message: "No requests found" });

        return res.send(requests);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error getting requests" });
    }
}

// De nuevo, aqui hay que mirar la logica
export const getRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const request = await prisma.request.findUnique({where: {id: id}});
        if (!request) return res.status(404).send({ message: "Request not found" });

        return res.send(request);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error getting request" });
    }
}

// En principio, no hace falta mas
export const createRequest = async (req, res) => {
    try{
        const newRequest = await prisma.request.create({data: req.body});
        return res.send(newRequest);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error creating request" });
    }
}

// Solo ADMINS
export const updateRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedRequest = await prisma.request.update({where: {id: id}, data: req.body});
        return res.send(updatedRequest);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error updating request" });
    }
}

// Solo ADMINS???
export const deleteRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedRequest = await prisma.request.delete({where: {id: id}});
        return res.send(deletedRequest);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error deleting request" });
    }
}

// Utility controllers SOLO ADMINS 

export const acceptRequest = async (req, res) => {
    try{
        const { id } = req.params;
        console.log(status.ACCEPTED);
        const acceptedRequest = await prisma.request.update({where: {id: id}, data: {status: status.ACCEPTED}});
        await prisma.project.update({where: {id: acceptedRequest.projectId}, data: {status: status.ACCEPTED}});
        return res.send(acceptedRequest);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error accepting request" });
    }
}

export const rejectRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const rejectedRequest = await prisma.request.update({where: {id: id}, data: {status: status.REJECTED}});
        await prisma.project.update({where: {id: acceptedRequest.projectId}, data: {status: status.REJECTED}});
        return res.send(rejectedRequest);
    } catch(err){
        console.log(err);
        return res.status(500).send({ message: "Error rejecting request" });
    }
}