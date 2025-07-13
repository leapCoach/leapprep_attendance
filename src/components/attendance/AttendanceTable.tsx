"use client";

import React from "react";
import { AttendanceRecord } from "@/src/types/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Send, Clock, CheckCircle, XCircle } from "lucide-react";
import { useNotification } from "@/src/hooks/useNotification";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  type: "checkin" | "checkout";
  loading: boolean;
}

export default function AttendanceTable({
  records,
  type,
  loading,
}: AttendanceTableProps) {
  const notification = useNotification();

  const handleSendNotification = async (record: AttendanceRecord) => {
    const fullName = `${record.user.first_name} ${record.user.last_name}`;

    await notification.sendNotification(
      record.user_id,
      type,
      fullName,
      record.user.email,
      record.user.phone,
      record.id
    );
  };

  const getStatusBadge = (status: AttendanceRecord["notification_status"]) => {
    switch (status) {
      case "sent":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Sent
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        No {type} records found for this date.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Notification Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">
                {record.user.first_name} {record.user.last_name}
              </TableCell>
              <TableCell>{record.user.phone}</TableCell>
              <TableCell>{record.time}</TableCell>
              <TableCell>
                {getStatusBadge(record.notification_status)}
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendNotification(record)}
                  disabled={notification.loading}
                  className="flex items-center gap-2"
                >
                  {notification.loading ? (
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current"></div>
                  ) : (
                    <Send className="h-3 w-3" />
                  )}
                  Send Notification
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
