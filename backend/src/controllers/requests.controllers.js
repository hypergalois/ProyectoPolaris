import prisma from "../config/prisma.client.js";
import { statusEnum, rolesEnum } from "../config/tags.js";

// Main controllers

export const getRequests = async (req, res) => {
	try {
		console.log(req.role);
		if (req.role === rolesEnum.USER || req.role === rolesEnum.CREATOR) {
			const requests = await prisma.request.findMany({
				where: { requesterId: req.userId },
			});
			if (!requests) return res.status(404).json({ message: "No requests found" });
			return res.status(200).json(requests);

		} else if (req.role === rolesEnum.ADMIN) {
			console.log("ADMIN");
			const requests = await prisma.request.findMany();
			if (!requests) return res.status(404).json({ message: "No requests found" });
			return res.status(200).json(requests);
		} else {
			return res.status(403).json({ message: "You are not allowed." });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Error getting requests" });
	}
};

// Probablmenete acabe borrado ya que no se use
export const getRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const request = await prisma.request.findUnique({ where: { id: id } });
		if (!request) return res.status(404).json({ message: "Request not found" });

		return res.status(200).json(request);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Error getting request" });
	}
};

// Probablmenete acabe borrado ya que no se use
export const updateRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedRequest = await prisma.request.update({
			where: { id: id },
			data: req.body,
		});
		if (!updatedRequest) res.status(404).json({ message: "Request not found" });

		return res.status(200).json(updatedRequest);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Error updating request" });
	}
};

// Utility controllers

export const getRequestsByStatus = async (req, res) => {
	try {
		if (req.role === rolesEnum.USER || req.role === rolesEnum.CREATOR) {
			const requests = await prisma.request.findMany({
				where: { requesterId: req.userId, status: req.params.status },
			});
			if (!requests) return res.status(404).json({ message: "No requests found" });
			return res.status(200).json(requests);
		} else if (req.role === rolesEnum.ADMIN) {
			const requests = await prisma.request.findMany({
				where: { status: req.params.status },
			});
			if (!requests) return res.status(404).json({ message: "No requests found" });
			return res.status(200).json(requests);
		} else {
			return res.status(403).json({ message: "You are not allowed." });
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Error getting requests" });
	}
};

export const acceptRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const acceptedRequest = await prisma.request.update({
			where: { id: id },
			data: { status: statusEnum.ACCEPTED },
		});
		if (!acceptedRequest) res.status(404).json({ message: "Request not found" });
		await prisma.project.update({
			where: { id: acceptedRequest.projectId },
			data: { status: statusEnum.ACCEPTED },
		});
		return res.status(200).json(acceptedRequest);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Error accepting request" });
	}
};

export const rejectRequest = async (req, res) => {
	try {
		const { id } = req.params;
		const rejectedRequest = await prisma.request.update({
			where: { id: id },
			data: { status: statusEnum.REJECTED },
		});
		if (!rejectedRequest) res.status(404).json({ message: "Request not found" });
		await prisma.project.update({
			where: { id: acceptedRequest.projectId },
			data: { status: statusEnum.REJECTED },
		});
		return res.status(200).json(rejectedRequest);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Error rejecting request" });
	}
};
