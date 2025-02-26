import Header from "../Pages/header/Header";
import Footer from "../Pages/footer/footer";
import { Outlet } from "react-router-dom";

const CustomerLayout = () => {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-5">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default CustomerLayout;