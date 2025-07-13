"use client";

import React, { createContext, useContext, useState } from "react";
import { NotificationConfig } from "@/src/types/notification";

interface NotificationContextType {
  config: NotificationConfig;
  updateConfig: (config: Partial<NotificationConfig>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const defaultConfig: NotificationConfig = {
  autoNotification: false,
  emailEnabled: true,
  smsEnabled: true,
};

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<NotificationConfig>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notification-config");
      return saved ? JSON.parse(saved) : defaultConfig;
    }
    return defaultConfig;
  });

  const updateConfig = (newConfig: Partial<NotificationConfig>) => {
    const updated = { ...config, ...newConfig };
    setConfig(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("notification-config", JSON.stringify(updated));
    }
  };

  const value = {
    config,
    updateConfig,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotificationConfig() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationConfig must be used within a NotificationProvider"
    );
  }
  return context;
}
