import prisma from '../config/prisma.client.js';
import { status } from '../config/tags.js';

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

// Utility controllers

export const acceptRequest = async (req, res) => {
    try{
        const { id } = req.params;
        console.log(status.ACCEPTED);
        const acceptedRequest = await prisma.request.update({where: {id: id}, data: {status: status.ACCEPTED}});
        await prisma.project.update({where: {id: acceptedRequest.projectId}, data: {status: status.ACCEPTED}});
        res.send(acceptedRequest);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error accepting request" });
    }
}

export const rejectRequest = async (req, res) => {
    try{
        const { id } = req.params;
        const rejectedRequest = await prisma.request.update({where: {id: id}, data: {status: status.REJECTED}});
        await prisma.project.update({where: {id: acceptedRequest.projectId}, data: {status: status.REJECTED}});
        res.send(rejectedRequest);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error rejecting request" });
    }
}