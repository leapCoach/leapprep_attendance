import { NotificationPayload } from "@/src/types/notification";

export const generateEmailTemplate = (payload: NotificationPayload): string => {
  const { type, timestamp, userName } = payload;
  const action = type === "checkin" ? "checked in" : "checked out";

  return `
  <div style="
    font-family: 'Open Sans', Arial, sans-serif;
    max-width:600px;
    margin:0 auto;
    border:1px solid #eee;
    border-radius:8px;
    overflow:hidden;
  ">
    <div style="background-color:#1E365E; padding:20px; text-align:center;">
      <img src="/LeapPrepLogo.png"
           alt="Leap Prep Logo"
           style="max-height:60px;" />
    </div>
    <div style="background:#fff; padding:20px;">
      <h2 style="color:#F69139; margin-top:0;">Attendance Notification</h2>
      <p>Hello,</p>
      <p><strong style="color:#1E365E;">${userName}</strong> has ${action} at <strong>${timestamp}</strong>.</p>
      <hr style="border:none; height:1px; background-color:#eee; margin:20px 0;">
      <p style="color:#58595B; font-size:13px;">
        This is an automated message from the Leap Prep Attendance Tracking System.
      </p>
    </div>
  </div>
  `;
};

export const generateSMSTemplate = (payload: NotificationPayload): string => {
  const { type, timestamp, userName } = payload;
  const action = type === "checkin" ? "checked in ✅" : "checked out ❌";
  return `Leap Prep Alert: ${userName} has ${action} at ${timestamp}.`;
};

export const getNotificationSubject = (type: "checkin" | "checkout"): string =>
  type === "checkin"
    ? "🎉 Leap Prep Check‑In Notification"
    : "🚪 Leap Prep Check‑Out Notification";
