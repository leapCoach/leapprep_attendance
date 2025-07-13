export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          first_name: string;
          last_name: string;
          phone: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          phone?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      checkin: {
        Row: {
          id: string;
          user_id: string;
          day: string;
          checkin_time: string;
          notification_status: "not_sent" | "sent" | "failed";
        };
        Insert: {
          id?: string;
          user_id: string;
          day?: string;
          checkin_time?: string;
          notification_status?: "not_sent" | "sent" | "failed";
        };
        Update: {
          id?: string;
          user_id?: string;
          day?: string;
          checkin_time?: string;
          notification_status?: "not_sent" | "sent" | "failed";
        };
      };
      checkout: {
        Row: {
          id: string;
          user_id: string;
          day: string;
          checkout_time: string;
          notification_status: "not_sent" | "sent" | "failed";
        };
        Insert: {
          id?: string;
          user_id: string;
          day?: string;
          checkout_time?: string;
          notification_status?: "not_sent" | "sent" | "failed";
        };
        Update: {
          id?: string;
          user_id?: string;
          day?: string;
          checkout_time?: string;
          notification_status?: "not_sent" | "sent" | "failed";
        };
      };
    };
  };
}

export type User = Database["public"]["Tables"]["users"]["Row"];
export type CheckIn = Database["public"]["Tables"]["checkin"]["Row"];
export type CheckOut = Database["public"]["Tables"]["checkout"]["Row"];
export type NotificationStatus = "not_sent" | "sent" | "failed";

export interface AttendanceRecord {
  id: string;
  user_id: string;
  day: string;
  time: string;
  notification_status: NotificationStatus;
  user: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
  };
  type: "checkin" | "checkout";
}
