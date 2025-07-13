"use client";

import React from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User, Calendar, Home } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (!user) {
    return <div>{children}</div>;
  }

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Attendance", href: "/attendance", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={`bg-card border-r border-border flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-16"
        } ${isSidebarOpen ? "md:w-64" : "md:w-16"} ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } fixed inset-y-0 left-0 z-40 md:relative md:flex`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          {isSidebarOpen && (
            <h1 className="text-xl font-bold text-foreground overflow-hidden whitespace-nowrap">
              Attendance Tracker
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 p-4 overflow-hidden">
          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    }`}
                  >
                    <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    <span
                      className={`${
                        !isSidebarOpen && "hidden"
                      } overflow-hidden whitespace-nowrap`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User info and logout */}
        <div className="p-4 border-t border-border overflow-hidden">
          {isSidebarOpen && (
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full mr-3 flex-shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.user_metadata.first_name}{" "}
                  {user?.user_metadata.last_name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
            <span
              className={`${
                !isSidebarOpen && "hidden"
              } overflow-hidden whitespace-nowrap`}
            >
              Sign out
            </span>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-card border-b border-border p-4 flex items-center justify-between md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">
            Attendance Tracker
          </h1>
          <div>{/* Placeholder for potential right-aligned content */}</div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
