import { useState } from "react";
import { Provider } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound from "./component/Notfound.jsx";
import ErrorBoundary from "./networkErrorPage.jsx";
import useApi from "./apihook.jsx";
// import Servicesetting from "./component/ExportComponent.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Login,
  Desktop,
  RegistrationPage,
  RoleSelection,
  UserRegistrationPage,
  Layout,
  BusinessDashboard,
  Services,
  Servicesetting,
  NewService,
  FeedbackDashboard,
  AppointmentPage,
} from "./component/ExportComponent.js";
import store from "./features/store/Store";
import ProtectRoute from "./Protected/ProtectRoute.jsx";
import "./App.css";
import Serviceinfo from "./component/business/Pages/Services/settings/component/Serviceinfo.jsx";
import Category from "./component/business/Pages/Services/settings/component/Category.jsx";
import DeleteService from "./component/business/Pages/Services/settings/component/Deleteservice.jsx";
import Homepage from "./component/Customer/Pages/home/Homepage.jsx";
import CustomerLayout from "./component/Customer/components/layout.jsx";
import Loader from "./component/Customer/Pages/loader/loader.jsx";
import {
  CustomerHomepage,
  ServicePage,
} from "./component/Customer/components/export.jsx";
import CategoryDetail from "./component/Customer/Pages/servicepage/ServicesPage.jsx";
import ServiceDetail from "./component/Customer/Pages/servicepage/Detailespage";
import Subcategory from "./component/Customer/Pages/servicepage/Subcategory.jsx";
import Cart from "./component/Customer/Pages/cart/cart.jsx";
import CheckoutPage from "./component/Customer/Pages/checkout/CheckoutPage.jsx";
import MyBookings from "./component/Customer/Pages/bookings/mybooking.jsx";
import AdminDashboard from "./component/admin/Pages/adminDashboard.jsx";
import Admin from "./component/admin/layouts/admin/index.jsx";
import Dashboard from "./component/admin/Pages/adminDashboard.jsx";
import Businesspage from "./component/admin/Pages/businesmangement/Businesspage.jsx";
import Servicerequests from "./component/admin/Pages/Servicerequests.jsx";
import CatandsubcatPage from "./component/admin/Pages/CatandsubcatPage.jsx";
import Userspage from "./component/admin/Pages/Userspage.jsx";
import BookingsPage from "./component/admin/Pages/BookingsPage.jsx";
import OrderDetailsPage from "./component/admin/Pages/Orderdetals.jsx";
import SettingPage from "./component/admin/Pages/SettingPage.jsx";
import BusinessDetailPage from "./component/admin/Pages/businesmangement/Subpage/BusinessDetail.jsx";
import ContactSection from "./component/Customer/Pages/contact/Contactus.jsx";
import { Loader2, LoaderPinwheel } from "lucide-react";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      

      {/* Public Route */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<CustomerHomepage />} />
        <Route path="/home" element={<CustomerHomepage />} />
        <Route path="/contact-us" element={<ContactSection />} />
        <Route path="/services" element={<ServicePage />} />
        <Route
          path="/serviceDetail/:subcategory_id"
          element={<CategoryDetail />}
        />
        <Route
          path="/serviceDetail/viewDetails/:service_id"
          element={<ServiceDetail />}
        />
        <Route
          path="/category/subcategory/:category_id"
          element={<Subcategory />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectRoute AuthenticationRequired={true} role={"customer"}>
              <CheckoutPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/mybookings"
          element={
            <ProtectRoute AuthenticationRequired={true} role={"customer"}>
              <MyBookings />
            </ProtectRoute>
          }
        />
      </Route>

      <Route path="/Login" element={<Login />} />

      {/* Registration Routes */}
      <Route path="/Register">
        <Route index element={<RoleSelection />} />
        <Route path="business" element={<RegistrationPage />} />
        <Route path="customer" element={<UserRegistrationPage />} />
      </Route>

      {/*----------------------------------------------service provier-------------------------------------------------------- */}

      <Route path="/business" element={<Layout />}>
        {/* Index Route - loads Dashboard when /business is accessed */}
        <Route
          index
          element={
            <ProtectRoute
              AuthenticationRequired={true}
              role={"Service Provider"}
            >
              <BusinessDashboard />
            </ProtectRoute>
          }
        />

        {/* Services Route */}
        <Route
          path="services"
          element={
            <ProtectRoute
              AuthenticationRequired={false}
              role={"Service Provider"}
            >
              <Services />
            </ProtectRoute>
          }
        />

        {/* Service Settings Route (Nested) */}
        <Route path="services/service-setting/:id" element={<Servicesetting />}>
          <Route
            index
            element={
              <ProtectRoute
                AuthenticationRequired={false}
                role={"Service Provider"}
              >
                <Serviceinfo />
              </ProtectRoute>
            }
          />
          <Route
            path="general"
            element={
              // Route for the /general path
              <ProtectRoute
                AuthenticationRequired={false}
                role={"Service Provider"}
              >
                <Serviceinfo /> {/* Same component here */}
              </ProtectRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectRoute
                AuthenticationRequired={true}
                role={"Service Provider"}
              >
                <Category />
              </ProtectRoute>
            }
          />
          <Route
            path="delete"
            element={
              <ProtectRoute
                AuthenticationRequired={true}
                role={"Service Provider"}
              >
                <DeleteService />
              </ProtectRoute>
            }
          />
        </Route>
        {/* Add new service */}
        <Route
          path="services/newservice"
          element={
            <ProtectRoute
              AuthenticationRequired={true}
              role={"Service Provider"}
            >
              <NewService />
            </ProtectRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectRoute
              AuthenticationRequired={true}
              role={"Service Provider"}
            >
              <FeedbackDashboard />
            </ProtectRoute>
          }
        />
        <Route
          path="appointments"
          element={
            <ProtectRoute
              AuthenticationRequired={true}
              role={"Service Provider"}
            >
              <AppointmentPage />
            </ProtectRoute>
          }
        />
      </Route>

      {/* ..................admin.............. */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route path="/admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="business" element={<Businesspage />} />
        <Route path="service-requests" element={<Servicerequests />} />
        <Route path="categories-subcategories" element={<CatandsubcatPage />} />
        <Route path="users" element={<Userspage />} />
        <Route path="bookings" element={<BookingsPage />} />
        <Route path="settings" element={<SettingPage />} />

        <Route path="details/:businessId" element={<BusinessDetailPage />} />
        <Route path="orderdetail/:orderId" element={<OrderDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {

  const { isError, error,retry,loading  } = useApi("/"); // Use a test endpoint to check server status
  
  if(loading) return <Loader/>
  if (isError) return <ErrorBoundary message={error} onRetry={retry} />; // ✅ Retry now works

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
