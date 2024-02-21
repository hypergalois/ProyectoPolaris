import prisma from "../config/prisma.client.js";

// Main controllers

export const getAreas = async (req, res) => {
	try {
		const areas = await prisma.area.findMany();
		console.log(areas);
		if (!areas) return res.status(404).json({ message: "Areas not found" });

		return res.status(200).json(areas);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getArea = async (req, res) => {
	try {
		const { id } = req.params;
		const area = await prisma.area.findUnique({ where: { id: id } });
		if (!area) return res.status(404).json({ message: "Area not found" });

		return res.status(200).json(area);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const createArea = async (req, res) => {
	try {
		const newArea = await prisma.area.create({ data: req.body });

		return res.status(200).json(newArea);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateArea = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedArea = await prisma.area.update({
			where: { id: id },
			data: req.body,
		});

		return res.status(200).json(updatedArea);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const deleteArea = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedArea = await prisma.area.delete({ where: { id: id } });
		if (!deletedArea) res.status(404).json({ message: "Area not found" });
		return res.status(200).json(deletedArea);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};
