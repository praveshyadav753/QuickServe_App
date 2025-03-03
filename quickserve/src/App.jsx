import { useState } from "react";
import { Provider } from "react-redux";
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
import {
  CustomerHomepage,
  ServicePage,
} from "./component/Customer/components/export.jsx";
import CategoryDetail from "./component/Customer/Pages/servicepage/CategoryDetail.jsx";
import ServiceDetail from "./component/Customer/Pages/servicepage/Detailespage";
import Subcategory from "./component/Customer/Pages/servicepage/Subcategory.jsx";
import Cart from "./component/Customer/Pages/cart/cart.jsx";
import Checkout from "./component/Customer/Pages/checkout/checkout.jsx";

import AdminDashboard from "./component/admin/Pages/adminDashboard.jsx";
import Admin from "./component/admin/layouts/admin/index.jsx";
import Dashboard from "./component/admin/Pages/adminDashboard.jsx";
import Businesspage from "./component/admin/Pages/businesmangement/Businesspage.jsx";
import Servicerequests from "./component/admin/Pages/Servicerequests.jsx";
import CatandsubcatPage from "./component/admin/Pages/CatandsubcatPage.jsx";
import Userspage from "./component/admin/Pages/Userspage.jsx";
import ReportsPage from "./component/admin/Pages/ReportsPage.jsx";
import SettingPage from "./component/admin/Pages/SettingPage.jsx";
import BusinessDetailPage from "./component/admin/Pages/businesmangement/Subpage/BusinessDetail.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<CustomerHomepage />} />
        <Route path="/home" element={<CustomerHomepage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/serviceDetail" element={<CategoryDetail />} />
        <Route path="/viewDetails" element={<ServiceDetail />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectRoute AuthenticationRequired={true} role={"customer"}>
              <Checkout />
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

      {/* ....................service provier................... */}

      <Route path="/business" element={<Layout />}>
        {/* Index Route - loads Dashboard when /business is accessed */}
        <Route
          index
          element={
            <ProtectRoute AuthenticationRequired={true} role={"business"}>
              <BusinessDashboard />
            </ProtectRoute>
          }
        />

        {/* Services Route */}
        <Route
          path="services"
          element={
            <ProtectRoute AuthenticationRequired={false} role={"business"}>
              <Services />
            </ProtectRoute>
          }
        />

        {/* Service Settings Route (Nested) */}
        <Route path="services/service-setting/:id" element={<Servicesetting />}>
          <Route
            index
            element={
              <ProtectRoute AuthenticationRequired={false} role={"business"}>
                <Serviceinfo />
              </ProtectRoute>
            }
          />
          <Route
            path="general"
            element={
              // Route for the /general path
              <ProtectRoute AuthenticationRequired={false} role={"business"}>
                <Serviceinfo /> {/* Same component here */}
              </ProtectRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectRoute AuthenticationRequired={true} role={"business"}>
                <Category />
              </ProtectRoute>
            }
          />
          <Route
            path="delete"
            element={
              <ProtectRoute AuthenticationRequired={true} role={"business"}>
                <DeleteService />
              </ProtectRoute>
            }
          />
        </Route>
        {/* Add new service */}
        <Route
          path="services/newservice"
          element={
            <ProtectRoute AuthenticationRequired={true} role={"business"}>
              <NewService />
            </ProtectRoute>
          }
        />
        <Route
          path="feedback"
          element={
            <ProtectRoute AuthenticationRequired={true} role={"business"}>
              <FeedbackDashboard />
            </ProtectRoute>
          }
        />
        <Route
          path="appointments"
          element={
            <ProtectRoute AuthenticationRequired={true} role={"business"}>
              <AppointmentPage />
            </ProtectRoute>
          }
        />
      </Route>

      {/* ..................admin.............. */}
      <Route path="/admin" element={<Admin />}>
      
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="business" element={<Businesspage/>}/>
      <Route path="service-requests" element={<Servicerequests/>}/>
      <Route path="categories-subcategories" element={<CatandsubcatPage/>}/>
      <Route path="users" element={<Userspage/>}/>
      <Route path="reports" element={<ReportsPage/>}/>
      <Route path="settings" element={<SettingPage/>}/>

      <Route path="details/:businessId" element={<BusinessDetailPage/>}/>
      
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
