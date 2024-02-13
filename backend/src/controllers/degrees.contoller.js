import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Main controllers

export const getDegrees = async (req, res) => {
    try {
        const degrees = await prisma.degree.findMany();
        res.status(200).send(degrees);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const createDegree = async (req, res) => {
    try {
        const newDegree = await prisma.degree.create({data: {...req.body}});
        res.status(200).send(newDegree);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getDegree = async (req, res) => {
    try {
        const { id } = req.params;
        const degree = await prisma.degree.findUnique({where: {id: id}});
        res.status(200).send(degree);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const updateDegree = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDegree = await prisma.degree.update({where: {id: id}, data: req.body});
        res.status(200).send(updatedDegree);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const deleteDegree = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDegree = await prisma.degree.delete({where: {id: id}});
        res.status(200).send(deletedDegree);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}