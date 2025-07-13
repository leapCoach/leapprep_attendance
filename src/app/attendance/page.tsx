"use client";

import React from "react";
import AuthGuard from "@/src/components/common/AuthGuard";
import Layout from "@/src/components/common/Layout";
import { AttendanceProvider } from "@/src/contexts/AttendanceContext";
import { NotificationProvider } from "@/src/contexts/NotificationContext";
import DateSelector from "@/src/components/attendance/DateSelector";
import NotificationToggle from "@/src/components/attendance/NotificationToggle";
import QuickActions from "@/src/components/attendance/QuickActions";
import AttendanceTable from "@/src/components/attendance/AttendanceTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAttendance } from "@/src/contexts/AttendanceContext";
import { Calendar, Clock } from "lucide-react";
import { useNotification } from "@/src/hooks/useNotification";

function AttendanceContent() {
  const {
    checkins,
    checkouts,
    loading,
    error,
    selectedDate,
    setSelectedDate,
    getUnnotifiedRecords,
    updateNotificationStatus,
  } = useAttendance();
  const notification = useNotification();
  const [sendNotificationsLoading, setSendNotificationsLoading] =
    React.useState(false);

  const handleSendUnnotified = async () => {
    setSendNotificationsLoading(true);
    try {
      const unnotifiedRecords = await getUnnotifiedRecords();
      for (const record of unnotifiedRecords) {
        const result = await notification.sendNotification(
          record.user_id,
          record.type === "checkin" ? "checkin" : "checkout", // Ensure 'type' is correctly inferred or explicitly set
          record.user.first_name + " " + record.user.last_name,
          record.user.email.trim(), // Trim whitespace, including newlines
          record.user.phone,
          record.id
        );
        // Remove client-side status update as it's now handled by the API route and websocket
        // if (result.success) {
        //   await updateNotificationStatus(
        //     record.type === "checkin" ? "checkin" : "checkout",
        //     record.id,
        //     "sent"
        //   );
        // } else {
        //   await updateNotificationStatus(
        //     record.type === "checkin" ? "checkin" : "checkout",
        //     record.id,
        //     "failed"
        //   );
        // }
      }
    } catch (err) {
      console.error("Failed to send unnotified records:", err);
    } finally {
      setSendNotificationsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Attendance Tracking
          </h1>
          <p className="text-muted-foreground">
            Monitor check-ins and check-outs with real-time notifications
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Live updates enabled</span>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Date & Settings</h2>
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>

          <NotificationToggle
            onSendUnnotified={handleSendUnnotified}
            sendLoading={sendNotificationsLoading}
          />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="checkin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="checkin" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Check-In ({checkins.length})
              </TabsTrigger>
              <TabsTrigger value="checkout" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Check-Out ({checkouts.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="checkin" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Check-In Records</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All check-in records for the selected date
                </p>
              </div>
              <AttendanceTable
                records={checkins}
                type="checkin"
                loading={loading}
              />
            </TabsContent>

            <TabsContent value="checkout" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Check-Out Records
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  All check-out records for the selected date
                </p>
              </div>
              <AttendanceTable
                records={checkouts}
                type="checkout"
                loading={loading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function AttendancePage() {
  return (
    <AuthGuard>
      <Layout>
        <NotificationProvider>
          <AttendanceProvider>
            <AttendanceContent />
          </AttendanceProvider>
        </NotificationProvider>
      </Layout>
    </AuthGuard>
  );
}
