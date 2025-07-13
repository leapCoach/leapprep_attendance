"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AttendanceRecord, CheckIn, CheckOut, User } from "@/src/types/db";
import supabase from "@/src/utils/supabaseClient";
import { useAuth } from "./AuthContext";
import { formatTime, getTodayString } from "@/src/utils/dateHelpers";

interface AttendanceContextType {
  checkins: AttendanceRecord[];
  checkouts: AttendanceRecord[];
  loading: boolean;
  error: string | null;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  checkIn: (userId?: string) => Promise<{ error?: string }>;
  checkOut: (userId?: string) => Promise<{ error?: string }>;
  refreshData: () => Promise<void>;
  updateNotificationStatus: (
    type: "checkin" | "checkout",
    id: string,
    status: "not_sent" | "sent" | "failed"
  ) => Promise<void>;
  getUserProfile: (userId: string) => Promise<User | null>;
  getUnnotifiedRecords: () => Promise<AttendanceRecord[]>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(
  undefined
);

export function AttendanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const [checkins, setCheckins] = useState<AttendanceRecord[]>([]);
  const [checkouts, setCheckouts] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(getTodayString());

  const fetchAttendanceData = useCallback(
    async (date: string) => {
      setLoading(true);
      setError(null);

      try {
        // Fetch checkins
        const { data: checkinData, error: checkinError } = await supabase
          .from("checkin")
          .select(
            `
          *,
          user:users(first_name, last_name, phone, email)
        `
          )
          .eq("day", date)
          .order("checkin_time", { ascending: false });

        if (checkinError) throw checkinError;

        // Fetch checkouts
        const { data: checkoutData, error: checkoutError } = await supabase
          .from("checkout")
          .select(
            `
          *,
          user:users(first_name, last_name, phone, email)
        `
          )
          .eq("day", date)
          .order("checkout_time", { ascending: false });

        if (checkoutError) throw checkoutError;

        // Transform data
        const transformedCheckins: AttendanceRecord[] = (checkinData || []).map(
          (item: any) => ({
            id: item.id,
            user_id: item.user_id,
            day: item.day,
            time: formatTime(item.checkin_time),
            notification_status: item.notification_status,
            user: {
              first_name: item.user.first_name,
              last_name: item.user.last_name,
              phone: item.user.phone,
              email: item.user.email,
            },
            type: "checkin",
          })
        );

        const transformedCheckouts: AttendanceRecord[] = (
          checkoutData || []
        ).map((item: any) => ({
          id: item.id,
          user_id: item.user_id,
          day: item.day,
          time: formatTime(item.checkout_time),
          notification_status: item.notification_status,
          user: {
            first_name: item.user.first_name,
            last_name: item.user.last_name,
            phone: item.user.phone,
            email: item.user.email,
          },
          type: "checkout",
        }));

        setCheckins(transformedCheckins);
        setCheckouts(transformedCheckouts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, setCheckins, setCheckouts]
  );

  const checkIn = async (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) {
      return { error: "No user specified" };
    }

    try {
      const { error } = await supabase.from("checkin").insert({
        user_id: targetUserId,
        day: selectedDate,
        checkin_time: new Date().toISOString(),
      });

      if (error) {
        return { error: error.message };
      }

      await refreshData();
      return {};
    } catch (error) {
      return { error: "An unexpected error occurred" };
    }
  };

  const checkOut = async (userId?: string) => {
    const targetUserId = userId || user?.id;
    if (!targetUserId) {
      return { error: "No user specified" };
    }

    try {
      const { error } = await supabase.from("checkout").insert({
        user_id: targetUserId,
        day: selectedDate,
        checkout_time: new Date().toISOString(),
      });

      if (error) {
        return { error: error.message };
      }

      await refreshData();
      return {};
    } catch (error) {
      return { error: "An unexpected error occurred" };
    }
  };

  const updateNotificationStatus = async (
    type: "checkin" | "checkout",
    id: string,
    status: "not_sent" | "sent" | "failed"
  ) => {
    try {
      const table = type === "checkin" ? "checkin" : "checkout";
      const { error } = await supabase
        .from(table)
        .update({ notification_status: status })
        .eq("id", id);

      if (error) {
        console.error("Error updating notification status:", error);
        return;
      }

      // Update local state
      if (type === "checkin") {
        setCheckins((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, notification_status: status } : item
          )
        );
      } else {
        setCheckouts((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, notification_status: status } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const refreshData = useCallback(async () => {
    await fetchAttendanceData(selectedDate);
  }, [fetchAttendanceData, selectedDate]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    const checkinSubscription = supabase
      .channel("checkin-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checkin" },
        () => refreshData()
      )
      .subscribe();

    const checkoutSubscription = supabase
      .channel("checkout-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checkout" },
        () => refreshData()
      )
      .subscribe();

    return () => {
      checkinSubscription.unsubscribe();
      checkoutSubscription.unsubscribe();
    };
  }, [user, refreshData]);

  // Fetch data when date changes
  useEffect(() => {
    if (user) {
      fetchAttendanceData(selectedDate);
    }
  }, [selectedDate, user, fetchAttendanceData]);

  const getUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data;
  };

  const getUnnotifiedRecords = async (): Promise<AttendanceRecord[]> => {
    try {
      const { data: checkinData, error: checkinError } = await supabase
        .from("checkin")
        .select(
          `
          *,
          user:users(first_name, last_name, phone, email)
        `
        )
        .eq("notification_status", "not_sent");

      if (checkinError) throw checkinError;

      const { data: checkoutData, error: checkoutError } = await supabase
        .from("checkout")
        .select(
          `
          *,
          user:users(first_name, last_name, phone, email)
        `
        )
        .eq("notification_status", "not_sent");

      if (checkoutError) throw checkoutError;

      const transformedCheckins: AttendanceRecord[] = (checkinData || []).map(
        (item: any) => ({
          id: item.id,
          user_id: item.user_id,
          day: item.day,
          time: formatTime(item.checkin_time),
          notification_status: item.notification_status,
          user: {
            first_name: item.user.first_name,
            last_name: item.user.last_name,
            phone: item.user.phone,
            email: item.user.email,
          },
          type: "checkin",
        })
      );

      const transformedCheckouts: AttendanceRecord[] = (checkoutData || []).map(
        (item: any) => ({
          id: item.id,
          user_id: item.user_id,
          day: item.day,
          time: formatTime(item.checkout_time),
          notification_status: item.notification_status,
          user: {
            first_name: item.user.first_name,
            last_name: item.user.last_name,
            phone: item.user.phone,
            email: item.user.email,
          },
          type: "checkout",
        })
      );

      return [...transformedCheckins, ...transformedCheckouts];
    } catch (err) {
      console.error("Error fetching unnotified records:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      return [];
    }
  };

  const value = {
    checkins,
    checkouts,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    checkIn,
    checkOut,
    refreshData,
    updateNotificationStatus,
    getUserProfile,
    getUnnotifiedRecords,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
}
