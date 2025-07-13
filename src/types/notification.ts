export interface NotificationConfig {
  autoNotification: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
}

export interface NotificationResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export interface NotificationPayload {
  userId: string;
  type: "checkin" | "checkout";
  timestamp: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  recordId: string;
}

export interface NotificationHookState {
  loading: boolean;
  error: string | null;
  status: "idle" | "sending" | "success" | "error";
}
