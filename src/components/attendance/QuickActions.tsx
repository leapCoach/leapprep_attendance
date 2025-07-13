"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, LogIn, LogOut } from "lucide-react";
import { useAttendance } from "@/src/contexts/AttendanceContext";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNotification } from "@/src/hooks/useNotification";
import { useNotificationConfig } from "@/src/contexts/NotificationContext";
import { getTodayString } from "@/src/utils/dateHelpers";

export default function QuickActions() {
  const { user } = useAuth();
  const { checkIn, checkOut, selectedDate, getUserProfile } = useAttendance();
  const notification = useNotification();
  const { config } = useNotificationConfig();
  const [loading, setLoading] = React.useState<"checkin" | "checkout" | null>(
    null
  );

  const isToday = selectedDate === getTodayString();

  const handleCheckIn = async (userId: string) => {
    if (!user) return;

    setLoading("checkin");
    const result = await checkIn(userId);

    // get the user profile
    const userProfile = await getUserProfile(userId);
    if (!userProfile) return;
    const fullName = `${userProfile.first_name} ${userProfile.last_name}`;
    const email = userProfile.email;
    const phone = userProfile.phone;

    if (!result.error && config.autoNotification) {
      // Get the latest checkin record to get the ID for notification status update
      // This is a simplified approach - in production you might want to return the ID from checkIn
      await notification.sendNotification(
        user.id,
        "checkin",
        fullName,
        email,
        phone,
        "temp-id" // In real implementation, you'd get this from the insert operation
      );
    }

    setLoading(null);
  };

  const handleCheckOut = async (userId: string) => {
    if (!user) return;

    setLoading("checkout");
    const result = await checkOut(userId);

    if (!result.error && config.autoNotification) {
      const userProfile = await getUserProfile(userId);
      if (!userProfile) return;
      const fullName = `${userProfile.first_name} ${userProfile.last_name}`;
      await notification.sendNotification(
        user.id,
        "checkout",
        fullName,
        userProfile.email,
        userProfile.phone,
        "temp-id" // In real implementation, you'd get this from the insert operation
      );
    }

    setLoading(null);
  };

  if (!isToday) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Check in or check out for today</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <Button
          onClick={() => handleCheckIn(user?.id || "")}
          disabled={loading === "checkin"}
          className="flex-1"
        >
          {loading === "checkin" ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          ) : (
            <LogIn className="mr-2 h-4 w-4" />
          )}
          Check In
        </Button>

        <Button
          variant="outline"
          onClick={() => handleCheckOut(user?.id || "")}
          disabled={loading === "checkout"}
          className="flex-1"
        >
          {loading === "checkout" ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          Check Out
        </Button>
      </CardContent>
    </Card>
  );
}
