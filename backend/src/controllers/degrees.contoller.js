import prisma from '../config/prisma.client.js';

// Main controllers

export const getDegrees = async (req, res) => {
    try{
        const degrees = await prisma.degree.findMany();
        res.send(degrees);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting degrees" });
    }
}

export const createDegree = async (req, res) => {
    try{
        const newDegree = await prisma.degree.create({data: {...req.body}});
        res.send(newDegree);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error creating degree" });
    }
}

export const getDegree = async (req, res) => {
    try{
        const { id } = req.params;
        const degree = await prisma.degree.findUnique({where: {id: id}});
        res.send(degree);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting degree" });
    }
}

export const updateDegree = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedDegree = await prisma.degree.update({where: {id: id}, data: req.body});
        res.send(updatedDegree);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error updating degree" });
    }
}

export const deleteDegree = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedDegree = await prisma.degree.delete({where: {id: id}});
        res.send(deletedDegree);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error deleting degree" });
    }
}