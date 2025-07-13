"use client";

import { useState } from "react";
import { NotificationPayload } from "@/src/types/notification";
import { useBrevo } from "./useBrevo";
import { useTwilio } from "./useTwilio";
import { useNotificationConfig } from "@/src/contexts/NotificationContext";
import { useAttendance } from "@/src/contexts/AttendanceContext";
import { formatDateTime } from "@/src/utils/dateHelpers";

export function useNotification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const brevo = useBrevo();
  const twilio = useTwilio();
  const { config } = useNotificationConfig();
  const { updateNotificationStatus } = useAttendance();

  const sendNotification = async (
    userId: string,
    type: "checkin" | "checkout",
    userName: string,
    userEmail: string,
    userPhone: string,
    recordId: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    setError(null);

    // Update status to sending
    await updateNotificationStatus(type, recordId, "not_sent");

    const payload: NotificationPayload = {
      userId,
      type,
      timestamp: formatDateTime(new Date()),
      userName,
      userEmail,
      userPhone,
      recordId, // Ensure recordId is included in the payload
    };

    try {
      let emailSuccess = true;
      let smsSuccess = true;
      let errors: string[] = [];

      // Send email if enabled
      if (config.emailEnabled) {
        const emailResult = await brevo.sendEmail(payload);
        emailSuccess = emailResult.success;
        if (!emailResult.success && emailResult.error) {
          errors.push(`Email: ${emailResult.error}`);
        }
      }

      // Send SMS if enabled
      if (config.smsEnabled) {
        const smsResult = await twilio.sendSMS(payload);
        smsSuccess = smsResult.success;
        if (!smsResult.success && smsResult.error) {
          errors.push(`SMS: ${smsResult.error}`);
        }
      }

      const overallSuccess =
        (config.emailEnabled ? emailSuccess : true) &&
        (config.smsEnabled ? smsSuccess : true);

      // Update notification status
      await updateNotificationStatus(
        type,
        recordId,
        overallSuccess ? "sent" : "failed"
      );

      if (overallSuccess) {
        setLoading(false);
        return { success: true };
      } else {
        const errorMessage =
          errors.length > 0 ? errors.join(", ") : "Notification failed";
        setError(errorMessage);
        setLoading(false);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      setLoading(false);

      // Update status to failed
      await updateNotificationStatus(type, recordId, "failed");

      return { success: false, error: errorMessage };
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    brevo.reset();
    twilio.reset();
  };

  return {
    loading,
    error,
    sendNotification,
    reset,
    emailStatus: brevo.status,
    smsStatus: twilio.status,
  };
}
