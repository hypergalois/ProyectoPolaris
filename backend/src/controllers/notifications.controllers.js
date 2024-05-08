import prisma from "../config/prisma.client.js";

export const getNotificationsByUser = async (req, res) => {
	const { userId } = req.params;
	try {
		const notifications = await prisma.notification.findMany({
			where: {
				userId: userId,
			},
		});

		if (!notifications) {
			return res.status(404).json({ message: "No notifications found for this user." });
		}

		res.status(200).json(notifications);
	} catch (error) {
		res.status(500).json({ error: "Could not retrieve notifications" });
	}
};

export const createNotificationRequest = async (req, res) => {
	// console.log(req.body);

	try {
		const notification = await prisma.notification.create({
			data: req.body,
		});

		if (!notification) {
			return res.status(404).json({ message: "No notifications found for this user." });
		}

		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ error: "Could not create notification" });
	}
};

export const deleteNotification = async (req, res) => {
	const { id } = req.params;
	try {
		const notification = await prisma.notification.delete({
			where: {
				id: id,
			},
		});

		if (!notification) {
			return res.status(404).json({ message: "Notification not found" });
		}

		res.status(200).json(notification);
	} catch (error) {
		res.status(500).json({ error: "Could not delete notification" });
	}
};
