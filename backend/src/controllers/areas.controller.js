import prisma from '../config/prisma.client.js';

// Main controllers

export const getAreas = async (req, res) => {
    try {
        const areas = await prisma.area.findMany();
        res.status(200).send(areas);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getArea = async (req, res) => {
    try {
        const { id } = req.params;
        const area = await prisma.area.findUnique({where: {id: id}});
        res.status(200).send(area);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const createArea = async (req, res) => {
    try {
        const newArea = await prisma.area.create({data: req.body});
        res.status(200).send(newArea);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const updateArea = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedArea = await prisma.area.update({where: {id: id}, data: req.body});
        res.status(200).send(updatedArea);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const deleteArea = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArea = await prisma.area.delete({where: {id: id}});
        res.status(200).send(deletedArea);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}