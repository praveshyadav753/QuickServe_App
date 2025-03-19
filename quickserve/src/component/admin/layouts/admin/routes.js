import React from "react";
import Dashboard from "../../Pages/adminDashboard";

// Icon Imports
import {
  LayoutDashboard, // Dashboard
  Building,        // Businesses
  ClipboardCheck,  // Service Requests
  ListTree,        // Categories & Subcategories
  Users,           // Users
  FileBarChart, 
  CalendarCheck,   // Reports
  Settings,        // Settings
} from "lucide-react";

import Businesspage from "../../Pages/businesmangement/Businesspage";
import Servicerequests from "../../Pages/Servicerequests";
import Userspage from "../../Pages/Userspage";
import SettingPage from "../../Pages/SettingPage";
import ProfilePage from "../../Pages/ProfilePage";
import BookingsPage from "../../Pages/BookingsPage";
import CatandsubcatPage from "../../Pages/CatandsubcatPage";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "dashboard", // ✅ Fix: Make sure this matches the route
    icon: LayoutDashboard,
    component: Dashboard,
  },
  {
    name: "Business Management",
    layout: "/admin",
    path: "business",
    icon: Building,
    component: Businesspage,
  },
  {
    name: "Service Requests",
    layout: "/admin",
    path: "service-requests",
    icon: ClipboardCheck,
    component: Servicerequests,
  },
  {
    name: "Categories & Subcategories",
    layout: "/admin",
    path: "categories-subcategories",
    icon: ListTree,
    component: CatandsubcatPage,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: Users,
    component: Userspage,
  },
  {
    name: "bookings",
    layout: "/admin",
    path: "bookings",
    icon: CalendarCheck,
    component: BookingsPage,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: Settings,
    component: SettingPage,
  },
];

export default routes;
