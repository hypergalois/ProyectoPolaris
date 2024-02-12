import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Main controllers

export const getDepartments = async (req, res) => {
    try{
        const departments = await prisma.department.findMany();
        res.send(departments);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting departments" });
    }
}

export const getDepartment = async (req, res) => {
    try{
        const { id } = req.params;
        const department = await prisma.department.findUnique({where: {id: id}});
        res.send(department);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error getting department" });
    }
}

export const createDepartment = async (req, res) => {
    try{
        const newDepartment = await prisma.department.create({data: req.body});
        res.send(newDepartment);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error creating department" });
    }
}

export const updateDepartment = async (req, res) => {
    try{
        const { id } = req.params;
        const updatedDepartment = await prisma.department.update({where: {id: id}, data: req.body});
        res.send(updatedDepartment);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error updating department" });
    }
}

export const deleteDepartment = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedDepartment = await prisma.department.delete({where: {id: id}});
        res.send(deletedDepartment);
    } catch(err){
        console.log(err);
        res.status(500).send({ message: "Error deleting department" });
    }
}