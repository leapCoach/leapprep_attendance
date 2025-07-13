import {
  NotificationResult,
  NotificationPayload,
} from "@/src/types/notification";
import { generateSMSTemplate } from "./notificationHelpers";

const TWILIO_ACCOUNT_SID = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;

export class TwilioClient {
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;
  private baseURL: string;

  constructor(accountSid: string, authToken: string, fromNumber: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.fromNumber = fromNumber;
    this.baseURL = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}`;
  }

  async sendSMS(payload: NotificationPayload): Promise<NotificationResult> {
    try {
      const message = generateSMSTemplate(payload);
      const auth = btoa(`${this.accountSid}:${this.authToken}`);

      const response = await fetch(`${this.baseURL}/Messages.json`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: this.fromNumber,
          To: payload.userPhone,
          Body: message,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return {
          success: false,
          error: `Twilio API error: ${error}`,
        };
      }

      const result = await response.json();
      return {
        success: true,
        messageId: result.sid,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export const twilioClient =
  TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER
    ? new TwilioClient(
        TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN,
        TWILIO_PHONE_NUMBER
      )
    : null;
