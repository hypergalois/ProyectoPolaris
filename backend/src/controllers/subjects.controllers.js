import prisma from "../config/prisma.client.js";

export const getSubjects = async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany();
        if (!subjects) return res.status(404).json({ message: "No subjects found" });
        return res.status(200).json(subjects);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const getSubjectsByDegree = async (req, res) => {
    try {
        const { degreeId } = req.params;
        const subjects = await prisma.subject.findMany({
            where: { degreeId: parseInt(degreeId) },
        });
        if (!subjects) return res.status(404).json({ message: "No subjects found" });
        return res.status(200).json(subjects);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}