import prisma from '../config/prisma.client.js';

// Main controllers

export const getDepartments = async (req, res) => {
    try {
        const departments = await prisma.department.findMany();
        res.status(200).send(departments);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await prisma.department.findUnique({where: {id: id}});
        res.status(200).send(department);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const createDepartment = async (req, res) => {
    try {
        const newDepartment = await prisma.department.create({data: req.body});
        res.status(200).send(newDepartment);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDepartment = await prisma.department.update({where: {id: id}, data: req.body});
        res.status(200).send(updatedDepartment);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDepartment = await prisma.department.delete({where: {id: id}});
        res.status(200).send(deletedDepartment);
    } catch(error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}