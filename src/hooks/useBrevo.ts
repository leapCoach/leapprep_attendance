"use client";

import { useState } from "react";
import {
  NotificationHookState,
  NotificationPayload,
  NotificationResult,
} from "@/src/types/notification";
// import { brevoClient } from "@/src/utils/brevoClient"; // No longer needed

export function useBrevo() {
  const [state, setState] = useState<NotificationHookState>({
    loading: false,
    error: null,
    status: "idle",
  });

  const sendEmail = async (
    payload: NotificationPayload
  ): Promise<NotificationResult> => {
    // if (!brevoClient) { // No longer needed
    //   const error = "Brevo client not configured";
    //   setState({ loading: false, error, status: "error" });
    //   return { success: false, error };
    // }

    setState({ loading: true, error: null, status: "sending" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setState({
          loading: false,
          error: `API route error: ${errorData.error || response.statusText}`,
          status: "error",
        });
        return {
          success: false,
          error: `API route error: ${errorData.error || response.statusText}`,
        };
      }

      const result = await response.json();
      setState({ loading: false, error: null, status: "success" });
      return {
        success: true,
        messageId: result.messageId,
      };
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
    sendEmail,
    reset,
  };
}
