import React from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Navbar from "../../components/components/navbar";
import Sidebar from "../../components/components/sidebar";
import Footer from "../../components/components/footer/Footer";
import routes from "./routes.js";


export default function Admin() {
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);

  React.useEffect(() => {
    getActiveRoute(routes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.includes(`/admin/${routes[i].path}`)) {
        setCurrentRoute(routes[i].name);
      }
    }
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin" && prop.component) {
        return <Route key={key} path={prop.path} element={<prop.component />} />;
      }
      return null;
    });
  };

  return (
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:bg-[#2b3350]">
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
          <Navbar
            onOpenSidenav={() => setOpen(true)}
            logoText="Admin Dashboard"
            brandText={currentRoute}
          />
          <div className="mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
           <Outlet/>
          </div>
          <div className="p-3">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
