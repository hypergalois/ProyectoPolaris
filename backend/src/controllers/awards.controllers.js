import prisma from "../config/prisma.client.js";

export const getAwards = async (req, res) => {
    try {
        const awards = await prisma.award.findMany();
        res.status(200).json(awards);
    } catch (error) {
        res.status(404).json({ message: "Awards not found" });
    }
};
