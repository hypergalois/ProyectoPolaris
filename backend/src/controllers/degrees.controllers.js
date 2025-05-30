import prisma from "../config/prisma.client.js";

// Main controllers

export const getDegrees = async (req, res) => {
	try {
		const degrees = await prisma.degree.findMany();
		if (!degrees) return res.status(404).json({ message: "No degrees found" });

		return res.status(200).json(degrees);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const createDegree = async (req, res) => {
	try {
		const newDegree = await prisma.degree.create({ data: { ...req.body } });
		if (!newDegree) return res.status(404).json({ message: "Degree not created" });

		return res.status(200).json(newDegree);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getDegree = async (req, res) => {
	try {
		const { id } = req.params;
		const degree = await prisma.degree.findUnique({ where: { id: id } });
		if (!degree) return res.status(404).json({ message: "Degree not found" });

		return res.status(200).json(degree);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const updateDegree = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(req.params);
		const updatedDegree = await prisma.degree.update({
			where: { id: id },
			data: req.body,
		});

		return res.status(200).json(updatedDegree);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const deleteDegree = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedDegree = await prisma.degree.delete({ where: { id: id } });

		return res.status(200).json(deletedDegree);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

// Utility controllers

export const getDegreesNames = async (req, res) => {
	try {
		const degrees = await prisma.degree.findMany({
			select: { id: true, name: true },
		});
		if (!degrees) return res.status(404).json({ message: "No degrees found" });

		return res.status(200).json(degrees);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getDegreesByArea = async (req, res) => {
	try {
		const { id } = req.params;
		const degrees = await prisma.degree.findMany({
			where: { areasId: { has: id } },
		});
		if (!degrees) return res.status(404).json({ message: "No degrees found" });

		return res.status(200).json(degrees);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const getDegreesBySubject = async (req, res) => {
    try {
        const { id } = req.params;
        const degrees = await prisma.subject.findUnique({
            where: { id: id },
            select: { degrees: 
                { select: { id: true, name: true } }
            }
        });
        if (!degrees) return res.status(404).json({ message: "No degrees found" });
        return res.status(200).json(degrees);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}