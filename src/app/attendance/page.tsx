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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";
import { useNotificationConfig } from "@/src/contexts/NotificationContext";

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
    refreshData,
  } = useAttendance();
  const notification = useNotification();
  const { config, updateConfig } = useNotificationConfig();

  const [sendNotificationsLoading, setSendNotificationsLoading] =
    React.useState(false);
  const [isProcessingNotifications, setIsProcessingNotifications] =
    React.useState(false);

  // Auto-send notifications for unnotified records
  React.useEffect(() => {
    console.log(
      "useEffect triggered. autoNotification:",
      config.autoNotification,
      "isProcessingNotifications:",
      isProcessingNotifications
    );
    const allRecords = [...checkins, ...checkouts];
    const unnotified = allRecords.filter(
      (record) => record.notification_status === "not_sent"
    );
    console.log("Unnotified records count before check:", unnotified.length);

    if (
      config.autoNotification &&
      !isProcessingNotifications &&
      unnotified.length > 0
    ) {
      console.log("Auto-sending unnotified records:", unnotified);
      const processRecords = async () => {
        setIsProcessingNotifications(true);
        console.log("isProcessingNotifications set to true.");
        try {
          for (const record of unnotified) {
            console.log("Sending notification for record ID:", record.id);
            const result = await notification.sendNotification(
              record.user_id,
              record.type === "checkin" ? "checkin" : "checkout",
              record.user.first_name + " " + record.user.last_name,
              record.user.email.trim(),
              record.user.phone,
              record.id
            );
            if (result.success) {
              await updateNotificationStatus(
                record.type === "checkin" ? "checkin" : "checkout",
                record.id,
                "sent"
              );
              console.log(
                `Record ${record.id} notification status updated to sent.`
              );
            } else {
              await updateNotificationStatus(
                record.type === "checkin" ? "checkin" : "checkout",
                record.id,
                "failed"
              );
              console.log(
                `Record ${record.id} notification status updated to failed.`
              );
            }
          }
        } finally {
          setIsProcessingNotifications(false);
          console.log("isProcessingNotifications set to false.");
          refreshData(); // Refresh data after processing to ensure latest status
        }
      };
      processRecords();
    }
  }, [
    checkins,
    checkouts,
    config.autoNotification,
    notification,
    updateNotificationStatus,
    isProcessingNotifications,
    refreshData,
  ]);

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
        if (result.success) {
          await updateNotificationStatus(
            record.type === "checkin" ? "checkin" : "checkout",
            record.id,
            "sent"
          );
        } else {
          await updateNotificationStatus(
            record.type === "checkin" ? "checkin" : "checkout",
            record.id,
            "failed"
          );
        }
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

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex-shrink-0">
          <DateSelector
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />
        </div>
        <div className="flex-grow flex flex-wrap items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="auto-notification"
                    checked={config.autoNotification}
                    onCheckedChange={(checked) =>
                      updateConfig({ autoNotification: checked })
                    }
                  />
                  <Label htmlFor="auto-notification">Auto-send</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Automatically send notifications on check-in/check-out events.
                </p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-notifications"
                    checked={config.emailEnabled}
                    onCheckedChange={(checked) =>
                      updateConfig({ emailEnabled: checked })
                    }
                  />
                  <Label htmlFor="email-notifications">Email</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enable email notifications for attendance events.</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sms-notifications"
                    checked={config.smsEnabled}
                    onCheckedChange={(checked) =>
                      updateConfig({ smsEnabled: checked })
                    }
                  />
                  <Label htmlFor="sms-notifications">SMS</Label>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Enable SMS notifications for attendance events.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            onClick={handleSendUnnotified}
            disabled={sendNotificationsLoading}
            className="ml-auto"
            size="sm"
          >
            {sendNotificationsLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
            ) : (
              <BellRing className="mr-2 h-4 w-4" />
            )}
            Send Unnotified
          </Button>
        </div>
      </div>

      <div className="w-full">
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
              <h3 className="text-lg font-semibold mb-2">Check-Out Records</h3>
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
