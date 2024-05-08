import { Router } from "express";
import { getNotificationsByUser, createNotificationRequest, deleteNotification } from "../controllers/notifications.controllers.js";

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Operations related to notifications
 */

const router = Router();

// https://proyectopolaris.postman.co/workspace/My-Workspace~7ad015f7-88f4-4d09-8a04-281788145a86/collection/32885947-70e5a8d9-b3c4-43ea-8d3c-5e7e24c3ef2c?action=share&creator=26303495

// Main routes

router.get("/notifications/:userId", getNotificationsByUser);

router.post("notifications/request", createNotificationRequest);

router.delete("/notifications/:id", deleteNotification);
