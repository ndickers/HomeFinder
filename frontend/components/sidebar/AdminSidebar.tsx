import React from "react";
import {
  Home,
  Users,
  Inbox,
  Building2,
  Coins,
  BarChart2,
  Bell,
  LifeBuoy,
  Settings,
  Sparkles,
  CreditCard,
  Tags,
} from "lucide-react";
import { AppSidebar } from "../AppSidebar";
const links = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Agents", url: "/admin/agents", icon: Inbox },
  {
    title: "Properties",
    icon: Building2,
    children: [
      {
        title: "All Properties",
        url: "/admin/properties/all",
        icon: Building2,
      },
      {
        title: "Pending Approvals",
        url: "/admin/properties/pending",
        icon: Building2,
      },
      {
        title: "Featured Properties",
        url: "/admin/properties/featured",
        icon: Sparkles,
      },
    ],
  },
  {
    title: "Transactions",
    icon: Coins,
    children: [
      { title: "Payments", url: "/admin/transactions/payments", icon: Coins },
      { title: "Refunds", url: "/admin/transactions/refunds", icon: Coins },
      { title: "Subsidies", url: "/admin/transactions/subsidies", icon: Coins },
    ],
  },
  {
    title: "Reports",
    icon: BarChart2,
    children: [
      { title: "User Activity", url: "/admin/reports/users", icon: Users },
      {
        title: "Property Stats",
        url: "/admin/reports/properties",
        icon: Building2,
      },
      { title: "Revenue", url: "/admin/reports/revenue", icon: Coins },
    ],
  },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Support", url: "/admin/support", icon: LifeBuoy },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "Amenities", url: "/admin/settings/amenities", icon: Sparkles },
      { title: "Currencies", url: "/admin/settings/currencies", icon: Coins },
      {
        title: "Payment Method",
        url: "/admin/settings/payment-method",
        icon: CreditCard,
      },
      {
        title: "Property Types",
        url: "/admin/settings/property-types",
        icon: Building2,
      },
      {
        title: "Pricing Types",
        url: "/admin/settings/pricing-types",
        icon: Tags,
      },
    ],
  },
];

export default function AdminSidebar() {
  return (
    <>
      <AppSidebar items={links} />
    </>
  );
}
