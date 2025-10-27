"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, Coins, Inbox, Home } from "lucide-react";

export default function AdminDashboard() {
  // Dummy data for demonstration
  const stats = [
    { title: "Total Users", value: 1200, icon: <Users className="w-6 h-6" /> },
    { title: "Total Agents", value: 75, icon: <Inbox className="w-6 h-6" /> },
    {
      title: "Properties",
      value: 340,
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Revenue (USD)",
      value: "$25,000",
      icon: <Coins className="w-6 h-6" />,
    },
  ];

  const recentProperties = [
    { title: "Cozy Apartment Downtown", agent: "Alice", status: "Pending" },
    { title: "Luxury Villa", agent: "Bob", status: "Approved" },
    { title: "Studio Flat", agent: "Charlie", status: "Approved" },
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex items-center gap-4 hover:shadow-lg transition"
          >
            <div className="text-blue-600 dark:text-blue-300">{stat.icon}</div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Properties */}
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentProperties.map((property, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <div>
                <p className="font-medium">{property.title}</p>
                <p className="text-sm text-muted-foreground">
                  Agent: {property.agent}
                </p>
              </div>
              <div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    property.status === "Pending"
                      ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                      : "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                  }`}
                >
                  {property.status}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Approve Pending Properties
          </Button>
          <Button className="bg-green-600 text-white hover:bg-green-700">
            Verify New Agents
          </Button>
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
            Send Notification
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Property Type
          </Button>
          <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>

      {/* Placeholder: Property Analytics */}
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Property Analytics</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
          Charts go here
        </CardContent>
      </Card>

      {/* Placeholder: Transactions Overview */}
      <Card className="bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <CardHeader>
          <CardTitle>Transactions Overview</CardTitle>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
          Charts / Table go here
        </CardContent>
      </Card>
    </div>
  );
}
