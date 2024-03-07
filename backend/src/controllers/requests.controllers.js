import prisma from "../config/prisma.client.js";
import { statusEnum, rolesEnum } from "../config/tags.js";

// Main controllers

export const getRequests = async (req, res) => {
    try {
        //console.log("request.controllers -> request -> ",req.role);
        // Si es USER o CREATOR, solo puede ver sus propias requests
        if (req.role === rolesEnum.USER || req.role === rolesEnum.CREATOR) {
            const requests = await prisma.request.findMany({
                where: { requesterId: req.userId },
            });
            if (!requests)
                return res.status(404).json({ message: "No requests found" });
            return res.status(200).json(requests);
            // Si es ADMIN, puede ver todas las requests
        } else if (req.role === rolesEnum.ADMIN) {
            console.log("ADMIN");
            const requests = await prisma.request.findMany({
                where: {
                    requester: {
                        fullName: { not: null },
                    },
                },
                include: {
                    requester: {
                        select: {
                            fullName: true,
                        },
                    },
                },
            });
            if (!requests)
                return res.status(404).json({ message: "No requests found" });
            return res.status(200).json(requests);
        } else {
            return res.status(403).json({ message: "You are not allowed." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Probablmenete acabe borrado ya que no se use
export const getRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await prisma.request.findUnique({ where: { id: id } });
        if (!request)
            return res.status(404).json({ message: "Request not found" });

        return res.status(200).json(request);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const updateRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRequest = await prisma.request.update({
            where: { id: id },
            data: req.body,
        });
        if (!updatedRequest)
            res.status(404).json({ message: "Request not found" });

        return res.status(200).json(updatedRequest);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Utility controllers

export const getRequestsByStatus = async (req, res) => {
    try {

        //console.log("STATE EN GETREUQESTSBYSTATUS:", req.params.status, req.role)

         // En caso de ser USER o CREATOR, solo puede ver sus propias requests
        if (req.role === rolesEnum.USER || req.role === rolesEnum.CREATOR) {
            const requests = await prisma.request.findMany({
                where: { requesterId: req.userId, status: req.params.status },
            });
            if (!requests)
                return res.status(404).json({ message: "No requests found" });
            return res.status(200).json(requests);

            // En caso de ser ADMIN, puede ver todas las requests
            // TODO Cuando los usuarios estén bien creados volver a implementar el requester
        } else if (req.role === rolesEnum.ADMIN) {
            const requests = await prisma.request.findMany({
                where: {
                    status : req.params.status,
    
                }
            });
            if (!requests)
                return res.status(404).json({ message: "No requests found" });

            return res.status(200).json(requests);
        } else {
            return res.status(403).json({ message: "You are not allowed." });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const acceptRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const acceptedRequest = await prisma.request.update({
            where: { id: id },
            data: { status: statusEnum.ACCEPTED },
        });

        if (!acceptedRequest)
            res.status(404).json({ message: "Request not found" });
        const acceptedProject = await prisma.project.update({
            where: { id: acceptedRequest.projectId },
            data: { status: statusEnum.ACCEPTED },
        });
        
        if (!acceptedProject)
            res.status(404).json({ message: "Project not found" });

        return res.status(200).json(acceptedRequest);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const rejectRequest = async (req, res) => {
    try {
        const { id } = req.params;

        //console.log(id)

        const rejectedRequest = await prisma.request.update({
            where: { id: id },
            data: { status: statusEnum.REJECTED },
        });

        if (!rejectedRequest)
            res.status(404).json({ message: "Request not found" });

        //console.log(rejectedRequest)

        await prisma.project.update({
            where: { id: rejectedRequest.projectId },
            data: { status: statusEnum.REJECTED },
        });


        return res.status(200).json(rejectedRequest);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
