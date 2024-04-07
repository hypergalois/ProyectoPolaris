import { createContext, useContext, useState, useEffect } from "react";
import { getNotificationsByUser, createNotificationRequest, deleteNotification } from "../api/notifications";
import { useAuth } from "./AuthContext";

const NotificationsContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (!context) {
        throw new Error("useNotifications must be used within an NotificationsProvider");
    }
    return context;
};

export const NotificationsProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const { user } = useAuth();

    const getNotificationsData = async () => {
        try {
            const res = await getNotificationsByUser(user.id);
            setNotifications(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createNotification = async (content, projectId, requestId) => {
        try {
            await createNotificationRequest(content, user.id, projectId, requestId);
            getNotificationsData(); // Refresh notifications after creating a new one
        } catch (error) {
            console.log(error);
        }
    };

    const deleteNotificationData = async (id) => {
        try {
            await deleteNotification(id);
            getNotificationsData(); // Refresh notifications after deleting
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                createNotification,
                getNotificationsData,
                deleteNotificationData,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );

};