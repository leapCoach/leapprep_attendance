import { NotificationPayload } from "@/src/types/notification";

export const generateEmailTemplate = (payload: NotificationPayload): string => {
  const { type, timestamp, userName } = payload;
  const action = type === "checkin" ? "checked in" : "checked out";

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Attendance Notification</h2>
      <p>Hello,</p>
      <p><strong>${userName}</strong> has ${action} at <strong>${timestamp}</strong>.</p>
      <hr style="border: none; height: 1px; background-color: #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message from the Attendance Tracking System.
      </p>
    </div>
  `;
};

export const generateSMSTemplate = (payload: NotificationPayload): string => {
  const { type, timestamp, userName } = payload;
  const action = type === "checkin" ? "checked in" : "checked out";

  return `Attendance Alert: ${userName} has ${action} at ${timestamp}.`;
};

export const getNotificationSubject = (
  type: "checkin" | "checkout"
): string => {
  return type === "checkin"
    ? "Employee Check-In Notification"
    : "Employee Check-Out Notification";
};
