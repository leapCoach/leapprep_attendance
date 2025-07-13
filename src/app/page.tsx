"use client";

import React from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import AuthGuard from "@/src/components/common/AuthGuard";
import Layout from "@/src/components/common/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { format } from "date-fns";

function HomeContent() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
        <p className="text-muted-foreground">
          Here&apos;s your profile information and account details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Your personal account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <p className="text-lg font-semibold">
                {user?.user_metadata.first_name} {user?.user_metadata.last_name}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <p className="text-sm">{user?.email}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                <Phone className="h-4 w-4" />
                Phone
              </label>
              <p className="text-sm">{user?.user_metadata.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Account Details
            </CardTitle>
            <CardDescription>
              Account creation and activity information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Account Status
              </label>
              <Badge
                variant="default"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              >
                Active
              </Badge>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Member Since
              </label>
              <p className="text-sm">
                {format(new Date(user?.created_at || ""), "MMMM dd, yyyy")}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Last Updated
              </label>
              <p className="text-sm">
                {format(new Date(user?.updated_at || ""), "MMMM dd, yyyy")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Navigation</CardTitle>
          <CardDescription>
            Access the main features of the attendance tracking system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Attendance Tracking</h3>
              <p className="text-sm text-muted-foreground mb-3">
                View and manage check-in/check-out records, send notifications,
                and track attendance patterns.
              </p>
              <a
                href="/attendance"
                className="text-sm text-primary hover:underline font-medium"
              >
                Go to Attendance →
              </a>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h3 className="font-semibold mb-2">Real-time Updates</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get live updates on attendance changes and notification status
                with WebSocket integration.
              </p>
              <span className="text-sm text-muted-foreground">
                Automatically enabled
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <AuthGuard>
      <Layout>
        <HomeContent />
      </Layout>
    </AuthGuard>
  );
}
