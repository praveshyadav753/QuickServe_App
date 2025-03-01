import React from "react";

import Dashboard from "../../Pages/adminDashboard";

// Icon Imports
import {
  LayoutDashboard,   // Dashboard
  Building,          // Businesses
  ClipboardCheck,    // Service Requests
  ListTree,          // Categories & Subcategories
  Users,            // Users
  FileBarChart,      // Reports
  Settings,          // Settings
} from "lucide-react";
import Businesspage from "../../Pages/Businesspage";
import Servicerequests from "../../Pages/Servicerequests";
import Userspage from "../../Pages/Userspage";
import SettingPage from "../../Pages/SettingPage";
import ProfilePage from "../../Pages/ProfilePage";
import ReportsPage from "../../Pages/ReportsPage.jsx";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "",
    icon: LayoutDashboard ,
    component: Dashboard, 
  },
  {
    name: "Business Management",
    layout: "/admin",
    path: "Business",
    icon:Building,
    component: Businesspage,
    secondary: true,
  },
  {
    name: "Service Requests",
    layout: "/admin",
    icon: ClipboardCheck ,
    path: "data-tables",
    component: Servicerequests,
  },
  {
    name: "Categories & Subcategories",
    layout: "/admin",
    path: "profile",
    icon: ListTree,
    component: ProfilePage,
  },
  {
    name: "Users",
    layout: "/admin",
    path: "users",
    icon: Users,
    component: Userspage,
  },
  
  {
    name: "Reports",
    layout: "/admin",
    path: "rtl",
    icon:FileBarChart,
    component:  ReportsPage,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "rtl",
    icon:Settings,
    component: SettingPage,
  },
];
export default routes;
