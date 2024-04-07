import { axiosInstance } from "./axios";

export const getNotificationsByUser = (userId) => {
    return axiosInstance.get(`/notifications/${userId}`);
};

export const createNotificationRequest = (content, userId, projectId, requestId) => {
    return axiosInstance.post('/notifications/request', {
        content,
        userId,
        projectId,
        requestId
    });
};

export const deleteNotification = (id) => {
    return axiosInstance.delete(`/notifications/${id}`);
};