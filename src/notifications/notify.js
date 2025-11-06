import React, { useEffect } from "react";
import { messaging } from "./firebase";
import { getToken, onMessage } from "firebase/messaging";
import useApi from "../useApi";

const Notify = () => {
  const { send_fcm_token } = useApi();

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      try {
        const token = await getToken(messaging, {
          vapidKey: "BIxGVYdKdPfffD0mNtFXN2Se-7QYuWFteLQS5W7kvoTF85xwxBzqZQ9UDkSI2gOecrNKig0S5cYhG2k9I-G5_gU",
        });
        console.log("Generated Token:", token);

        // Send the token to the Django backend
        await send_fcm_token(token);
      } catch (error) {
        console.error("Error generating token:", error);
      }
    } else if (permission === "denied") {
      alert("You denied the notification permission.");
    }
  };

  useEffect(() => {
    // Request notification permission
    requestPermission();

    // Handle foreground notifications
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground Notification Received:", payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.icon,
      });
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return <div>blah blah</div>;
};

export default Notify;
