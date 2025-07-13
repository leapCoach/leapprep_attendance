"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"; // Card components removed
import { useNotificationConfig } from "@/src/contexts/NotificationContext";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";

interface NotificationToggleProps {
  onSendUnnotified: () => Promise<void>;
  sendLoading: boolean;
}

export default function NotificationToggle({
  onSendUnnotified,
  sendLoading,
}: NotificationToggleProps) {
  const { config, updateConfig } = useNotificationConfig();

  return (
    <div className="flex flex-col gap-2 p-2 rounded-md bg-muted/20">
      <div className="flex items-center space-x-2">
        <Switch
          id="auto-notification"
          checked={config.autoNotification}
          onCheckedChange={(checked) =>
            updateConfig({ autoNotification: checked })
          }
        />
        <Label htmlFor="auto-notification">
          Auto-send notifications on check-in/check-out
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="email-notifications"
          checked={config.emailEnabled}
          onCheckedChange={(checked) => updateConfig({ emailEnabled: checked })}
        />
        <Label htmlFor="email-notifications">Enable email notifications</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="sms-notifications"
          checked={config.smsEnabled}
          onCheckedChange={(checked) => updateConfig({ smsEnabled: checked })}
        />
        <Label htmlFor="sms-notifications">Enable SMS notifications</Label>
      </div>

      <div className="pt-2 border-t border-border mt-2">
        <Button
          onClick={onSendUnnotified}
          disabled={sendLoading}
          className="w-full"
          size="sm"
        >
          {sendLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          ) : (
            <BellRing className="mr-2 h-4 w-4" />
          )}
          Send Unnotified Records
        </Button>
      </div>
    </div>
  );
}
