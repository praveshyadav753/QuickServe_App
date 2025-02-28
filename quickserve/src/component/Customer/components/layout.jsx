import Header from "../Pages/header/Header";
import Footer from "../Pages/footer/footer";
import { Outlet } from "react-router-dom";
import MobileNavbar from "../Pages/header/Mobilenavbar"

const CustomerLayout = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <MobileNavbar />
        <main className="flex-grow pt-10 max-w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default CustomerLayout;