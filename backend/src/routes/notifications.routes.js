import { Router } from "express";
import { getNotificationsByUser, createNotificationRequest, deleteNotification } from "../controllers/notifications.controllers.js";

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Operations related to notifications
 */

const router = Router();

// Main routes

router.get("/notifications/:userId", getNotificationsByUser);

router.post('notifications/request', createNotificationRequest);

router.delete("/notifications/:id", deleteNotification);