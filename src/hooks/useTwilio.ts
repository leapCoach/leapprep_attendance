"use client";

import { useState } from "react";
import {
  NotificationHookState,
  NotificationPayload,
  NotificationResult,
} from "@/src/types/notification";
import { twilioClient } from "@/src/utils/twilioClient";

export function useTwilio() {
  const [state, setState] = useState<NotificationHookState>({
    loading: false,
    error: null,
    status: "idle",
  });

  const sendSMS = async (
    payload: NotificationPayload
  ): Promise<NotificationResult> => {
    if (!twilioClient) {
      const error = "Twilio client not configured";
      setState({ loading: false, error, status: "error" });
      return { success: false, error };
    }

    setState({ loading: true, error: null, status: "sending" });

    try {
      const result = await twilioClient.sendSMS(payload);

      if (result.success) {
        setState({ loading: false, error: null, status: "success" });
      } else {
        setState({
          loading: false,
          error: result.error || "SMS failed",
          status: "error",
        });
      }

      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setState({ loading: false, error: errorMessage, status: "error" });
      return { success: false, error: errorMessage };
    }
  };

  const reset = () => {
    setState({ loading: false, error: null, status: "idle" });
  };

  return {
    ...state,
    sendSMS,
    reset,
  };
}
