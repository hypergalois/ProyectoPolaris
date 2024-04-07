import React from "react";
import { useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";


function NotificationCard({ notification }) {
    const { deleteNotificationData } = useNotifications();

    return (
        <>
            <Card 
                sx={{ maxWidth: 545, minHeight: "200px", position: "relative" }}
            >
                <CardContent sx={{ justifyContent: "flex-end" }}>
                    <Typography level="h3" textColor="#000" sx={{ mb: 1, fontWeight: "bold" }}>
                        {notification.content}
                    </Typography>

                    {/* Ajuste para que los botones ocupen toda una línea, pero llenándola completamente. */}
                    <div className="flex w-full">
                        <Button onClick={(event) => {event.stopPropagation(); deleteNotificationData(notification.id);}} variant="solid" color="danger" sx={{ flex: 1, borderRadius: "8px", ml: 0.5, fontWeight: "bold" }}>
                            Borrar
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default NotificationCard;